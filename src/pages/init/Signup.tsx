/*
 * Signup - 회원가입 화면
 *
 * 세부사항:
 * - 프로필 이미지 선택 기능
 * - 아이디, 비밀번호, 닉네임 입력 폼
 * - 아이디 중복 확인, 회원가입 가이드 모달
 * - 유효성 검사
 * - 회원가입 완료 후 Login으로 이동
 * - username 중복확인 및 회원가입 api 연동 완료
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BackHeader,
  Container,
  Input,
  Button,
  IdCheckModal,
  GuideModal,
} from "@components/index";
import { useProfileImage } from "@hooks/useProfileImage";
import {
  validateId,
  validatePassword,
  validateNickname,
} from "@utils/validate";
import Profile from "@assets/icons/profile.svg?react";
import Plus from "@assets/icons/plus.svg?react";
import { IoMdInformationCircle } from "react-icons/io";
import { SignupRequest, UsernameCheckRequest } from "@models/auths";
import { signup, usernameCheck } from "@services/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [modalType, setModalType] = useState<null | "success" | "fail">(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const { profileImg, fileInputRef, handleSelectImage, openFileDialog } =
    useProfileImage();

  const isDisabled =
    !isIdChecked ||
    !validatePassword(pw) ||
    !validatePassword(pwCheck) ||
    !validateNickname(nickname);

  const handleCheckId = async () => {
    if (!validateId(id)) return;

    try {
      const payload: UsernameCheckRequest = {
        username: id,
      };

      const res = await usernameCheck(payload);

      if (res.result?.duplicate === false) {
        setModalType("success");
        setIsIdChecked(true);
        return;
      }

      setModalType("fail");
      setIsIdChecked(false);
    } catch {
      setModalType("fail");
      setIsIdChecked(false);
    }
  };

  const handleSignup = async () => {
    setError("");

    if (!id || !pw || !pwCheck || !nickname) {
      setError("회원가입 양식이 일치하지 않습니다.");
      return;
    }

    if (
      !validateId(id) ||
      !validatePassword(pw) ||
      !validateNickname(nickname)
    ) {
      setError("회원가입 양식이 일치하지 않습니다.");
      return;
    }

    if (pw !== pwCheck) {
      setError("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    const signupPayload: SignupRequest = {
      username: id,
      password: pw,
      nickname,
      profileImage: fileInputRef.current?.files?.[0] ?? null,
    };

    try {
      const res = await signup(signupPayload);

      if (res.success) {
        alert("회원가입 성공!");
        navigate(-1);
        return;
      }

      setError(res.message || "회원가입에 실패했습니다.");
    } catch {
      setError("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container className="pt-6 pb-10">
        <div className="relative flex items-center justify-center mt-5 mb-18">
          {profileImg ? (
            <img
              src={profileImg}
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
          <IoMdInformationCircle size={24} color="#B28C7E" />
          회원가입 가이드 보기
        </button>

        <div className="w-full flex flex-col gap-5">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              value={id}
              onChange={e => {
                if (!isIdChecked) {
                  setId(e.target.value);
                  setIsIdChecked(false);
                  setError("");
                }
              }}
              readOnly={isIdChecked}
              className="
                w-full h-12 px-4 pr-24
                rounded-[8px] border text-sm outline-none
                placeholder-[#D0D0D0]
                text-[#4A4A4A] border-[#D9D9D9]
              "
            />

            <button
              onClick={handleCheckId}
              disabled={!validateId(id) || isIdChecked}
              className={`
                absolute top-1/2 -translate-y-1/2 right-[10px]
                w-20 h-8 rounded-[8px] text-sm text-white
                flex items-center justify-center
                ${
                  isIdChecked
                    ? "bg-[#EFE8E1] text-[#4A4A4A] cursor-not-allowed"
                    : validateId(id)
                      ? "bg-[#D4B6A6]"
                      : "bg-[#D9D9D9]"
                }
              `}
            >
              {isIdChecked ? "확인완료" : "중복확인"}
            </button>
          </div>

          <Input
            type="text"
            placeholder="비밀번호를 입력하세요."
            value={pw}
            onChange={e => {
              setPw(e.target.value);
              setError("");
            }}
          />

          <Input
            type="password"
            placeholder="비밀번호를 재입력 하세요."
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
          onClick={handleSignup}
          className="w-full mt-24"
        >
          회원가입하기
        </Button>
      </Container>

      {modalType && (
        <IdCheckModal
          isOpen={modalType !== null}
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};

export default Signup;
