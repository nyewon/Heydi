/*
 * SelectDiary - 일기 메인 화면
 *
 * 세부사항:
 * - SelectDiaryCard 리스트 표시
 * - 임시 더미 데이터 사용
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  BackHeader,
  SelectDiaryCard,
  Button,
} from "@components/index";
import { DIARY_LIST_DUMMIES } from "@mocks/diary";
import { DiaryListItem } from "@models/diary";

const SelectDiary = () => {
  const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (selectedDiaryId === null) return;
    navigate(`/community/post-edit/${selectedDiaryId}`, { replace: true });
  };

  const diaries: DiaryListItem[] = DIARY_LIST_DUMMIES;

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container className="pb-10">
        {diaries
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
