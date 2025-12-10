import { RxExit } from "react-icons/rx";
import { Button, Modal } from "@components/index";

type AccountConfirmType = "logout" | "withdraw";

interface AccountModalProps {
  isOpen: boolean;
  type: AccountConfirmType;
  onConfirm: () => void;
  onClose: () => void;
}

const AccountModal = ({
  isOpen,
  type,
  onConfirm,
  onClose,
}: AccountModalProps) => {
  const titles = {
    logout: "로그아웃",
    withdraw: "회원탈퇴",
  };

  const messages = {
    logout: "로그아웃 하시겠습니까?",
    withdraw: "회원을 탈퇴 하시겠습니까?",
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
        <RxExit size={20} color="#B28C7E" />
        <span className="text-sm text-[#4A4A4A] font-semibold">
          {messages[type]}
        </span>
      </div>
    </Modal>
  );
};

export default AccountModal;
