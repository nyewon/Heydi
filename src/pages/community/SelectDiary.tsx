/*
 * SelectDiary - 커뮤니티 게시글 작성 일기 선택 화면
 *
 * 세부사항:
 * - SelectDiaryCard 리스트 표시
 * - SelectDiaryCard 클릭 시 선택 상태 표시
 * - 확인 버튼 클릭 시 PostEdit page로 이동 (선택한 일기 id 전달)
 * - api 임시 연동. 연동 실패 시 더미 데이터 사용
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  BackHeader,
  SelectDiaryCard,
  Button,
} from "@components/index";
import { DIARY_LIST_DUMMIES } from "@mocks/diary";
import { DiaryListItem } from "@models/diary";
import { getDiaryList } from "@services/diary";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";

const SelectDiary = () => {
  const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);
  const [diaries, setDiaries] = useState<DiaryListItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaries = async () => {
      if (isFetching) return;
      if (totalPages !== null && page >= totalPages - 1) return;

      try {
        setIsFetching(true);
        const res = await getDiaryList(page, 20);

        setDiaries(prev => [...prev, ...res.content]);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error("일기 목록 조회 실패", e);

        if (page === 0) {
          setDiaries([...DIARY_LIST_DUMMIES]);
          setTotalPages(1);
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchDiaries();
  }, [page]);

  const hasMore = totalPages === null || page < totalPages - 1;

  const observerRef = useInfiniteScroll({
    hasMore,
    isFetching,
    onLoadMore: () => setPage(prev => prev + 1),
  });

  const handleConfirm = () => {
    if (selectedDiaryId === null) return;
    navigate(`/community/post-edit/${selectedDiaryId}`, { replace: true });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container className="pb-10">
        {[...diaries]
          .sort((a, b) => b.id - a.id)
          .map(item => (
            <SelectDiaryCard
              key={item.id}
              title={item.title}
              emotion={item.emotion}
              topics={item.topic}
              selected={item.id === selectedDiaryId}
              onSelect={() => setSelectedDiaryId(item.id)}
            />
          ))}

        <div ref={observerRef} className="h-10" />

        <Button
          variant="full"
          className="w-full mt-8"
          disabled={selectedDiaryId === null}
          onClick={handleConfirm}
        >
          확인
        </Button>
      </Container>
    </div>
  );
};

export default SelectDiary;
