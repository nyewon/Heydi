/*
 * LikePosts - 좋아요한 게시글 목록 화면
 *
 * 세부사항:
 * - CommunityCard 컴포넌트를 사용
 * - 게시글 클릭 시 해당 게시글 상세 페이지로 이동
 * - React Query 기반 무한 스크롤
 * - 좋아요 토글 시 목록 자동 갱신
 */

import { useNavigate } from "react-router-dom";
import { Container, BackHeader, CommunityCard } from "@components/index";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
import { useLiked } from "@queries/community/useLiked";
import { useLikedPosts } from "@queries/community/useLikedPosts";

const LikePosts = () => {
  const navigate = useNavigate();

  const { toggleLike } = useLiked();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLikedPosts();

  const posts = data?.pages.flatMap(page => page.posts) ?? [];

  const handleToggleLike = async (postId: number) => {
    try {
      await toggleLike(postId);
    } catch (e) {
      console.error("좋아요 토글 실패", e);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  const observerRef = useInfiniteScroll({
    hasMore: !!hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container>
        {posts.length === 0 && !isFetchingNextPage && (
          <div className="w-full flex flex-col items-center mt-20 text-center">
            <p className="text-base font-extrabold text-[#7C7C7C]">
              아직 좋아요한 글이 없어요🥲
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
              profileImg={post.profileImageUrl}
              date={post.createdAt}
              title={post.title}
              emotion={post.emotion}
              topics={post.topics}
              content={post.preview}
              likes={post.likeCount}
              comments={post.commentCount}
              liked={post.isLiked}
              onLike={() => handleToggleLike(post.postId)}
              onClick={() => navigate(`/community/detail/${post.postId}`)}
            />
          ))}

        <div ref={observerRef} className="h-10" />
      </Container>
    </div>
  );
};

export default LikePosts;
