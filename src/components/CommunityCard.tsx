import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import DefaultProfile from "@assets/icons/profile_s.svg";

interface CommunityCardProps {
  profileImg?: string;
  writer: string;
  date: string;
  title: string;
  emotion: string;
  topic: string;
  content: string;
  likes: number;
  comments?: number;
  onClick?: () => void;
}

const CommunityCard = ({
  profileImg,
  writer,
  date,
  title,
  emotion,
  topic,
  content,
  likes,
  comments = 0,
  onClick,
}: CommunityCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(prev => !prev);
  };

  return (
    <div
      className="
        w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-5
        shadow-[0_2px_6px_rgba(0,0,0,0.1)] cursor-pointer
      "
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <img
            src={profileImg || DefaultProfile}
            alt="profile"
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-xs font-bold text-[#4A4A4A]">{writer}</span>
        </div>

        <span className="text-[10px] text-[#4A4A4A]">{date}</span>
      </div>

      <p className="text-[14px] font-bold text-[#4A4A4A] mb-2">{title}</p>

      <p className="text-[12px] font-bold text-[#4A4A4A] mb-2">
        감정: {emotion} &nbsp;&nbsp; 주제: {topic}
      </p>

      <p className="text-[12px] leading-5 font-bold text-[#4A4A4A] line-clamp-3 mb-4">
        {content}
      </p>

      <div className="flex items-center gap-5 pl-1">
        <button
          onClick={handleLikeToggle}
          className="flex items-center gap-1 cursor-pointer"
        >
          <FaHeart
            size={20}
            color={isLiked ? "#B28C7E" : "#EFE8E1"}
            className={isLiked ? "opacity-100" : "opacity-70"}
          />
          <span className="text-xs font-semibold text-[#4A4A4A]">
            {isLiked ? likes + 1 : likes}
          </span>
        </button>

        <div className="flex items-center gap-1">
          <IoChatboxEllipsesOutline size={20} color="#B28C7E" />
          <span className="text-xs font-semibold text-[#4A4A4A]">
            {comments}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
