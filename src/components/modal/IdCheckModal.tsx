/*
 * IdCheckModal - 아이디 중복확인 모달
 */

import { Modal, Button } from "@components/index";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineStop } from "react-icons/ai";

interface IdCheckModalProps {
  isOpen: boolean;
  type: "success" | "fail";
  onClose: () => void;
}

const IdCheckModal = ({ isOpen, type, onClose }: IdCheckModalProps) => {
  const isSuccess = type === "success";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="아이디 중복 확인">
      <div
        className="
          w-full flex items-center gap-2
          bg-[#F2EDE7] rounded-[8px]
          px-4 py-3 mb-4
        "
      >
        {isSuccess ? (
          <IoIosCheckmarkCircleOutline size={24} color="#B28C7E" />
        ) : (
          <AiOutlineStop size={24} color="#B28C7E" />
        )}

        <span className="text-sm font-semibold text-[#4A4A4A]">
          {isSuccess
            ? "사용 가능한 아이디입니다."
            : "사용 불가능한 아이디입니다."}
        </span>
      </div>

      <Button variant="pill" onClick={onClose} className="mx-auto mt-2">
        확인
      </Button>
    </Modal>
  );
};

export default IdCheckModal;
