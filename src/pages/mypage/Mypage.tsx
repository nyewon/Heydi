/*
 * MyPage - 마이페이지 메인 화면
 *
 * 세부사항:
 * - 프로필 이미지, 닉네임, 내가 좋아요/공유한 글 수 표시
 * - 프로필 수정, 알림 설정, 로그아웃, 회원탈퇴 기능 제공
 * - AccountModal: 로그아웃 및 회원탈퇴 확인 모달 표시
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  DefaultHeader,
  BottomNav,
  AccountModal,
} from "@components/index";
import DefaultProfile from "@assets/icons/profile.svg";
import { IoChevronForward } from "react-icons/io5";

const Mypage = () => {
  const nevigate = useNavigate();
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [modalType, setModalType] = useState<"logout" | "withdraw" | null>(
    null,
  );

  const user = {
    username: "Test1",
    profile_url: "",
    likedPosts: 2,
    sharedPosts: 1,
  };

  const profileImage = user.profile_url || DefaultProfile;

  const handleConfirm = () => {
    if (modalType === "logout") {
      console.log("logout");
    } else if (modalType === "withdraw") {
      console.log("signout");
    }
    setModalType(null);
  };

  const handleProfileEdit = () => {
    nevigate("/mypage/edit");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader />

      <Container withBottomNav={true}>
        <div className="flex flex-col items-center mt-6 mb-10">
          <img
            src={profileImage}
            alt="profile"
            className="w-[124px] h-[124px] rounded-full object-cover mb-3"
          />
          <span className="text-base font-bold text-[#4A4A4A]">
            {user.username}
          </span>
        </div>

        <div className="flex justify-between gap-6 w-full mb-10">
          <div className="flex-1 h-20 border border-[#D4B6A6] bg-[#EFE8E1] rounded-xl flex flex-col items-center justify-center">
            <span className="text-xs font-semibold text-[#4A4A4A] mb-1">
              내가 좋아요 한 글
            </span>
            <span className="text-[20px] font-bold text-[#B28C7E]">
              {user.likedPosts}
            </span>
          </div>

          <div className="flex-1 h-20 border border-[#D4B6A6] bg-[#EFE8E1] rounded-xl flex flex-col items-center justify-center">
            <span className="text-xs font-semibold text-[#4A4A4A] mb-1">
              내가 공유 한 글
            </span>
            <span className="text-[20px] font-bold text-[#B28C7E]">
              {user.sharedPosts}
            </span>
          </div>
        </div>

        <div
          className="w-full flex justify-between items-center py-4 cursor-pointer"
          onClick={handleProfileEdit}
        >
          <span className="text-base font-semibold text-[#4A4A4A]">
            프로필 수정
          </span>
          <IoChevronForward size={24} color="#B28C7E" />
        </div>

        <div className="w-full flex justify-between items-center py-4">
          <span className="text-base font-semibold text-[#4A4A4A]">
            알림 설정
          </span>

          <div
            className={`
              w-13 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all
              ${alarmEnabled ? "bg-[#B28C7E]" : "bg-[#EFE8E1]"}
            `}
            onClick={() => setAlarmEnabled(prev => !prev)}
          >
            <div
              className={`
                w-5 h-5 bg-white rounded-full shadow transform transition-all
                ${alarmEnabled ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </div>
        </div>

        <div
          className="w-full py-4 cursor-pointer"
          onClick={() => setModalType("logout")}
        >
          <span className="text-base font-semibold text-[#4A4A4A]">
            로그아웃
          </span>
        </div>

        <div
          className="w-full py-4 cursor-pointer"
          onClick={() => setModalType("withdraw")}
        >
          <span className="text-base font-semibold text-[#4A4A4A]">
            회원탈퇴
          </span>
        </div>
      </Container>

      <BottomNav />

      <AccountModal
        isOpen={modalType !== null}
        type={modalType as "logout" | "withdraw"}
        onClose={() => setModalType(null)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Mypage;
