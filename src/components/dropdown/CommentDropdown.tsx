import Dropdown from "@components/common/Dropdown";

interface CommentDropdownProps {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const CommentDropdown = ({
  open,
  onClose,
  onEdit,
  onDelete,
}: CommentDropdownProps) => {
  return (
    <Dropdown open={open} onClose={onClose}>
      <div
        className="
          absolute right-0 mt-2
          w-24
          bg-white
          rounded-lg
          shadow-md
          border border-[#D9D9D9]
          text-[#4A4A4A]
          overflow-hidden
        "
      >
        <button
          onClick={() => {
            onEdit();
            onClose();
          }}
          className="
            w-full
            px-1 py-1.5
            text-center
            text-xs
            cursor-pointer
          "
        >
          수정하기
        </button>

        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="
            w-full
            px-1 py-1.5
            text-center
            text-xs
            cursor-pointer
          "
        >
          삭제하기
        </button>
      </div>
    </Dropdown>
  );
};

export default CommentDropdown;
