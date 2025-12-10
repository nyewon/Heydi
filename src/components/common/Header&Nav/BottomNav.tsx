import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuNotebook } from "react-icons/lu";
import { TbReport } from "react-icons/tb";
import { PiChatCenteredTextFill } from "react-icons/pi";
import { FiUser } from "react-icons/fi";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("call");

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith("/report")) {
      setActiveTab("report");
    } else if (currentPath.startsWith("/mypage")) {
      setActiveTab("mypage");
    } else if (currentPath.startsWith("/community")) {
      setActiveTab("community");
    } else {
      setActiveTab("diary");
    }
  }, [location.pathname]);

  const handleNavClick = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div
      className="
      fixed bottom-0 left-1/2 -translate-x-1/2
      w-full max-w-[425px] z-10 bg-white
      shadow-[0_-2px_3px_rgba(0,0,0,0.05)]
    "
    >
      <nav className="flex justify-between items-center p-3 w-full">
        <button
          onClick={() => handleNavClick("diary", "/diary")}
          className={`
            flex flex-col items-center flex-1 gap-1 font-bold text-[0.5rem]
            ${activeTab === "diary" ? "text-[#B28C7E]" : "text-[#EFE8E1]"}
          `}
        >
          <LuNotebook size={24} />
          일기
        </button>

        <button
          onClick={() => handleNavClick("report", "/report")}
          className={`
            flex flex-col items-center flex-1 gap-1 font-bold text-[0.5rem]
            ${activeTab === "report" ? "text-[#B28C7E]" : "text-[#EFE8E1]"}
          `}
        >
          <TbReport size={24} />
          리포트
        </button>

        <button
          onClick={() => handleNavClick("community", "/community")}
          className={`
            flex flex-col items-center flex-1 gap-1 font-bold text-[0.5rem]
            ${activeTab === "community" ? "text-[#B28C7E]" : "text-[#EFE8E1]"}
          `}
        >
          <PiChatCenteredTextFill size={24} />
          커뮤니티
        </button>

        <button
          onClick={() => handleNavClick("mypage", "/mypage")}
          className={`
            flex flex-col items-center flex-1 gap-1 font-bold text-[0.5rem]
            ${activeTab === "mypage" ? "text-[#B28C7E]" : "text-[#EFE8E1]"}
          `}
        >
          <FiUser size={24} />
          마이페이지
        </button>
      </nav>
    </div>
  );
};

export default BottomNav;
