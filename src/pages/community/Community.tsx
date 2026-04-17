/*
 * Community - 커뮤니티 메인 화면
 *
 * 세부사항:
 * - CommunityCard 컴포넌트를 사용
 * - 게시글 클릭 시 해당 게시글 상세 페이지로 이동
 * - api 연동, 연동 실패 시 더미 데이터 사용
 * - 좋아요 api 연동, 연동 실패 시 alert로 오류 메시지 표시
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
import { getPostList, togglePostLike } from "@services/community";
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

  const handleToggleLike = async (postId: number) => {
    try {
      await togglePostLike(postId);

      setPosts(prev =>
        prev.map(post =>
          post.postId === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likeCount: post.isLiked
                  ? post.likeCount - 1
                  : post.likeCount + 1,
              }
            : post,
        ),
      );
    } catch (e) {
      console.error("좋아요 토글 실패", e);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

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
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map(post => (
            <CommunityCard
              key={post.postId}
              user={post.nickname}
              date={post.createdAt.split("T")[0].replace(/-/g, ".")}
              title={post.postTitle}
              emotion={post.postEmotion}
              topics={post.postTopics}
              content={post.postContent}
              likes={post.likeCount}
              comments={post.commentCount}
              liked={post.isLiked}
              onLike={() => handleToggleLike(post.postId)}
              onClick={() => navigate(`/community/detail/${post.postId}`)}
            />
          ))}

        <div ref={observerRef} className="h-10" />
      </Container>

      <BottomNav />
    </div>
  );
};

export default Community;
