/*
 * Community - 커뮤니티 메인 화면
 *
 * 세부사항:
 * - CommunityCard 컴포넌트를 사용
 * - 게시글 클릭 시 해당 게시글 상세 페이지로 이동
 * - api 연동, 연동 실패 시 더미 데이터 사용
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  DefaultHeader,
  BottomNav,
  CommunityCard,
} from "@components/index";
import { COMMUNITY_POST_LIST_DUMMY } from "@mocks/community";
import { PostListItem } from "@models/community";
import { getPostList } from "@services/community";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";

const Community = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (isFetching || !hasNext) return;

      try {
        setIsFetching(true);
        const res = await getPostList(cursor, 10);

        if (res.success && res.result?.result) {
          const data = res.result.result;

          setPosts(prev => [...prev, ...data.posts]);
          setCursor(data.next_cursor);
          setHasNext(data.has_next);
        }
      } catch (e) {
        console.error("커뮤니티 목록 조회 실패", e);

        if (cursor === null) {
          setPosts([...COMMUNITY_POST_LIST_DUMMY.posts]);
          setHasNext(false);
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchPosts();
  }, [cursor]);

  const observerRef = useInfiniteScroll({
    hasMore: hasNext,
    isFetching,
    onLoadMore: () => {
      if (hasNext) {
        setCursor(prev => prev);
      }
    },
  });

  return (
    <div className="w-full flex flex-col items-center">
      <DefaultHeader showIcon="community" />

      <Container withBottomNav={true}>
        {posts.length === 0 && !isFetching && (
          <div className="w-full flex flex-col items-center mt-20 text-center">
            <p className="text-base font-extrabold text-[#7C7C7C]">
              아직 작성된 게시글이 없어요🥲
            </p>

            <p className="text-sm font-bold text-[#A1A1A1] mt-4">
              제일 먼저 일기를 공유해보세요!
            </p>
          </div>
        )}

        {[...posts]
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

        <div ref={observerRef} className="h-10" />
      </Container>

      <BottomNav />
    </div>
  );
};

export default Community;
