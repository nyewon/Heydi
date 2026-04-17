/*
 * DiaryWaiting - 일기 대화 대기 화면
 *
 * 세부사항:
 * - 현재 날짜와 시간 표시
 * - 대화 시작하기 버튼 클릭 시 대화 시작 화면으로 이동
 * - 대화 세션 시작 API 임시 연동
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, BackHeader } from "@components/index";
import Bear from "@assets/icons/bear.png";
import { getFormattedDate, getFormattedTime } from "@/utils/date";
import { startConversationSession } from "@services/diary";

const getISODate = () => {
  return new Date().toISOString().slice(0, 10);
};

const DiaryWaiting = () => {
  const navigate = useNavigate();
  const [today, setToday] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setToday(getFormattedDate());
    setTime(getFormattedTime());
  }, []);

  const handleStartChat = async () => {
    try {
      const today = getISODate();
      const res = await startConversationSession(today);

      if (res.success) {
        const diaryId = res.result.diaryId;
        navigate(`/diary/chat/${diaryId}`, { replace: true });
        console.log("대화 세션 시작 성공, diaryId:", diaryId);
      }
    } catch (e: any) {
      if (e.response?.status === 409) {
        alert("이미 오늘 일기가 존재합니다");
      } else {
        console.error("세션 시작 실패", e);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container className="pb-10">
        <div className="flex flex-col items-center text-center mt-20 mb-20">
          <span className="text-2xl font-extrabold text-[#76615A]">
            {today}
          </span>

          <span className="text-base font-bold text-[#76615A] mt-1">
            {time}
          </span>

          <div className="mt-6 mb-6">
            <img src={Bear} alt="bear" className="w-50 h-auto" loading="lazy" />
          </div>

          <p className="text-xs font-bold text-[#76615A] mb-15">
            대화를 시작해 오늘의 하루를 들려주세요
          </p>
        </div>

        <Button variant="full" className="w-full" onClick={handleStartChat}>
          대화 시작하기
        </Button>
      </Container>
    </div>
  );
};

export default DiaryWaiting;
