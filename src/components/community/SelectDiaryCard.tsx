/*
 * SelectDiaryCard - 커뮤니티 글 작성 일기 카드 컴포넌트
 *
 * 세부사항:
 * - SelectDiary Page에서 사용
 * - 날짜, 감정, 주제 표시
 * - 선택 상태 표시 (한 개만 선택 가능)
 */

import { EmotionKey, EMOTIONS } from "@constants/emotions";
import { FaRegCircleCheck, FaCircleCheck } from "react-icons/fa6";

interface DiaryCardProps {
  title: string;
  emotion: EmotionKey;
  topics: string[];
  selected: boolean;
  onSelect: () => void;
}

const SelectDiaryCard = ({
  title,
  emotion,
  topics,
  selected,
  onSelect,
}: DiaryCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`
        w-full rounded-xl p-5 mb-4 flex justify-between items-center
        border cursor-pointer bg-white
        ${selected ? "border-[#B08968]" : "border-[#E0CFC5]"}
        shadow-[0_2px_6px_rgba(0,0,0,0.1)]
      `}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold text-[#4A4A4A] mb-1">
          {title}의 일기
        </span>

        <div className="flex items-center text-xs font-semibold text-[#4A4A4A] gap-4">
          <span>감정: {EMOTIONS[emotion]}</span>
          <span>주제: {topics.join(" / ")}</span>
        </div>
      </div>

      <div>
        {selected ? (
          <FaCircleCheck size={28} className="text-[#B28C7E]" />
        ) : (
          <FaRegCircleCheck size={28} className="text-[#EFE8E1]" />
        )}
      </div>
    </div>
  );
};

export default SelectDiaryCard;
