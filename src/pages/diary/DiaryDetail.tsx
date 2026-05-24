/*
 * DiaryDetail - 일기 상세보기 화면
 *
 * 세부사항:
 * - 일기 세부내용 표시
 * - 리포트로 보내기 버튼
 * - 사진 데이터가 있을 때만 오늘의 사진 보이기
 * - api 임시 연동, 연동 실패 시 더미 데이터 사용
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
import {
  DIARY_DETAIL_DUMMIES,
  CONVERSATION_MESSAGES_DUMMIES,
} from "@mocks/diary";
import { EMOTION_S_ICONS, EMOTION_SENTENCE } from "@constants/emotions";
import { formatDate, formatElapsedTime } from "@utils/date";
import {
  useDiaryDetail,
  useDiaryConversation,
} from "@queries/diary/useDiaryDetail";
import { sendDiaryToMonthlyReport } from "@services/diary";
import { ConversationMessagesResponse } from "@models/diary";

const DiaryDetail = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const id = Number(diaryId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const { data: detailData, isError: detailError } = useDiaryDetail(id);

  const { data: conversationData, isError: convError } =
    useDiaryConversation(id);

  const diary =
    detailError || !detailData
      ? (DIARY_DETAIL_DUMMIES.find(d => d.id === id) ?? null)
      : detailData;

  const messages =
    convError || !conversationData
      ? (CONVERSATION_MESSAGES_DUMMIES[id] ?? null)
      : (conversationData as ConversationMessagesResponse);

  if (!diary) {
    return (
      <div className="w-full flex justify-center items-center text-center p-10 text-sm font-bold text-[#76615A]">
        Error <br />
        일기를 찾을 수 없습니다.
      </div>
    );
  }

  const handleSendToReport = async () => {
    if (!diary || isSending) return;

    try {
      setIsSending(true);

      await sendDiaryToMonthlyReport(diary.report.month, {
        diaryId: diary.id,
      });

      diary.report.included = true;
    } catch (e) {
      console.error("리포트 전송 실패", e);
      alert("리포트 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader rightIcon="menu" diaryId={diaryId} />

      <Container className="pb-10">
        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
          <p className="text-sm font-extrabold text-[#4A4A4A] mb-2">
            {diary.title}
          </p>
          <p className="text-xs text-[#4A4A4A]">
            작성 날짜: {formatDate(diary.createdDate)}
          </p>
          <p className="text-xs text-[#4A4A4A]">
            총 대화 시간: {formatElapsedTime(diary.conversationDurationSec)}
          </p>
        </div>

        <DiaryInfoBox label="오늘의 감정상태">
          <div className="flex items-center gap-1">
            <span>{EMOTION_S_ICONS[diary.emotionCategory]}</span>
            <span>
              오늘은 {EMOTION_SENTENCE[diary.emotionCategory]} 하루를 보냈어요.
            </span>
          </div>
        </DiaryInfoBox>

        <DiaryInfoBox label="오늘의 주제">
          {diary.topic.join(" / ")}
        </DiaryInfoBox>

        <DiaryInfoBox label="오늘의 한 줄 일기">
          {diary.oneLineDiary}
        </DiaryInfoBox>

        <DiaryInfoBox label="오늘의 일기">
          <p className="text-xs leading-5">{diary.content}</p>
        </DiaryInfoBox>

        <DiaryInfoBox label="오늘의 대화 내용">
          <div className="w-full flex flex-col gap-2 max-h-[300px] overflow-y-auto pt-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {messages?.messages?.map((msg, idx) => (
              <div
                key={idx}
                className={`text-[10px] p-2 px-3 rounded-lg wrap-break-word inline-block w-fit min-w-[60px] ${
                  msg.role === "AI"
                    ? "bg-[#EFE8E1] text-[#4A4A4A] max-w-[60%] self-start rounded-bl-none"
                    : "bg-[#B28C7E] text-white max-w-[80%] self-end rounded-br-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </DiaryInfoBox>

        {diary.photos.length > 0 && (
          <DiaryInfoBox label="오늘의 사진">
            <ImageSlider
              images={diary.photos}
              currentIndex={currentIndex}
              onChangeIndex={setCurrentIndex}
            />
          </DiaryInfoBox>
        )}

        <Button
          variant="full"
          className="w-full mt-8"
          onClick={handleSendToReport}
          disabled={isSending || diary.report.included}
        >
          {isSending || diary.report.included
            ? "리포트 전달 완료"
            : "리포트로 보내기"}
        </Button>
      </Container>
    </div>
  );
};

export default DiaryDetail;
