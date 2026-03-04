import { PostDetailResponse } from "@models/community";
import instance from "./axios";

// 커뮤니티 게시글 작성용 일기 선택
export const selectDiaryForPost = async (diary_id: number) => {
  const res = await instance.post("/community/selectdiary", {
    diary_id,
  });
  return res.data;
};

// 커뮤니티 게시글 리스트 조회
export const getPostList = async (
  cursor?: number | null,
  size: number = 10,
) => {
  const res = await instance.get("/community/posts", {
    params: {
      cursor,
      size,
    },
  });

  return res.data;
};

// 게시물 상세 조회
export const getPostDetail = async (postId: number) => {
  const res = await instance.get(`/community/posts/${postId}`);

  return res.data.result as PostDetailResponse;
};
