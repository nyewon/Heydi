/*
 * Community - 커뮤니티 메인 화면
 *
 * 세부사항:
 * - CommunityCard 컴포넌트를 사용
 * - 게시글 클릭 시 해당 게시글 상세 페이지로 이동
 * - 더미 데이터로 커뮤니티 게시글 목록 표시
 */

import { useNavigate } from "react-router-dom";
import {
  Container,
  DefaultHeader,
  BottomNav,
  CommunityCard,
} from "@components/index";
import { COMMUNITY_POST_DUMMIES } from "@mocks/community";

const Community = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader showIcon="community" />

      <Container withBottomNav={true}>
        {[...COMMUNITY_POST_DUMMIES]
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
              onClick={() => navigate(`/community/detail/${post.postId}`)}
            />
          ))}
      </Container>

      <BottomNav />
    </div>
  );
};

export default Community;
