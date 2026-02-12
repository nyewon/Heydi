/*
 * MyPage - 마이페이지 메인 화면
 *
 * 세부사항:
 * - 프로필 이미지, 닉네임, 내가 좋아요/공유한 글 수 표시
 * - 프로필 수정, 알림 설정, 로그아웃, 회원탈퇴 기능 제공
 * - AccountModal: 로그아웃 및 회원탈퇴 확인 모달 표시
 * - AlarmModal: 알림 설정 모달 표시 (알림 활성화/비활성화 토글), 선택된 시간 없을 시 기본값 현재 시간
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  DefaultHeader,
  BottomNav,
  AccountModal,
  AlarmModal,
} from "@components/index";
import DefaultProfile from "@assets/icons/profile.svg";
import { IoChevronForward } from "react-icons/io5";
import { MYPAGE_INFO_DUMMY, ALARM_DUMMY } from "@mocks/mypage";
import { AlarmResponseRequest } from "@models/mypage";
import { logout, withdraw } from "@services/auth";
import { useAuthStore } from "@stores/useAuthStore";

const Mypage = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore(state => state.logout);

  const { nickname, profileImageUrl, likedPostCount, sharedPostCount, alarm } =
    MYPAGE_INFO_DUMMY;

  const [alarmEnabled, setAlarmEnabled] = useState(alarm.enabled);
  const [alarmSetting, setAlarmSetting] = useState<AlarmResponseRequest | null>(
    null,
  );
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"logout" | "withdraw" | null>(
    null,
  );

  const profileImage = profileImageUrl || DefaultProfile;

  const handleOpenAlarmModal = () => {
    if (alarmEnabled) {
      setAlarmSetting(ALARM_DUMMY);
    } else {
      setAlarmSetting(null);
    }
    setIsAlarmModalOpen(true);
  };

  const handleConfirmAlarm = (
    meridiem: "AM" | "PM",
    hour: number,
    minute: number,
  ) => {
    const payload: AlarmResponseRequest = {
      enabled: true,
      meridiem,
      hour,
      minute,
    };

    setAlarmEnabled(true);
    setAlarmSetting(payload);
    setIsAlarmModalOpen(false);
  };

  const handleDisableAlarm = () => {
    setAlarmEnabled(false);
    setAlarmSetting(null);
    setIsAlarmModalOpen(false);
  };

  const handleConfirmAccount = async () => {
    if (modalType === "logout") {
      try {
        const res = await logout();

        if (res.success) {
          clearAuth();
          navigate("/", { replace: true });
        }
      } catch (e) {
        console.error("로그아웃 실패", e);
      }
    }

    if (modalType === "withdraw") {
      try {
        const res = await withdraw();

        if (res.success) {
          clearAuth();
          navigate("/", { replace: true });
        }
      } catch (e) {
        console.error("회원탈퇴 실패", e);
      }
    }
    setModalType(null);
  };

  const handleProfileEdit = () => {
    navigate("/mypage/edit");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader />

      <Container withBottomNav>
        <div className="flex flex-col items-center mt-2 mb-10">
          <img
            src={profileImage}
            alt="profile"
            className="w-[124px] h-[124px] rounded-full object-cover mb-2"
          />
          <span className="text-lg font-extrabold text-[#4A4A4A]">
            {nickname}
          </span>
        </div>

        <div className="flex justify-between gap-6 w-full mb-10">
          <div
            className="flex-1 h-22 border border-[#D4B6A6] bg-[#EFE8E1] rounded-xl flex flex-col items-center justify-center cursor-pointer"
            onClick={() => navigate("/mypage/like-posts")}
          >
            <span className="text-sm font-bold text-[#4A4A4A] mb-2">
              내가 좋아요 한 글
            </span>
            <span className="text-[24px] font-extrabold text-[#B28C7E]">
              {likedPostCount}
            </span>
          </div>

          <div
            className="flex-1 h-22 border border-[#D4B6A6] bg-[#EFE8E1] rounded-xl flex flex-col items-center justify-center cursor-pointer"
            onClick={() => navigate("/mypage/shared-posts")}
          >
            <span className="text-sm font-bold text-[#4A4A4A] mb-2">
              내가 공유 한 글
            </span>
            <span className="text-[24px] font-extrabold text-[#B28C7E]">
              {sharedPostCount}
            </span>
          </div>
        </div>

        <div
          className="w-full flex justify-between items-center py-4 cursor-pointer"
          onClick={handleProfileEdit}
        >
          <span className="text-base font-bold text-[#4A4A4A]">
            프로필 수정
          </span>
          <IoChevronForward size={24} color="#B28C7E" />
        </div>

        <div
          className="w-full flex justify-between items-center py-4 cursor-pointer"
          onClick={handleOpenAlarmModal}
        >
          <span className="text-base font-bold text-[#4A4A4A]">알림 설정</span>

          <div
            className={`
              w-13 h-7 flex items-center rounded-full p-1 transition-all
              ${alarmEnabled ? "bg-[#B28C7E]" : "bg-[#EFE8E1]"}
            `}
            onClick={e => {
              e.stopPropagation();
              setAlarmEnabled(prev => !prev);
            }}
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
          <span className="text-base font-bold text-[#4A4A4A]">로그아웃</span>
        </div>

        <div
          className="w-full py-4 cursor-pointer"
          onClick={() => setModalType("withdraw")}
        >
          <span className="text-base font-bold text-[#4A4A4A]">회원탈퇴</span>
        </div>
      </Container>

      <BottomNav />

      {isAlarmModalOpen && (
        <AlarmModal
          isOpen
          onClose={() => setIsAlarmModalOpen(false)}
          defaultAmPm={alarmSetting?.meridiem}
          defaultHour={alarmSetting?.hour}
          defaultMinute={alarmSetting?.minute}
          onConfirm={handleConfirmAlarm}
          onDisable={handleDisableAlarm}
        />
      )}

      <AccountModal
        isOpen={modalType !== null}
        type={modalType as "logout" | "withdraw"}
        onClose={() => setModalType(null)}
        onConfirm={handleConfirmAccount}
      />
    </div>
  );
};

export default Mypage;
