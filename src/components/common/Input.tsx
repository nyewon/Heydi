import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

interface InputProps {
  placeholder?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  type?: string; // "text" | "password"
}

const Input = ({
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = "",
  type = "text",
}: InputProps) => {
  const [showPw, setShowPw] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && !showPw ? "password" : "text";

  return (
    <div className={`relative w-full flex flex-col gap-1 ${className}`}>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        spellCheck={false}
        className={`
          w-full h-12 px-4 pr-10
          rounded-[8px]
          border text-sm outline-none

          placeholder-[#D0D0D0]
          ${error ? "text-[#E94235]" : "text-[#4A4A4A]"}

          ${
            disabled
              ? "bg-[#ffffff] border-[#D9D9D9] cursor-not-allowed"
              : error
                ? "border-[#E94235]"
                : "border-[#D9D9D9]"
          }

          transition-none
        `}
      />

      {isPassword && !disabled && (
        <div
          className="
            absolute right-3 top-1/2 -translate-y-1/2 
            cursor-pointer text-[#D9D9D9]
          "
          onClick={() => setShowPw(!showPw)}
        >
          {showPw ? (
            <VscEye size={20} color="EFE8E1" />
          ) : (
            <VscEyeClosed size={20} />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
