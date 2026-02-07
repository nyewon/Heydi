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
 * - 프로필 수정 api 연동 완료
 */

import { useEffect, useState } from "react";
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
import { UserInfoUpdateRequest, UserInfoResponse } from "@models/mypage";
import { updateUserInfo, getUserInfo } from "@services/auth";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfoResponse | null>(null);
  const [pw, setPw] = useState("");
  const [newpw, setNewpw] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const {
    profileImg,
    profileFile,
    fileInputRef,
    handleSelectImage,
    openFileDialog,
  } = useProfileImage();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        const info = res.result as UserInfoResponse;

        setUser(info);
        setNickname(info.nickname);
      } catch {
        setError("프로필 정보를 불러오지 못했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  if (!user) return null;

  const displayImage = profileImg || user.profileImageUrl || null;
  const showPasswordFields = Boolean(user.password);

  const handleSaveProfile = async () => {
    setError("");

    if (!validateNickname(nickname)) {
      setError("닉네임 형식이 올바르지 않습니다.");
      return;
    }

    if (showPasswordFields) {
      if (newpw && !validatePassword(newpw)) {
        setError("새 비밀번호가 유효하지 않습니다.");
        return;
      }

      if (pw && newpw && pw === newpw) {
        setError("새 비밀번호는 기존 비밀번호와 달라야 합니다.");
        return;
      }
    }

    const payload: UserInfoUpdateRequest = {
      nickname,
      deleteProfileImage: profileFile === null,
    };

    if (showPasswordFields) {
      if (pw) payload.currentPassword = pw;
      if (newpw) payload.newPassword = newpw;
    }

    if (profileFile !== undefined) {
      payload.profileImage = profileFile;
    }

    try {
      await updateUserInfo(payload);
      navigate("/mypage", { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message || "프로필 수정 실패");
    }
  };

  const isDisabled =
    !validateNickname(nickname) ||
    (showPasswordFields && newpw.length > 0 && !validatePassword(newpw));

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container className="pt-6 pb-10">
        <div className="relative flex items-center justify-center mt-5 mb-18">
          {displayImage ? (
            <img
              src={displayImage}
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
          className="w-full text-left text-sm text-[#B28C7E] font-extrabold mb-6 flex items-center gap-1"
          onClick={() => setIsGuideOpen(true)}
        >
          <IoMdInformationCircle size={24} />
          회원가입 가이드 보기
        </button>

        <div className="w-full flex flex-col gap-5">
          <div className="relative w-full">
            <input
              type="text"
              value={user.username}
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

          {showPasswordFields && (
            <>
              <Input
                type="password"
                placeholder="기존 비밀번호를 입력하세요."
                value={pw}
                onChange={e => {
                  setPw(e.target.value);
                  setError("");
                }}
              />

              <Input
                type="password"
                placeholder="변경할 비밀번호를 입력하세요."
                value={newpw}
                onChange={e => {
                  setNewpw(e.target.value);
                  setError("");
                }}
              />
            </>
          )}

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

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};

export default ProfileEdit;
