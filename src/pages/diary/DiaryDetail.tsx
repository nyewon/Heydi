/*
 * DiaryDetail - 일기 상세보기 화면
 *
 * 세부사항:
 * - 일기 세부내용 표시
 * - 리포트로 보내기 버튼
 * - 임시 더미 데이터 사용
 * - 사진 업로드 기능은 UI만 구현
 */

import { Container, Button, BackHeader } from "@components/index";
import { PiChatCircleTextDuotone } from "react-icons/pi";
import Plus from "@assets/icons/plus.svg?react";

const DiaryDetail = () => {
  const handleSendToReport = () => {
    console.log("send to report");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader rightIcon="menu" />

      <Container className="pt-4 pb-[80px]">
        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
          <p className="text-sm font-bold text-[#4A4A4A]">12월 7일의 일기</p>
          <p className="text-[10px] text-[#4A4A4A] mt-1">
            작성 날짜: 2025.12.07
          </p>
          <p className="text-[10px] text-[#4A4A4A]">총 대화 시간: 07:32</p>
        </div>

        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-[#4A4A4A] flex items-center gap-1 mb-1">
            오늘의 감정상태
          </p>
          <p className="text-xs text-[#4A4A4A]">
            오늘은 행복한 하루를 보냈어요.
          </p>
        </div>

        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-[#4A4A4A] mb-1">오늘의 주제</p>
          <p className="text-xs text-[#4A4A4A]">여행 / 맛집</p>
        </div>

        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-[#4A4A4A] mb-1">
            오늘의 한 줄 일기
          </p>
          <p className="text-xs text-[#4A4A4A]">
            일본 여행을 시작한 첫 날이에요.
          </p>
        </div>

        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-[#4A4A4A] mb-2">오늘의 일기</p>
          <p className="text-[10px] text-[#4A4A4A] leading-5">
            오늘은 일본 여행 1일차예요. 아침 일찍 비행기를 타고 인천공항에서
            간사이 공항으로 이동했어요. 오랜만에 하는 여행이라서 매우 설렜어요.
            공항에 도착한 뒤에는 짐을 찾고 바로 숙소로 이동했어요. 저녁에는 숙소
            주변에서 간단하게 라멘을 먹었는데, 진한 국물 향이 피곤함을 싹
            날려줬어요. 오랜 이동으로 몸은 조금 피곤했지만, 드디어 여행이
            시작됐다는 설렘이 더 컸어요. 이제 내일은 본격적으로 여러 곳을
            돌아다닐 생각이라 벌써부터 기대가 돼요.
          </p>
        </div>

        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-[#4A4A4A] flex items-center gap-1 mb-2">
            <PiChatCircleTextDuotone size={14} className="text-[#B28C7E]" />
            오늘의 대화 내용
          </p>

          <div className="w-full flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            <div className="bg-[#EFE8E1] text-[#4A4A4A] text-[10px] p-2 rounded-lg max-w-[60%]">
              안녕! 오늘은 어떤 하루를 보냈어?
            </div>

            <div className="bg-[#B28C7E] text-white text-[10px] p-2 rounded-lg self-end max-w-[80%]">
              오늘 일본 여행을 시작했어. 오사카에 가는데 아침에 일찍 일어났더니
              피곤하네. 하지만 기분은 좋아!
            </div>

            <div className="bg-[#EFE8E1] text-[#4A4A4A] text-[10px] p-2 rounded-lg max-w-[60%]">
              와! 재밌었겠다. 일본에 도착한 뒤에 어떤 걸 했어?
            </div>

            <div className="bg-[#B28C7E] text-white text-[10px] p-2 rounded-lg self-end max-w-[80%]">
              공항에 도착하자마자 짐을 찾고 바로 숙소로 이동했어.
            </div>
          </div>
        </div>

        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-15">
          <p className="text-xs font-bold text-[#4A4A4A] mb-2">오늘의 사진</p>

          <label
            className="w-full h-[120px] bg-[#EFE8E1] rounded-xl border border-[#E0CFC5]
                       flex flex-col items-center justify-center cursor-pointer"
          >
            <Plus />
          </label>

          <p className="text-[10px] text-[#B28C7E] text-center mt-2">
            사진은 최대 4장까지 업로드 할 수 있어요.
          </p>
        </div>

        <Button variant="full" className="w-full" onClick={handleSendToReport}>
          리포트로 보내기
        </Button>
      </Container>
    </div>
  );
};

export default DiaryDetail;
