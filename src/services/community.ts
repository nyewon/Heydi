import instance from "./axios";

// 커뮤니티 게시글 작성용 일기 선택
export const selectDiaryForPost = async (diary_id: number) => {
  const res = await instance.post("/community/selectdiary", {
    diary_id,
  });
  return res.data;
};
