/*
 * DiaryCard - 일기 카드 컴포넌트
 *
 * 세부사항:
 * - Diary Page에서 사용
 * - 날짜, 감정, 주제 표시
 * - 클릭 시 상세 페이지로 이동 가능
 */

import Note from "@assets/icons/note.svg?react";

interface DiaryCardProps {
  date: string;
  emotion: string;
  topic: string;
  onClick?: () => void;
}

const DiaryCard = ({ date, emotion, topic, onClick }: DiaryCardProps) => {
  return (
    <div
      className="
        w-full bg-white rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.1)]
        p-5 flex justify-between items-center mb-4
        border border-[#E0CFC5] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold text-[#4A4A4A] mb-1">
          {date}의 일기
        </span>

        <div className="flex items-center text-xs font-semibold text-[#4A4A4A] gap-4">
          <span>감정: {emotion}</span>
          <span>주제: {topic}</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Note />
      </div>
    </div>
  );
};

export default DiaryCard;
