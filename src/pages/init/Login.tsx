/*
 * Login - 로그인 화면
 *
 * 세부사항:
 * - 아이디, 비밀번호 입력 폼
 * - 카카오, 구글 로그인 버튼
 * - 회원가입 페이지 이동 링크
 * - 유효성 검사
 * - 로그인 완료 후 Diary Page로 이동
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@components/index";
import Logo from "@assets/logo.svg?react";
import KakaoIcon from "@assets/login/kakao.svg?react";
import GoogleIcon from "@assets/login/google.svg?react";
import { validateId, validatePassword } from "@utils/validate";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (id === "test123" && pw === "test123!") {
      navigate("/diary");
      setError("");
      return;
    }

    if (!validateId(id) || !validatePassword(pw)) {
      setError("로그인 양식이 일치하지 않습니다.");
      return;
    }

    if (id !== "test123") {
      setError("존재하지 않는 사용자입니다.");
      return;
    }

    if (pw !== "1234") {
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
      return;
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
          <KakaoIcon className="cursor-pointer" />
          <GoogleIcon className="cursor-pointer" />
        </div>

        <div className="flex-1 h-[1px] bg-[#D9D9D9]" />
      </div>

      <p className="text-xs text-[#D9D9D9] mb-20">
        아직 회원가입을 안하셨나요?
        <span
          className="text-[#D4B6A6] font-semibold cursor-pointer ml-2"
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
