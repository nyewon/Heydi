interface ButtonProps {
  children: React.ReactNode;
  variant?: "full" | "pill" | "auto";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  children,
  variant = "auto",
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) => {
  const baseStyles = `
    font-semibold text-white
    flex items-center justify-center
    transition-none
  `;

  const variantStyles = {
    full: "w-full h-12 rounded-[8px] text-base",
    pill: "h-10 px-6 rounded-full text-base",
    auto: "px-4 h-10 rounded-[8px] text-base",
  }[variant];

  let colorStyles = "";

  if (disabled) {
    colorStyles = "bg-[#D9D9D9] cursor-not-allowed";
  } else {
    colorStyles =
      variant === "full"
        ? "bg-[#D4B6A6] cursor-pointer" // full 버튼 색
        : "bg-[#B28C7E] cursor-pointer"; // pill, auto 버튼 색
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variantStyles}
        ${colorStyles}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
