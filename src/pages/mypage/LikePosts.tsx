/*
 * LikePosts - 좋아요한 게시글 목록 화면
 *
 * 세부사항:
 * - CommunityCard 컴포넌트를 사용
 * - 게시글 클릭 시 해당 게시글 상세 페이지로 이동
 * - api 연동 완료, 연동 실패 시 더미데이터 표시
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, BackHeader, CommunityCard } from "@components/index";
import { LIKE_POST_DUMMIES } from "@mocks/mypage";
import { MypagePost } from "@models/mypage";
import { getLikedPosts } from "@services/auth";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";

const LikePosts = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<MypagePost[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      if (isFetching) return;

      try {
        setIsFetching(true);

        const res = await getLikedPosts(page, 10);

        if (res.success) {
          const newPosts = Array.isArray(res.result)
            ? res.result
            : (res.result?.posts ?? []);

          setPosts(prev => [...prev, ...newPosts]);

          const total = res.result?.totalCount ?? newPosts.length;
          setTotalCount(total);
        } else {
          if (page === 0) {
            setPosts(LIKE_POST_DUMMIES);
            setTotalCount(LIKE_POST_DUMMIES.length);
          }
        }
      } catch (e) {
        console.error("좋아요 게시글 조회 실패", e);

        if (page === 0) {
          setPosts(LIKE_POST_DUMMIES);
          setTotalCount(LIKE_POST_DUMMIES.length);
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchLikedPosts();
  }, [page]);

  const hasMore = totalCount === null || posts.length < totalCount;

  const observerRef = useInfiniteScroll({
    hasMore,
    isFetching,
    onLoadMore: () => setPage(prev => prev + 1),
  });

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container>
        {posts.length === 0 && !isFetching && (
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
              onClick={() => navigate(`/community/detail/${post.postId}`)}
            />
          ))}

        <div ref={observerRef} className="h-10" />
      </Container>
    </div>
  );
};

export default LikePosts;
