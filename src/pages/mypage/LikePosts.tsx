/*
 * LikePosts - 좋아요한 게시글 목록 화면
 *
 * 세부사항:
 * - CommunityCard 컴포넌트를 사용
 * - 게시글 클릭 시 해당 게시글 상세 페이지로 이동
 * - api 임시 연동 완료, 연동 실패 시 더미데이터 표시
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, BackHeader, CommunityCard } from "@components/index";
import { LIKE_POST_DUMMIES } from "@mocks/mypage";
import { MypagePost } from "@models/mypage";
import { getLikedPosts } from "@services/auth";

const LikePosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<MypagePost[]>([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const res = await getLikedPosts(0, 10);

        if (res.isSuccess) {
          setPosts(res.result.posts);
        } else {
          setPosts(LIKE_POST_DUMMIES);
        }
      } catch (e) {
        console.error("좋아요 게시글 조회 실패", e);
        setPosts(LIKE_POST_DUMMIES);
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container>
        {[...posts]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map(post => (
            <CommunityCard
              key={post.postId}
              user={post.nickname}
              profileImg={post.profileImageUrl}
              date={post.createdAt}
              title={post.title}
              emotion={post.emotion}
              topics={post.topics}
              content={post.preview}
              likes={post.likeCount}
              comments={post.commentCount}
              liked={post.isLiked}
              onClick={() => navigate(`/community/detail/${post.postId}`)}
            />
          ))}
      </Container>
    </div>
  );
};

export default LikePosts;
