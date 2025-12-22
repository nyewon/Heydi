/*
 * DeleteModal - 일기 및 공유글 삭제 모달
 */

import { TiDelete } from "react-icons/ti";
import { Button, Modal } from "@components/index";

type DeleteType = "diary" | "post";

interface DeleteModalProps {
  isOpen: boolean;
  type: DeleteType;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteModal = ({
  isOpen,
  type,
  onConfirm,
  onClose,
}: DeleteModalProps) => {
  const titles = {
    diary: "일기 삭제",
    post: "공유글 삭제",
  };

  const messages = {
    diary: "일기를 삭제하시겠습니까?",
    post: "공유한 글을 삭제하시겠습니까?",
  };

  return (
    <Modal
      isOpen={isOpen}
      title={titles[type]}
      onClose={onClose}
      footer={
        <div className="flex gap-3 w-full justify-center">
          <Button variant="pill" className="flex-1" onClick={onConfirm}>
            확인
          </Button>

          <Button
            variant="pill"
            className="flex-1 bg-[#D9D9D9]"
            onClick={onClose}
          >
            취소
          </Button>
        </div>
      }
    >
      <div className="flex items-center gap-3 px-3 py-3 bg-[#EFE8E1] rounded-lg mt-2 mb-6">
        <TiDelete size={28} color="#B28C7E" />
        <span
          className={`text-[#4A4A4A] font-semibold ${
            type === "post" ? "text-xs" : "text-sm"
          }`}
        >
          {messages[type]}
        </span>
      </div>
    </Modal>
  );
};

export default DeleteModal;
