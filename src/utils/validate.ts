// 아이디 유효성 검사 (영문 + 숫자, 4자 이상)
export const validateId = (id: string): boolean =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(id);

// 비밀번호 유효성 검사 (영문 + 숫자 + 특수문자 포함, 8자 이상)
export const validatePassword = (password: string): boolean =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

// 닉네임 유효성 검사 (한글/영어/숫자(혼합 가능), 2자 이상, 특수기호 불가능)
export const validateNickname = (nickname: string): boolean =>
  /^[A-Za-z0-9가-힣]{2,}$/.test(nickname);
