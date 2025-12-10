/*
 * Diary - 일기 메인 화면
 *
 * 세부사항:
 * - Header Icon 클릭 시 대화 대기 페이지로 이동
 * - DiaryCard 리스트 표시
 * - DiaryCard 클릭 시 DiaryDetail page로 이동
 * - 임시 더미 데이터 사용
 */

import { useNavigate } from "react-router-dom";
import {
  BottomNav,
  Container,
  DefaultHeader,
  DiaryCard,
} from "@components/index";

const dummyData = [
  { date: "12월 8일", emotion: "무난함", topic: "여행/비" },
  { date: "12월 7일", emotion: "행복", topic: "여행" },
  { date: "12월 5일", emotion: "슬픔", topic: "학교" },
  { date: "12월 2일", emotion: "짜증", topic: "친구" },
];

const Diary = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader showIcon="diary" />

      <Container withBottomNav={true}>
        {dummyData.map((item, index) => (
          <DiaryCard
            key={index}
            date={item.date}
            emotion={item.emotion}
            topic={item.topic}
            onClick={() => navigate(`/diary/detail/${index}`)}
          />
        ))}
      </Container>

      <BottomNav />
    </div>
  );
};

export default Diary;
