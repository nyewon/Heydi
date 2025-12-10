/*
 * CommunityDetail - 커뮤니티 글 상세보기 화면
 *
 * 세부사항:
 * - 글 작성자 프로필, 작성일, 제목, 감정, 주제, 내용, 작성된 일기 날짜 표시
 * - 좋아요 및 댓글 수 표시 및 좋아요 기능 구현
 * - 댓글 목록 표시 및 댓글 작성 기능 구현
 * - 현재 사용자는 "Test"로 가정
 * - 더미 데이터 사용
 */

import { useState } from "react";
import { Container, BackHeader } from "@components/index";
import DefaultProfile from "@assets/icons/profile_s.svg";
import { FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Send from "@assets/icons/send.svg?react";

const CommunityDetail = () => {
  const currentUser = "Test";

  const dummyPost = {
    writer: "Test",
    profile: "",
    date: "2025.12.7",
    title: "일본 여행 1일차",
    emotion: "행복",
    topic: "여행",
    content: `
오늘은 일본 여행 1일차예요. 아침 일찍 비행기를 타고 인천공항에서 간사이 공항으로 이동했어요. 오랜만에 하는 여행이라서 매우 설렜어요. 공항에 도착한 뒤에는 짐을 찾고 바로 숙소로 이동했어요.
저녁에는 숙소 주변에서 간단하게 라멘을 먹었는데, 진한 국물 향이 피곤함을 싹 날려줬어요. 오랜 이동으로 몸은 조금 피곤했지만, 드디어 여행이 시작됐다는 설렘이 더 컸어요.
이제 내일은 본격적으로 여러 곳을 돌아다닐 생각이라 벌써부터 기대가 돼요.
    `,
    likes: 32,
    comments: 2,
    diarydate: "2025.12.5에 작성된 일기입니다.",
  };

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(dummyPost.likes);

  const handleToggleLike = () => {
    setIsLiked(prev => !prev);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const [comments, setComments] = useState([
    {
      writer: "Test1",
      profile: "",
      content: "정말 좋은 하루를 보냈네요!",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleAddComment = () => {
    if (!inputValue.trim()) return;

    const newComment = {
      writer: currentUser,
      profile: "",
      content: inputValue,
    };

    setComments(prev => [...prev, newComment]);
    setInputValue("");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container>
        <div className="bg-white border border-[#E0CFC5] rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <img
                src={dummyPost.profile || DefaultProfile}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-bold text-[#4A4A4A]">
                {dummyPost.writer}
              </span>
            </div>
            <span className="text-[10px] text-[#4A4A4A]">{dummyPost.date}</span>
          </div>

          <p className="text-sm font-bold text-[#4A4A4A] mb-3">
            {dummyPost.title}
          </p>

          <p className="text-[12px] text-[#4A4A4A]">
            감정: {dummyPost.emotion} &nbsp;&nbsp; 주제: {dummyPost.topic}
          </p>

          <p className="text-[12px] text-[#4A4A4A] whitespace-pre-line mb-2">
            {dummyPost.content}
          </p>

          <p className="text-[8px] text-[#D9D9D9] mb-5">
            {dummyPost.diarydate}
          </p>

          <div className="flex items-center gap-5 pl-1">
            <button
              onClick={handleToggleLike}
              className="flex items-center gap-1 cursor-pointer"
            >
              <FaHeart
                size={20}
                color={isLiked ? "#B28C7E" : "#EFE8E1"}
                className={isLiked ? "opacity-100" : "opacity-70"}
              />
              <span className="text-xs font-semibold text-[#4A4A4A]">
                {likeCount}
              </span>
            </button>

            <div className="flex items-center gap-1 cursor-pointer">
              <IoChatboxEllipsesOutline size={20} color="#B28C7E" />
              <span className="text-xs font-semibold text-[#4A4A4A]">
                {comments.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full mb-20">
          {comments.map((c, idx) => (
            <div key={idx} className="flex gap-3 items-start w-full">
              <img
                src={c.profile || DefaultProfile}
                className="w-7 h-7 rounded-full opacity-60"
              />

              <div className="flex-1 w-full">
                <p className="text-[11px] font-bold text-[#4A4A4A] mb-1">
                  {c.writer}
                </p>
                <p className="text-[11px] leading-4 text-[#4A4A4A] break-words">
                  {c.content}
                </p>
              </div>

              {c.writer === currentUser && (
                <BsThreeDotsVertical size={16} color="#76615A" />
              )}
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[425px] bg-white py-3 px-4 flex items-center gap-2 border-t border-[#eee]">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="내용을 입력하세요"
            className="flex-1 h-10 border rounded-lg border-[#D9D9D9] px-3 text-[12px] outline-none"
          />
          <button onClick={handleAddComment}>
            <Send />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CommunityDetail;
