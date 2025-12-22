/*
 * DiaryDetail - 일기 상세보기 화면
 *
 * 세부사항:
 * - 일기 세부내용 표시
 * - 리포트로 보내기 버튼
 * - 임시 더미 데이터 사용
 * - 사진 데이터가 있을 때만 오늘의 사진 보이기
 */

import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Button,
  BackHeader,
  DiaryInfoBox,
  ImageSlider,
} from "@components/index";
import { DIARY_DETAIL_DUMMIES } from "@mocks/diary";
import { EMOTION_S_ICONS, EMOTION_SENTENCE } from "@constants/emotions";

const DiaryDetail = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const diary = DIARY_DETAIL_DUMMIES.find(d => d.diaryId === diaryId);

  if (!diary) {
    return (
      <div className="w-full flex justify-center items-center text-center p-10 text-sm font-semibold text-[#76615A]">
        Error <br />
        일기를 찾을 수 없습니다.
      </div>
    );
  }

  const handleSendToReport = () => {
    if (isSending) return;

    console.log("send to report");
    setIsSending(true);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader rightIcon="menu" diaryId={diaryId} />

      <Container className="pb-10">
        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
          <p className="text-sm font-bold text-[#4A4A4A] mb-2">{diary.title}</p>
          <p className="text-xs text-[#4A4A4A]">작성 날짜: {diary.createdAt}</p>
          <p className="text-xs text-[#4A4A4A]">
            총 대화 시간: {diary.totalTalkTime}
          </p>
        </div>

        <DiaryInfoBox label="오늘의 감정상태">
          <div className="flex items-center gap-1">
            <span className="flex items-center">
              {EMOTION_S_ICONS[diary.emotion]}
            </span>
            <span>
              오늘은 {EMOTION_SENTENCE[diary.emotion]} 하루를 보냈어요.
            </span>
          </div>
        </DiaryInfoBox>

        <DiaryInfoBox label="오늘의 주제">
          {diary.topics.join(" / ")}
        </DiaryInfoBox>

        <DiaryInfoBox label="오늘의 한 줄 일기">{diary.oneLine}</DiaryInfoBox>

        <DiaryInfoBox label="오늘의 일기">
          <p className="text-xs leading-5">{diary.content}</p>
        </DiaryInfoBox>

        <DiaryInfoBox label="오늘의 대화 내용">
          <div className="w-full flex flex-col gap-2 max-h-[300px] overflow-y-auto pt-2">
            {diary.conversations.map((msg, idx) => (
              <div
                key={idx}
                className={`text-[10px] p-2 px-3 rounded-lg break-words inline-block w-fit min-w-[60px] ${
                  msg.role === "assistant"
                    ? "bg-[#EFE8E1] text-[#4A4A4A] max-w-[60%] self-start"
                    : "bg-[#B28C7E] text-white max-w-[80%] self-end"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
        </DiaryInfoBox>

        {diary.images.length > 0 && (
          <DiaryInfoBox label="오늘의 사진">
            <ImageSlider
              images={diary.images}
              currentIndex={currentIndex}
              onChangeIndex={setCurrentIndex}
            />
          </DiaryInfoBox>
        )}

        <Button
          variant="full"
          className="w-full mt-8"
          onClick={handleSendToReport}
          disabled={isSending}
        >
          리포트로 보내기
        </Button>
      </Container>
    </div>
  );
};

export default DiaryDetail;
