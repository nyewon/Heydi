import { useNavigate } from "react-router-dom";
import Logo from "@assets/logo_txt.svg?react";
import Community from "@assets/icons/community.svg?react";
import Diary from "@assets/icons/diary.svg?react";

interface HeaderProps {
  showIcon?: "diary" | "community" | false;
}

const DefaultHeader = ({ showIcon = false }: HeaderProps) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (showIcon === "community") {
      navigate("/community");
    } else if (showIcon === "diary") {
      navigate("/diary/wait");
    }
  };

  return (
    <header
      className="
        relative w-full bg-white 
        flex items-center justify-center 
        p-4
      "
    >
      <Logo className="mx-auto" />

      {showIcon && (
        <div
          className="absolute right-4 cursor-pointer"
          onClick={handleIconClick}
        >
          {showIcon === "community" && <Community />}
          {showIcon === "diary" && <Diary />}
        </div>
      )}
    </header>
  );
};

export default DefaultHeader;
