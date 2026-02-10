import { useEffect, useRef, useState } from "react";
import CommentItem from "./CommentItem";
import Send from "@assets/icons/send.svg?react";
import {
  CommunityComment,
  CommunityCommentMutationResult,
} from "@models/community";
import { Toast } from "@components/index";

interface CommentProps {
  initialComments: CommunityComment[];
  currentUser: string;
}

const Comment = ({ initialComments, currentUser }: CommentProps) => {
  const [comments, setComments] = useState<CommunityComment[]>(initialComments);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isAddedByMe = useRef(false);

  const handleAddOrEditComment = () => {
    if (!inputValue.trim()) return;

    // Edit
    if (editingIndex !== null) {
      const updatedResult: CommunityCommentMutationResult = {
        ...comments[editingIndex],
        content: inputValue,
        updated_at: new Date().toISOString(),
      };

      setComments(prev =>
        prev.map((comment, idx) =>
          idx === editingIndex
            ? {
                comment_id: updatedResult.comment_id,
                user_id: updatedResult.user_id,
                nickname: updatedResult.nickname,
                profile_url: updatedResult.profile_url,
                content: updatedResult.content,
                is_mine: updatedResult.is_mine,
                created_at: updatedResult.created_at,
              }
            : comment,
        ),
      );

      setEditingIndex(null);
      setInputValue("");
      return;
    }

    // Add
    isAddedByMe.current = true;

    const createdResult: CommunityCommentMutationResult = {
      comment_id: Date.now(),
      user_id: 0,
      nickname: currentUser,
      profile_url: "",
      content: inputValue,
      is_mine: true,
      created_at: new Date().toISOString(),
      updated_at: null,
    };

    setComments(prev => [
      ...prev,
      {
        comment_id: createdResult.comment_id,
        user_id: createdResult.user_id,
        nickname: createdResult.nickname,
        profile_url: createdResult.profile_url,
        content: createdResult.content,
        is_mine: createdResult.is_mine,
        created_at: createdResult.created_at,
      },
    ]);

    setInputValue("");
  };

  const handleDeleteComment = (index: number) => {
    setComments(prev => prev.filter((_, i) => i !== index));
    setToastOpen(true);
  };

  const handleEditComment = (index: number) => {
    setEditingIndex(index);
    setInputValue(comments[index].content);
  };

  useEffect(() => {
    if (!isAddedByMe.current) return;

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    isAddedByMe.current = false;
  }, [comments.length]);

  return (
    <>
      <div className="flex flex-col gap-6 w-full mb-20">
        {comments.map((comment, idx) => (
          <CommentItem
            key={idx}
            comment={comment}
            currentUser={currentUser}
            onDelete={() => handleDeleteComment(idx)}
            onEdit={() => handleEditComment(idx)}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[425px] bg-white py-3 px-4 flex items-center gap-2 border-t border-[#eee]">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={
            editingIndex !== null ? "댓글을 수정하세요" : "내용을 입력하세요"
          }
          className="flex-1 h-10 border rounded-lg border-[#D9D9D9] px-3 text-[12px] outline-none"
        />
        <button onClick={handleAddOrEditComment}>
          <Send />
        </button>
      </div>

      <Toast
        open={toastOpen}
        message="댓글을 삭제했습니다."
        onClose={() => setToastOpen(false)}
      />
    </>
  );
};

export default Comment;
