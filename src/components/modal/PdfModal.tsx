/*
 * PdfModal - PDF로 내보내기 모달
 */

import { RiShareForward2Fill } from "react-icons/ri";
import { Button, Modal } from "@components/index";

interface PdfModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const PdfModal = ({ isOpen, onConfirm, onClose }: PdfModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title="일기 내보내기"
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
        <RiShareForward2Fill size={20} color="#B28C7E" />
        <span className="text-sm text-[#4A4A4A] font-semibold">
          PDF로 내보내시겠습니까?
        </span>
      </div>
    </Modal>
  );
};

export default PdfModal;
