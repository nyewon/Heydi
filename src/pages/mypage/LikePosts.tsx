/*
 * LikePosts - 좋아요한 게시글 목록 화면
 *
 * 세부사항:
 * - CommunityCard 컴포넌트를 사용
 * - 게시글 클릭 시 해당 게시글 상세 페이지로 이동
 * - 더미 데이터로 좋아요한 게시글 목록 표시
 */

import { useNavigate } from "react-router-dom";
import { Container, BackHeader, CommunityCard } from "@components/index";
import { LIKE_POST_DUMMIES } from "@mocks/mypage";

const LikePosts = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container>
        {[...LIKE_POST_DUMMIES]
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
