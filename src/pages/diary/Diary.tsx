/*
 * Diary - 일기 메인 화면
 *
 * 세부사항:
 * - Header Icon 클릭 시 대화 대기 페이지로 이동
 * - DiaryCard 리스트 표시
 * - DiaryCard 클릭 시 DiaryDetail page로 이동
 * - api 연동 완료, 연동 실패 시 더미 데이터 사용
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BottomNav,
  Container,
  DefaultHeader,
  DiaryCard,
} from "@components/index";
import { DIARY_LIST_DUMMIES } from "@mocks/diary";
import { useDiaryList } from "@queries/diary/useDiaryList";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";

const Diary = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const { data, isFetching, isError } = useDiaryList(page);

  const diaries = data?.content ?? [];
  const totalPages = data?.totalPages ?? null;

  const hasMore = totalPages === null || page < totalPages - 1;

  const observerRef = useInfiniteScroll({
    hasMore,
    isFetching,
    onLoadMore: () => setPage(prev => prev + 1),
  });

  const displayDiaries = page === 0 && isError ? DIARY_LIST_DUMMIES : diaries;

  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader showIcon="diary" />

      <Container withBottomNav={true}>
        {displayDiaries.length === 0 && !isFetching && (
          <div className="w-full flex flex-col items-center mt-20 text-center">
            <p className="text-base font-extrabold text-[#7C7C7C]">
              아직 작성된 일기가 없어요🥲
            </p>

            <p className="text-sm font-bold text-[#A1A1A1] mt-4">
              오늘 하루를 기록해보세요!
            </p>
          </div>
        )}

        {[...displayDiaries]
          .sort((a, b) => b.diaryId - a.diaryId)
          .map(item => (
            <DiaryCard
              key={item.diaryId}
              title={item.title}
              emotion={item.emotion}
              topics={item.topics}
              onClick={() => navigate(`/diary/detail/${item.diaryId}`)}
            />
          ))}

        <div ref={observerRef} className="h-10" />
      </Container>

      <BottomNav />
    </div>
  );
};

export default Diary;
