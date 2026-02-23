/*
 * Report - 월간 리포트 화면
 *
 * 세부사항:
 * - 이번 달의 감정 변화 차트
 * - 자주 나온 주제 태그 (추후 수정 예정)
 * - 좋아하는 것 / 싫어하는 것
 * - 이번 달 활동 요약
 * - 인사이트 & 피드백
 * - 캘린더
 * - 한 달 전 하루 일기 카드
 * - api 임시 연동, 연동 실패 시 임시 더미 데이터 사용
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  DefaultHeader,
  BottomNav,
  DiaryCard,
  EmotionChart,
  TopTopics,
  Calendar,
  MonthModal,
} from "@components/index";
import { IoCalendarNumberOutline } from "react-icons/io5";
import {
  MONTHLY_EMOTION_DUMMY,
  MONTHLY_TOPICS_DUMMY,
  CALENDAR_DUMMY,
  MONTHLY_REPORT_DUMMY,
} from "@mocks/report";
import {
  getMonthlyCalendar,
  getMonthlyEmotions,
  getMonthlyReport,
  getMonthlyTopics,
} from "@services/report";
import {
  CalendarResponse,
  MonthlyEmotionResponse,
  MonthlyReportResponse,
  MonthlyTopicsResponse,
} from "@models/report";

const Report = () => {
  const navigate = useNavigate();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
  const [report, setReport] = useState<MonthlyReportResponse | null>(null);
  const [calendar, setCalendar] = useState<CalendarResponse["entries"] | null>(
    null,
  );
  const [topics, setTopics] = useState<MonthlyTopicsResponse | null>(null);
  const [emotions, setEmotions] = useState<MonthlyEmotionResponse | null>(null);
  const yearMonth = `${year}-${String(month).padStart(2, "0")}`;

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getMonthlyReport(yearMonth);

        if (res.isSuccess) {
          setReport(res.result);
        } else {
          setReport(MONTHLY_REPORT_DUMMY);
        }
      } catch (error) {
        console.error("월간 리포트 조회 실패", error);
        setReport(MONTHLY_REPORT_DUMMY);
      }
    };

    const fetchCalendar = async () => {
      try {
        const res = await getMonthlyCalendar(yearMonth);

        if (res.isSuccess) {
          setCalendar(res.result.entries);
        } else {
          setCalendar(CALENDAR_DUMMY.entries);
        }
      } catch (error) {
        console.error("캘린더 조회 실패", error);
        setCalendar(CALENDAR_DUMMY.entries);
      }
    };

    const fetchTopics = async () => {
      try {
        const res = await getMonthlyTopics(yearMonth);

        if (res.isSuccess) {
          setTopics(res.result);
        } else {
          setTopics(MONTHLY_TOPICS_DUMMY);
        }
      } catch (error) {
        console.error("주제 조회 실패", error);
        setTopics(MONTHLY_TOPICS_DUMMY);
      }
    };

    const fetchEmotions = async () => {
      try {
        const res = await getMonthlyEmotions(yearMonth);

        if (res.isSuccess) {
          setEmotions(res.result);
        } else {
          setEmotions(MONTHLY_EMOTION_DUMMY);
        }
      } catch (error) {
        console.error("감정 조회 실패", error);
        setEmotions(MONTHLY_EMOTION_DUMMY);
      }
    };

    fetchReport();
    fetchCalendar();
    fetchTopics();
    fetchEmotions();
  }, [yearMonth]);

  if (!report || !calendar || !topics || !emotions) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader />

      <Container withBottomNav={true}>
        <div className="w-full flex flex-col mb-3">
          <div
            className="flex justify-end items-center text-xs font-bold text-[#4A4A4A] gap-1 mb-1 cursor-pointer"
            onClick={() => setIsMonthModalOpen(true)}
          >
            <IoCalendarNumberOutline size={18} color="#76615A" />
            <span>
              {year}년 {month}월
            </span>
          </div>

          <p className="text-base font-bold text-[#4A4A4A]">
            이번달의 감정 변화
          </p>
        </div>
        <EmotionChart data={emotions} />

        <div className="w-full flex flex-col mb-3">
          <p className="text-base font-bold text-[#4A4A4A]">자주 나온 주제</p>
        </div>
        <TopTopics data={topics} />

        <div className="w-full mb-6">
          <div className="flex justify-between">
            <div className="flex-1 mr-2">
              <p className="text-base font-bold text-[#4A4A4A] mb-2">
                좋아하는 것
              </p>
              <div
                className="
                  py-4 bg-[#EFE8E1] rounded-xl text-xs text-[#4A4A4A]
                  flex items-center justify-center
                "
              >
                {report.preferences.like}
              </div>
            </div>

            <div className="flex-1 ml-2">
              <p className="text-base font-bold text-[#4A4A4A] mb-2">
                싫어하는 것
              </p>
              <div
                className="
                  py-4 bg-[#EFE8E1] rounded-xl text-xs text-[#4A4A4A]
                  flex items-center justify-center
                "
              >
                {report.preferences.dislike}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col mb-3">
          <p className="text-base font-bold text-[#4A4A4A]">
            이런 활동을 많이 했어요
          </p>
        </div>
        <div className="w-full bg-[#EFE8E1] rounded-xl p-4 mb-6">
          <p className="text-xs text-[#4A4A4A] leading-5">
            {report.activity.summary}
          </p>
        </div>

        <div className="w-full flex flex-col mb-3">
          <p className="text-base font-bold text-[#4A4A4A]">
            인사이트 & 피드백
          </p>
        </div>
        <div className="w-full bg-[#EFE8E1] rounded-xl p-4 mb-6">
          <p className="text-xs leading-5 text-[#4A4A4A]">
            {report.insight.content}
          </p>
        </div>

        <div className="w-full flex flex-col mb-3">
          <p className="text-base font-bold text-[#4A4A4A]">캘린더</p>
        </div>

        <Calendar year={year} month={month} calendars={calendar} />

        <div className="w-full mt-6 mb-2">
          <p className="text-base font-bold text-[#4A4A4A] mb-2">
            한 달 전에 이런 하루가 있었어요
          </p>

          <DiaryCard
            {...report.lastMonthReminder}
            onClick={() =>
              navigate(`/diary/detail/${report.lastMonthReminder.diaryId}`)
            }
          />
        </div>
      </Container>

      <BottomNav />

      <MonthModal
        isOpen={isMonthModalOpen}
        onClose={() => setIsMonthModalOpen(false)}
        defaultYear={year}
        defaultMonth={month}
        onConfirm={(y, m) => {
          setYear(y);
          setMonth(m);
        }}
      />
    </div>
  );
};

export default Report;
