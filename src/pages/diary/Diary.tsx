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
import { DIARY_LIST_DUMMIES } from "@mocks/diary";
import { EMOTIONS } from "@constants/emotions";

const Diary = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader showIcon="diary" />

      <Container withBottomNav={true}>
        {DIARY_LIST_DUMMIES.map(item => (
          <DiaryCard
            key={item.diaryId}
            date={item.title}
            emotion={EMOTIONS[item.emotion]}
            topic={item.topics.join(" / ")}
            onClick={() => navigate(`/diary/detail/${item.diaryId}`)}
          />
        ))}
      </Container>

      <BottomNav />
    </div>
  );
};

export default Diary;
