import { useEffect, useRef, useState } from "react";
import CommentItem from "./CommentItem";
import Send from "@assets/icons/send.svg?react";
import { CommunityComment } from "@models/community";
import { Toast } from "@components/index";
import {
  createPostComment,
  deletePostComment,
  updatePostComment,
} from "@services/community";

interface CommentProps {
  postId: number;
  initialComments: CommunityComment[];
  currentUser: string;
}

const Comment = ({ postId, initialComments, currentUser }: CommentProps) => {
  const [comments, setComments] = useState<CommunityComment[]>(initialComments);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isAddedByMe = useRef(false);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleAddOrEditComment = async () => {
    if (!inputValue.trim()) return;

    // Edit
    if (editingIndex !== null) {
      try {
        const target = comments[editingIndex];

        const updated = await updatePostComment(
          postId,
          target.commentId,
          inputValue,
        );

        setComments(prev =>
          prev.map((comment, idx) =>
            idx === editingIndex ? updated : comment,
          ),
        );

        setEditingIndex(null);
        setInputValue("");
      } catch (e) {
        console.error("댓글 수정 실패", e);
        alert("댓글 수정 중 오류가 발생했습니다.");
      }
      return;
    }

    // Add
    isAddedByMe.current = true;

    try {
      const created = await createPostComment(postId, inputValue);

      setComments(prev => [...prev, created]);
      setInputValue("");
    } catch (e) {
      console.error("댓글 작성 실패", e);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteComment = async (index: number) => {
    const target = comments[index];

    try {
      const res = await deletePostComment(postId, target.commentId);

      if (res.success) {
        setComments(prev => prev.filter((_, i) => i !== index));
        setToastOpen(true);
      } else {
        alert("댓글 삭제에 실패했습니다.");
      }
    } catch (e) {
      console.error("댓글 삭제 실패", e);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
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
            key={comment.commentId}
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
