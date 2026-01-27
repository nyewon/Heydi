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
import { COMMUNITY_POST_LIST_DUMMY } from "@mocks/community";

const Community = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader showIcon="community" />

      <Container withBottomNav={true}>
        {[...COMMUNITY_POST_LIST_DUMMY.posts]
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )
          .map(post => (
            <CommunityCard
              key={post.post_id}
              user={post.nickname}
              date={post.created_at.split("T")[0].replace(/-/g, ".")}
              title={post.post_title}
              emotion={post.post_emotion}
              topics={post.post_topics}
              content={post.post_content}
              likes={post.like_count}
              comments={post.comment_count}
              liked={post.is_liked}
              onClick={() => navigate(`/community/detail/${post.post_id}`)}
            />
          ))}
      </Container>

      <BottomNav />
    </div>
  );
};

export default Community;
