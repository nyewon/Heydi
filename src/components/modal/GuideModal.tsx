/*
 * GuideModal - 회원가입 가이드 모달
 */

import { Modal, Button } from "@components/index";
import { HiOutlineLightBulb } from "react-icons/hi";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuideModal = ({ isOpen, onClose }: GuideModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="회원가입 가이드"
      footer={
        <Button variant="pill" onClick={onClose}>
          확인
        </Button>
      }
    >
      <div className="flex flex-col gap-5 mt-2 px-1 text-left">
        <div className="bg-[#EFE8E1] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <HiOutlineLightBulb size={22} color="#B28C7E" />
            <span className="text-[12px] font-semibold text-[#4A4A4A]">
              아이디
            </span>
          </div>
          <p className="text-[10px] text-[#4A4A4A] leading-5">
            <span className="text-[#B28C7E] font-semibold">영문+숫자</span>{" "}
            조합으로 4자 이상 입력 후{" "}
            <span className="text-[#B28C7E] font-semibold">[중복 확인]</span>{" "}
            버튼을 눌러주세요. (중복확인 필수)
          </p>
        </div>

        <div className="bg-[#EFE8E1] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <HiOutlineLightBulb size={22} color="#B28C7E" />
            <span className="text-[12px] font-semibold text-[#4A4A4A]">
              비밀번호
            </span>
          </div>
          <p className="text-[10px] text-[#4A4A4A] leading-5">
            <span className="text-[#B28C7E] font-semibold">
              영문+숫자+특수문자
            </span>{" "}
            조합으로 8자 이상 입력해주세요. 비밀번호는 비밀번호 재입력과
            동일하게 입력해야 합니다.
          </p>
        </div>

        <div className="bg-[#EFE8E1] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <HiOutlineLightBulb size={22} color="#B28C7E" />
            <span className="text-[12px] font-semibold text-[#4A4A4A]">
              닉네임
            </span>
          </div>
          <p className="text-[10px] text-[#4A4A4A] leading-5">
            <span className="text-[#B28C7E] font-semibold">
              한글/영어/숫자(혼합 가능)
            </span>
            을 2자 이상 입력해주세요. 단, 특수기호는 불가능합니다.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default GuideModal;
