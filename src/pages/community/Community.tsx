/*
 * Community - 커뮤니티 메인 화면
 *
 * 세부사항:
 * - CommunityCard 컴포넌트를 사용
 * - 게시글 클릭 시 해당 게시글 상세 페이지로 이동
 * - api 연동, 연동 실패 시 더미 데이터 사용
 * - 좋아요 api 연동, 연동 실패 시 alert로 오류 메시지 표시
 */

import { useNavigate } from "react-router-dom";
import {
  Container,
  DefaultHeader,
  BottomNav,
  CommunityCard,
} from "@components/index";
import { COMMUNITY_POST_LIST_DUMMY } from "@mocks/community";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
import { usePostList } from "@queries/community/usePostList";
import { useLiked } from "@queries/community/useLiked";

const Community = () => {
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    usePostList();

  const posts =
    data?.pages.flatMap(page => page?.result?.feed?.posts ?? []) ?? [];

  const displayPosts =
    posts.length === 0 && isError ? COMMUNITY_POST_LIST_DUMMY.posts : posts;

  const { toggleLike } = useLiked();

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
      <DefaultHeader showIcon="community" />

      <Container withBottomNav={true}>
        {displayPosts.length === 0 && !isFetchingNextPage && (
          <div className="w-full flex flex-col items-center mt-20 text-center">
            <p className="text-base font-extrabold text-[#7C7C7C]">
              아직 작성된 게시글이 없어요🥲
            </p>

            <p className="text-sm font-bold text-[#A1A1A1] mt-4">
              제일 먼저 일기를 공유해보세요!
            </p>
          </div>
        )}

        {[...displayPosts]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map(post => (
            <CommunityCard
              key={post.postId}
              user={post.nickname}
              profileImg={post.profileUrl}
              date={post.createdAt.split("T")[0].replace(/-/g, ".")}
              title={post.postTitle}
              emotion={post.postEmotion}
              topics={post.postTopics}
              content={post.postContent}
              likes={post.likeCount}
              comments={post.commentCount}
              liked={post.liked}
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
