import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { LuMenu } from "react-icons/lu";
import Logo from "@assets/logo_txt.svg?react";
import SaveIcon from "@assets/icons/save.svg?react";

interface BackHeaderProps {
  rightIcon?: "none" | "save" | "menu";
}

const BackHeader = ({ rightIcon = "none" }: BackHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleRightClick = () => {
    if (rightIcon === "save") {
      console.log("Save clicked");
    }
    if (rightIcon === "menu") {
      console.log("Menu clicked");
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
      <button onClick={handleBack} className="absolute left-4 cursor-pointer">
        <MdArrowBackIosNew size={24} color="#B28C7E" />
      </button>

      <Logo className="mx-auto" />

      {rightIcon !== "none" && (
        <div
          className="absolute right-4 cursor-pointer"
          onClick={handleRightClick}
        >
          {rightIcon === "save" && <SaveIcon />}
          {rightIcon === "menu" && <LuMenu size={24} color="#B28C7E" />}
        </div>
      )}
    </header>
  );
};

export default BackHeader;
