/*
 * Login - 로그인 화면
 *
 * 세부사항:
 * - 아이디, 비밀번호 입력 폼
 * - 카카오, 구글 로그인 버튼
 * - 회원가입 페이지 이동 링크
 * - 유효성 검사
 * - 로그인 완료 후 Diary Page로 이동
 * - api 연동 완료
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@components/index";
import Logo from "@assets/logo.svg?react";
import KakaoIcon from "@assets/login/kakao.svg?react";
import GoogleIcon from "@assets/login/google.svg?react";
import { validateId, validatePassword } from "@utils/validate";
import { useFCM } from "@hooks/useFCM";
import { LoginRequest } from "@models/auths";
import { login, socialLogin } from "@services/auth";
import { useAuthStore } from "@stores/useAuthStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginSuccess = useAuthStore(state => state.loginSuccess);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const fcmToken = useFCM();

  const handleLogin = async () => {
    if (!validateId(id) || !validatePassword(pw)) {
      setError("로그인 양식이 일치하지 않습니다.");
      return;
    }

    try {
      const loginPayload: LoginRequest = {
        username: id,
        password: pw,
        fcmToken: fcmToken,
      };

      const res = await login(loginPayload);

      if (res.success) {
        setError("");
        loginSuccess(null);
        navigate("/diary");
      } else {
        setError(res.message || "로그인에 실패했습니다.");
      }
    } catch (e: any) {
      setError(
        e?.response?.data?.message || "서버와 통신 중 오류가 발생했습니다.",
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-10">
      <div className="flex flex-col items-center mb-15">
        <Logo />
      </div>

      <div className="w-full flex flex-col gap-4">
        <Input
          placeholder="아이디를 입력하세요."
          value={id}
          onChange={e => {
            setId(e.target.value);
            setError("");
          }}
          error={error.includes("아이디") ? error : ""}
        />

        <Input
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={pw}
          onChange={e => {
            setPw(e.target.value);
            setError("");
          }}
          error={error.includes("비밀번호") ? error : ""}
        />
      </div>

      {error && !error.includes("아이디") && !error.includes("비밀번호") && (
        <p className="text-sm text-[#E94235] mt-1 w-full text-left">{error}</p>
      )}

      <div className="w-full flex items-center justify-center my-10">
        <div className="flex-1 h-[1px] bg-[#D9D9D9]" />

        <div className="flex items-center gap-4 mx-4">
          <KakaoIcon
            className="cursor-pointer"
            onClick={() => socialLogin("kakao")}
          />

          <GoogleIcon
            className="cursor-pointer"
            onClick={() => socialLogin("google")}
          />
        </div>

        <div className="flex-1 h-[1px] bg-[#D9D9D9]" />
      </div>

      <p className="text-xs text-[#D9D9D9] mb-20">
        아직 회원가입을 안하셨나요?
        <span
          className="text-[#D4B6A6] font-bold cursor-pointer ml-2"
          onClick={() => navigate("/signup")}
        >
          회원가입하기
        </span>
      </p>

      <Button
        variant="full"
        disabled={!id || !pw}
        onClick={handleLogin}
        className="w-full"
      >
        로그인하기
      </Button>
    </div>
  );
};

export default LoginPage;
