/*
 * ProfileEdit - 프로필 수정 화면
 *
 * 세부사항:
 * - 프로필 이미지 선택 기능
 * - 아이디 수정 불가, readOnly 처리
 * - 비밀번호 변경 기능
 * - 닉네임 수정 기능(현재 닉네임 표시)
 * - 회원가입 가이드 모달
 * - 유효성 검사
 * - 프로필 수정 완료 후 Mypage로 이동
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BackHeader,
  Container,
  Input,
  Button,
  GuideModal,
} from "@components/index";
import { useProfileImage } from "@hooks/useProfileImage";
import { validatePassword, validateNickname } from "@utils/validate";
import Profile from "@assets/icons/profile.svg?react";
import Plus from "@assets/icons/plus.svg?react";
import { IoMdInformationCircle } from "react-icons/io";

const ProfileEdit = () => {
  const navigate = useNavigate();

  const user = {
    email: "test1@email.com",
    nickname: "TestUser",
    profile_url: "",
  };

  const [email] = useState(user.email);
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [nickname, setNickname] = useState(user.nickname);
  const [error, setError] = useState("");
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const { profileImg, fileInputRef, handleSelectImage, openFileDialog } =
    useProfileImage();

  const profileImage = profileImg || user.profile_url || "";

  const handleSaveProfile = () => {
    setError("");

    if (!validateNickname(nickname)) {
      setError("닉네임 형식이 올바르지 않습니다.");
      return;
    }

    if (pw && (!validatePassword(pw) || pw !== pwCheck)) {
      setError("비밀번호가 유효하지 않거나 서로 일치하지 않습니다.");
      return;
    }

    alert("프로필 수정 완료!");
    navigate(-1);
  };

  const isDisabled =
    !validateNickname(nickname) ||
    (pw.length > 0 && (!validatePassword(pw) || pw !== pwCheck));

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container className="pt-6 flex flex-col items-center w-full">
        <div className="relative flex items-center justify-center mt-5 mb-18">
          {profileImage ? (
            <img
              src={profileImage}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover"
            />
          ) : (
            <Profile className="w-28 h-28 opacity-80" />
          )}

          <div
            className="absolute bottom-0 right-0 cursor-pointer"
            onClick={openFileDialog}
          >
            <Plus className="w-8 h-8" />
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleSelectImage}
          />
        </div>

        <button
          className="w-full text-left text-sm text-[#B28C7E] font-semibold mb-6 flex items-center gap-1"
          onClick={() => setIsGuideOpen(true)}
        >
          <IoMdInformationCircle size={24} color="#B28C7E" />
          회원가입 가이드 보기
        </button>

        <div className="w-full flex flex-col gap-5">
          <div className="relative w-full">
            <input
              type="text"
              value={email}
              readOnly
              className="
                w-full h-12 px-4 rounded-[8px] border text-sm 
                outline-none bg-[#FFFFFF] cursor-not-allowed
                text-[#D9D9D9] border-[#D9D9D9]
              "
            />

            <div
              className="
                absolute top-1/2 -translate-y-1/2 right-[10px]
                w-20 h-8 rounded-[8px] text-sm 
                flex items-center justify-center
                bg-[#EFE8E1] text-[#FFFFFF]
              "
            >
              확인완료
            </div>
          </div>

          <Input
            type="text"
            placeholder="기존 비밀번호를 입력하세요."
            value={pw}
            onChange={e => {
              setPw(e.target.value);
              setError("");
            }}
          />

          <Input
            type="text"
            placeholder="변경할 비밀번호를 입력하세요."
            value={pwCheck}
            onChange={e => {
              setPwCheck(e.target.value);
              setError("");
            }}
          />

          <Input
            placeholder="닉네임을 입력하세요."
            value={nickname}
            onChange={e => {
              setNickname(e.target.value);
              setError("");
            }}
          />
        </div>

        {error && (
          <p className="text-sm text-[#E94235] mt-2 w-full text-left">
            {error}
          </p>
        )}

        <Button
          variant="full"
          disabled={isDisabled}
          onClick={handleSaveProfile}
          className="w-full mt-24"
        >
          프로필 수정하기
        </Button>
      </Container>

      {/* 모달들 */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};

export default ProfileEdit;
