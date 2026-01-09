/*
 * SharedPost - 공유한 게시글 목록 화면
 *
 * 세부사항:
 * - CommunityCard 컴포넌트를 사용
 * - 게시글 클릭 시 해당 게시글 상세 페이지로 이동
 * - 더미 데이터로 공유한 게시글 목록 표시
 */

import { useNavigate } from "react-router-dom";
import { Container, BackHeader, CommunityCard } from "@components/index";
import { COMMUNITY_POST_DUMMIES, USER_DUMMY } from "@mocks/mypage";

const SharedPost = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container>
        {[...COMMUNITY_POST_DUMMIES]
          .filter(post => post.user === USER_DUMMY.nickname)
          .sort(
            (a, b) =>
              new Date(b.date.replace(/\./g, "-")).getTime() -
              new Date(a.date.replace(/\./g, "-")).getTime(),
          )
          .map(post => (
            <CommunityCard
              key={post.postId}
              user={post.user}
              date={post.date}
              title={post.title}
              emotion={post.emotion}
              topics={post.topics}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              liked={post.liked}
              onClick={() => navigate(`/community/detail/${post.postId}`)}
            />
          ))}
      </Container>
    </div>
  );
};

export default SharedPost;
