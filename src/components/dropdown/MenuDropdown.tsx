import Dropdown from "@components/common/Dropdown";

interface MenuDropdownProps {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onExportPdf: () => void;
}

const MenuDropdown = ({
  open,
  onClose,
  onEdit,
  onDelete,
  onExportPdf,
}: MenuDropdownProps) => {
  return (
    <Dropdown open={open} onClose={onClose}>
      <div className="absolute right-0 mt-2 w-34 bg-white rounded-xl shadow-lg border border-[#D9D9D9] text-[#4A4A4A] overflow-hidden">
        <button
          onClick={() => {
            onEdit();
            onClose();
          }}
          className="w-full px-4 py-3 text-center text-sm cursor-pointer"
        >
          수정하기
        </button>

        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="w-full px-4 py-1 text-center text-sm cursor-pointer"
        >
          삭제하기
        </button>

        <button
          onClick={() => {
            onExportPdf();
            onClose();
          }}
          className="w-full px-4 py-3 text-center text-sm cursor-pointer"
        >
          PDF로 내보내기
        </button>
      </div>
    </Dropdown>
  );
};

export default MenuDropdown;
