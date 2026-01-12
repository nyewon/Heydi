/*
 * DiaryInfoBox - 일기 정보 박스 컴포넌트
 *
 * 세부사항:
 * - Diary Detail, Diary Edit에서 사용
 * - 라벨과 내용을 표시
 */

import { ReactNode } from "react";
import Edit from "@assets/icons/edit.svg?react";
import { RiAddBoxFill } from "react-icons/ri";

type DiaryInfoBoxType = "none" | "edit" | "image";

interface DiaryInfoBoxProps {
  label: string;
  children: ReactNode;
  type?: DiaryInfoBoxType;
  onEditClick?: () => void;

  imageCount?: number;
  maxImageCount?: number;
  onImageAddClick?: () => void;
}

const DiaryInfoBox = ({
  label,
  children,
  type = "none",
  onEditClick,
  imageCount = 0,
  maxImageCount = 4,
  onImageAddClick,
}: DiaryInfoBoxProps) => {
  const showImageAddButton =
    type === "image" &&
    imageCount > 0 &&
    imageCount < maxImageCount &&
    onImageAddClick;

  return (
    <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold text-[#4A4A4A]">{label}</p>

        {type === "edit" && (
          <button
            onClick={onEditClick}
            className="text-[#B28C7E] cursor-pointer"
          >
            <Edit className="w-4 h-4" />
          </button>
        )}

        {showImageAddButton && (
          <button
            onClick={onImageAddClick}
            className="text-[#B28C7E] cursor-pointer"
          >
            <RiAddBoxFill size={24} />
          </button>
        )}
      </div>

      <div className="text-xs text-[#4A4A4A]">{children}</div>
    </div>
  );
};

export default DiaryInfoBox;
