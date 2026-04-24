import {
  CommunityPostUpsertRequest,
  PostDetailResponse,
} from "@models/community";
import instance from "./axios";

// 커뮤니티 포스트 생성
export const updatePost = async (
  postId: number,
  data: CommunityPostUpsertRequest,
) => {
  const res = await instance.put(`/community/posts/${postId}`, data);
  return res.data;
};

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

// 게시글 좋아요 토글
export const togglePostLike = async (postId: number) => {
  const res = await instance.post(`/community/posts/${postId}/likes`);

  return res.data;
};

// 댓글 목록 조회
export const getPostComments = async (
  postId: number,
  cursor?: number | null,
  size: number = 10,
) => {
  const res = await instance.get(`/community/posts/${postId}/comments`, {
    params: {
      cursor,
      size,
    },
  });

  return res.data.result;
};

// 댓글 작성
export const createPostComment = async (postId: number, content: string) => {
  const res = await instance.post(`/community/posts/${postId}/comments`, {
    content,
  });

  return res.data.result;
};

// 댓글 수정
export const updatePostComment = async (
  postId: number,
  commentId: number,
  content: string,
) => {
  const res = await instance.patch(
    `/community/post/${postId}/comments/${commentId}`,
    {
      content,
    },
  );

  return res.data.result;
};

// 댓글 삭제
export const deletePostComment = async (postId: number, commentId: number) => {
  const res = await instance.delete(
    `/community/post/${postId}/comments/${commentId}`,
  );

  return res.data;
};

// 게시글 사진 업로드
export const uploadPostPhoto = async (postId: number, photo: File) => {
  const formData = new FormData();
  formData.append("photo", photo);

  const res = await instance.post(
    `/community/posts/${postId}/photos`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data.result;
};

// 게시글 사진 삭제
export const deletePostPhoto = async (postId: number, fileId: number) => {
  const res = await instance.delete(
    `/community/posts/${postId}/photos/${fileId}`,
  );

  return res.data;
};
