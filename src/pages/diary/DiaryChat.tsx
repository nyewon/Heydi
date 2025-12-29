/*
 * DiaryChat - 일기 대화 중 화면
 *
 * 세부사항:
 * - 현재 날짜와 대화 경과 시간 표시
 * - 대화 종료하기 버튼 클릭 시 일기 메인 페이지로 이동
 * - 샘플 대화 메시지 표시 (사용자 및 어시스턴트)
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BackHeader, Container, Button } from "@components/index";
import { getFormattedDate, formatElapsedTime } from "@/utils/date";

const sampleMessages = [
  { id: 1, text: "안녕! 오늘은 어떤 하루를 보냈어?", type: "assistant" },
  {
    id: 2,
    text: "오늘 일본 여행을 시작했어. 오사카에 가는데 아침에 일찍 일어났더니 피곤하네. 하지만 기분은 좋아!",
    type: "user",
  },
];

const DiaryChat = () => {
  const navigate = useNavigate();
  const [today, setToday] = useState("");
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setToday(getFormattedDate());

    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleExitChat = () => {
    navigate("/diary");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container className="pt-4 pb-10">
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl font-bold text-[#76615A] mt-5">
            {today}
          </span>

          <span className="text-sm font-semibold text-[#76615A] mt-1">
            {formatElapsedTime(elapsed)}
          </span>
        </div>

        <div
          className="
            w-full bg-white rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.1)]
            border border-[#E0CFC5] p-4 mt-6
            h-[400px] overflow-y-auto
            scrollbar-none
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="flex flex-col gap-3">
            {sampleMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex w-full ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    px-3 py-2 rounded-lg text-xs leading-5 max-w-[70%]
                    ${
                      msg.type === "user"
                        ? "bg-[#B28C7E] text-[#FFFFFF]"
                        : "bg-[#EFE8E1] text-[#4A4A4A]"
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="full"
          className="w-full mt-17"
          onClick={handleExitChat}
        >
          대화 종료하기
        </Button>
      </Container>
    </div>
  );
};

export default DiaryChat;
