import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DefaultProfile from "@assets/icons/profile_s.svg";
import { CommunityComment } from "@mocks/community";
import { CommentDropdown } from "@components/index";

interface CommentItemProps {
  comment: CommunityComment;
  currentUser: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CommentItem = ({
  comment,
  currentUser,
  onEdit,
  onDelete,
}: CommentItemProps) => {
  const isMine = comment.user === currentUser;
  const [open, setOpen] = useState(false);

  const handleEditComment = () => {
    onEdit();
  };

  const handleDeleteClick = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <div className="flex gap-3 w-full">
      <img
        src={comment.profile || DefaultProfile}
        className="w-7 h-7 rounded-full opacity-60 shrink-0 shadow-sm"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between mb-3 relative">
          <p
            className={`text-xs font-bold ${
              isMine ? "text-[#B28C7E]" : "text-[#4A4A4A]"
            }`}
          >
            {comment.user}
          </p>

          {isMine && (
            <div className="relative">
              <button onClick={() => setOpen(prev => !prev)}>
                <BsThreeDotsVertical
                  size={16}
                  color="#76615A"
                  className="cursor-pointer"
                />
              </button>

              <CommentDropdown
                open={open}
                onClose={() => setOpen(false)}
                onEdit={handleEditComment}
                onDelete={handleDeleteClick}
              />
            </div>
          )}
        </div>

        <div
          className="
            inline-block
            w-fit
            max-w-[260px]
            bg-[#FAF7F5]
            px-4 py-3
            text-xs text-[#4A4A4A]
            leading-4 break-words
            rounded-tr-lg rounded-br-lg rounded-bl-lg
          "
        >
          {comment.content}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
