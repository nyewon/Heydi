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
import { DiaryListItem } from "@/models/diary";

const Diary = () => {
  const navigate = useNavigate();

  const diaries: DiaryListItem[] = [...DIARY_LIST_DUMMIES];

  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader showIcon="diary" />

      <Container withBottomNav={true}>
        {diaries
          .sort((a, b) => b.id - a.id)
          .map(item => (
            <DiaryCard
              key={item.id}
              title={item.title}
              emotion={item.emotion}
              topics={item.topic}
              onClick={() => navigate(`/diary/detail/${item.id}`)}
            />
          ))}
      </Container>

      <BottomNav />
    </div>
  );
};

export default Diary;
