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

const SelectDiary = () => {
  const [selectedDiaryId, setSelectedDiaryId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelect = () => {
    if (!selectedDiaryId) return;
    navigate(`/community/post-edit/${selectedDiaryId}`, { replace: true });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container className="pb-10">
        {[...DIARY_LIST_DUMMIES]
          .sort((a, b) => Number(b.diaryId) - Number(a.diaryId))
          .map(item => (
            <SelectDiaryCard
              key={item.diaryId}
              title={item.title}
              emotion={item.emotion}
              topics={item.topics}
              selected={selectedDiaryId === item.diaryId}
              onSelect={() => setSelectedDiaryId(item.diaryId)}
            />
          ))}

        <Button
          variant="full"
          className="w-full mt-8"
          disabled={!selectedDiaryId}
          onClick={handleSelect}
        >
          확인
        </Button>
      </Container>
    </div>
  );
};

export default SelectDiary;
