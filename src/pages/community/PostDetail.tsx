/*
 * postDetail - 커뮤니티 글 상세보기 화면
 *
 * 세부사항:
 * - 글 작성자 프로필, 작성일, 제목, 감정, 주제, 내용, 작성된 일기 날짜 표시
 * - 좋아요 및 댓글 수 표시 및 좋아요 기능 구현
 * - 댓글 목록 표시 및 댓글 작성 기능 구현
 * - 글 작성자일 경우 글 삭제 기능 제공
 * - 현재 사용자는 "Test"로 가정
 * - 상세보기 api 연동, 연동 실패 시 더미 데이터 사용
 * - 좋아요 api 연동, 연동 실패 시 alert로 오류 메시지 표시
 * - 댓글 목록 api 연동, 연동 실패 시 더미 데이터 사용 (무한 스크롤 미적용)
 */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  BackHeader,
  ImageSlider,
  Comment,
  DeleteModal,
} from "@components/index";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import DefaultProfile from "@assets/icons/profile_s.svg";
import { EMOTION_S_ICONS } from "@constants/emotions";
import {
  POST_DETAIL_DUMMIES,
  COMMUNITY_COMMENT_DUMMIES,
} from "@mocks/community";
import {
  getPostComments,
  getPostDetail,
  togglePostLike,
} from "@services/community";
import { CommunityComment, PostDetailResponse } from "@models/community";

const PostDetail = () => {
  const currentUser = "Test";
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostDetailResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<CommunityComment[]>([]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getPostDetail(Number(postId));
        setPost(data);
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
      } catch (e) {
        console.error("게시물 상세 조회 실패", e);

        const dummy =
          POST_DETAIL_DUMMIES.find(p => p.postId === Number(postId)) ||
          POST_DETAIL_DUMMIES[0];

        setPost(dummy);
        setIsLiked(dummy.isLiked);
        setLikeCount(dummy.likeCount);
      }
    };

    const fetchComments = async () => {
      try {
        const data = await getPostComments(Number(postId), null, 10);
        setComments(data.comments);
      } catch (e) {
        console.error("댓글 조회 실패", e);
        setComments(COMMUNITY_COMMENT_DUMMIES.comments);
      }
    };

    fetchDetail();
    fetchComments();
  }, [postId]);

  if (!post) return null;

  const handleToggleLike = async () => {
    try {
      const res = await togglePostLike(post.postId);

      if (res.success) {
        setIsLiked(prev => !prev);
        setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
      } else {
        alert("좋아요 처리에 실패했습니다.");
      }
    } catch (e) {
      console.error("좋아요 API 실패", e);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
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
                src={post.author.profileUrl || DefaultProfile}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-extrabold text-[#4A4A4A]">
                {post.author.nickname}
              </span>
            </div>
            <span className="text-[10px] text-[#4A4A4A]">
              {post.createdAt.split("T")[0].replace(/-/g, ".")}
            </span>
          </div>

          <p className="text-sm font-bold text-[#4A4A4A] mb-3">
            {post.postTitle}
          </p>

          <p className="text-xs font-bold text-[#4A4A4A] mb-2 flex items-center gap-3">
            <span className="flex items-center">
              감정:
              <span className="flex items-center gap-0.5 ml-1">
                {EMOTION_S_ICONS[post.postEmotion]}
                {post.postEmotion}
              </span>
            </span>

            <span>주제: {post.postTopics.join(" / ")}</span>
          </p>

          <p className="text-xs text-[#4A4A4A] whitespace-pre-line mb-4">
            {post.postContent}
          </p>

          {post.photos.length > 0 && (
            <div className="mb-4">
              <ImageSlider
                images={post.photos}
                currentIndex={currentIndex}
                onChangeIndex={setCurrentIndex}
              />
            </div>
          )}

          <p className="text-[10px] text-[#D9D9D9] mb-5">
            {post.diaryDate.replace(/-/g, ".")}에 작성된 일기입니다.
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
              <span className="text-xs font-bold text-[#4A4A4A]">
                {likeCount}
              </span>
            </button>

            <div className="flex items-center gap-1 cursor-pointer">
              <IoChatboxEllipsesOutline size={20} color="#B28C7E" />
              <span className="text-xs font-bold text-[#4A4A4A]">
                {comments.length}
              </span>
            </div>

            {post.author.nickname === currentUser && (
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="ml-auto cursor-pointer"
              >
                <FaTrashAlt size={18} color="#B28C7E" />
              </button>
            )}
          </div>
        </div>

        <Comment
          postId={post.postId}
          initialComments={comments}
          currentUser={currentUser}
        />
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
