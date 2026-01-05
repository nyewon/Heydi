/*
 * CommunityDetail - 커뮤니티 글 상세보기 화면
 *
 * 세부사항:
 * - 글 작성자 프로필, 작성일, 제목, 감정, 주제, 내용, 작성된 일기 날짜 표시
 * - 좋아요 및 댓글 수 표시 및 좋아요 기능 구현
 * - 댓글 목록 표시 및 댓글 작성 기능 구현
 * - 글 작성자일 경우 글 삭제 기능 제공
 * - 현재 사용자는 "Test"로 가정
 * - 더미 데이터 사용
 */

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  BackHeader,
  ImageSlider,
  Comment,
  DeleteModal,
} from "@components/index";
import { FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import DefaultProfile from "@assets/icons/profile_s.svg";
import { EMOTIONS } from "@constants/emotions";
import { POST_DETAIL_DUMMIES } from "@mocks/community";

const PostDetail = () => {
  const currentUser = "Test";
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const post = POST_DETAIL_DUMMIES.find(p => p.postId === postId);

  if (!post) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [comments] = useState(post.comments);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleToggleLike = () => {
    setIsLiked(prev => !prev);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleDeletePost = () => {
    console.log("delete post:", post.postId);
    setIsDeleteOpen(false);
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container>
        <div className="bg-white border border-[#E0CFC5] w-full rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <img
                src={post.profile || DefaultProfile}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-bold text-[#4A4A4A]">
                {post.user}
              </span>
            </div>
            <span className="text-[10px] text-[#4A4A4A]">{post.date}</span>
          </div>

          <p className="text-sm font-bold text-[#4A4A4A] mb-3">{post.title}</p>

          <p className="text-[12px] text-[#4A4A4A] mb-2">
            감정: {EMOTIONS[post.emotion]} &nbsp;&nbsp; 주제:{" "}
            {post.topics.join(" / ")}
          </p>

          <p className="text-[12px] text-[#4A4A4A] whitespace-pre-line mb-4">
            {post.content}
          </p>

          {post.postImages.length > 0 && (
            <div className="mb-4">
              <ImageSlider
                images={post.postImages}
                currentIndex={currentIndex}
                onChangeIndex={setCurrentIndex}
              />
            </div>
          )}

          <p className="text-[8px] text-[#D9D9D9] mb-5">
            {post.diaryDate}에 작성된 일기입니다.
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

            {post.user === currentUser && (
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="ml-auto cursor-pointer"
              >
                <FaTrashAlt size={18} color="#B28C7E" />
              </button>
            )}
          </div>
        </div>

        <Comment initialComments={post.comments} currentUser={currentUser} />
      </Container>

      <DeleteModal
        isOpen={isDeleteOpen}
        type="post"
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeletePost}
      />
    </div>
  );
};

export default PostDetail;
