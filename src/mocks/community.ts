import {
  CommunityCommentListResponse,
  PostDetailResponse,
  PostListResponse,
} from "@models/community";

// Community Post List
export const COMMUNITY_POST_LIST_DUMMY: PostListResponse = {
  posts: [
    {
      post_id: 1,
      user_id: 2,
      nickname: "Test",
      profile_url: "https://bucket.s3.amazonaws.com/profiles/abc.jpg",
      post_title: "일본 여행 1일차",
      post_topics: ["여행"],
      post_emotion: "행복",
      post_content:
        "오늘은 일본 여행 1일차예요. 아침 일찍 비행기를 타고 인천공항에서 간사이 공항으로 이동했어요. 오랜만에 하는 여행이라서 매우 설렜어요.",
      like_count: 32,
      comment_count: 2,
      is_liked: true,
      created_at: "2025-12-07T10:00:00",
    },
    {
      post_id: 2,
      user_id: 5,
      nickname: "Test2",
      profile_url: "https://bucket.s3.amazonaws.com/profiles/def.jpg",
      post_title: "운동 열심히 한 날",
      post_topics: ["운동", "요리"],
      post_emotion: "기쁨",
      post_content:
        "오랜만에 헬스장에 가서 운동을 했어요. 운동 후에 파스타를 만들어 먹었는데 생각보다 맛있었어요.",
      like_count: 5,
      comment_count: 1,
      is_liked: false,
      created_at: "2025-12-05T09:30:00",
    },
    {
      post_id: 3,
      user_id: 8,
      nickname: "Test1",
      profile_url: "https://bucket.s3.amazonaws.com/profiles/ghi.jpg",
      post_title: "조용한 하루",
      post_topics: ["일상"],
      post_emotion: "무난함",
      post_content: "오늘은 별다른 일 없이 조용하게 보낸 하루였다.",
      like_count: 0,
      comment_count: 0,
      is_liked: false,
      created_at: "2025-12-01T08:45:00",
    },
  ],
};

// Post Detail
export const POST_DETAIL_DUMMIES: PostDetailResponse[] = [
  {
    post_id: 1,
    author: {
      user_id: 1,
      nickname: "Test",
      profile_url: "",
    },
    diary_id: 101,
    diary_date: "2025-12-05",
    post_title: "일본 여행 1일차",
    post_topics: ["여행"],
    post_emotion: "행복",
    post_content:
      "오늘은 일본 여행 1일차예요. 아침 일찍 비행기를 타고 인천공항에서 간사이 공항으로 이동했어요. 오랜만에 하는 여행이라서 매우 설렜어요. 공항에 도착한 뒤에는 짐을 찾고 바로 숙소로 이동했어요. 저녁에는 숙소 주변에서 간단하게 라멘을 먹었는데, 진한 국물 향이 피곤함을 싹 날려줬어요. 오랜 이동으로 몸은 조금 피곤했지만, 드디어 여행이 시작됐다는 설렘이 더 컸어요. 이제 내일은 본격적으로 여러 곳을 돌아다닐 생각이라 벌써부터 기대가 돼요.",
    photos: [
      {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1549693578-d683be217e58",
        order: 1,
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
        order: 2,
      },
    ],
    like_count: 32,
    comment_count: 2,
    is_liked: true,
    created_at: "2025-12-07T10:00:00",
  },
  {
    post_id: 2,
    author: {
      user_id: 2,
      nickname: "Test2",
      profile_url: "",
    },
    diary_id: 102,
    diary_date: "2025-12-04",
    post_title: "운동 열심히 한 날",
    post_topics: ["운동", "요리"],
    post_emotion: "기쁨",
    post_content:
      "오랜만에 헬스장에 가서 운동을 했어요. 계속 미루다가 가서 처음에는 힘들었지만 계속 운동을 하다보니 기분이 좋아졌어요. 운동을 마치고 집에 돌아가서 간단한 파스타를 만들었는데 생각보다 맛있게 나와서 기분이 좋았어요. 오늘 하루는 운동도 하고 요리도 해서 뿌듯한 하루였어요.",
    photos: [
      {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
        order: 1,
      },
    ],
    like_count: 5,
    comment_count: 1,
    is_liked: false,
    created_at: "2025-12-05T09:30:00",
  },
  {
    post_id: 3,
    author: {
      user_id: 3,
      nickname: "Test1",
      profile_url: "",
    },
    diary_id: 103,
    diary_date: "2025-12-01",
    post_title: "조용한 하루",
    post_topics: ["일상"],
    post_emotion: "무난함",
    post_content: "오늘은 별다른 일 없이 조용하게 보낸 하루였다.",
    photos: [],
    like_count: 0,
    comment_count: 0,
    is_liked: false,
    created_at: "2025-12-01T08:00:00",
  },
];

export const COMMUNITY_COMMENT_DUMMIES: CommunityCommentListResponse = {
  comments: [
    {
      comment_id: 1,
      user_id: 2,
      nickname: "Test1",
      profile_url: "",
      content: "와 여행 시작부터 너무 알차네요!",
      is_mine: false,
      created_at: "2025-12-07T11:30:00",
    },
    {
      comment_id: 2,
      user_id: 3,
      nickname: "Test2",
      profile_url: "",
      content: "사진 많이 찍었겠다 😊",
      is_mine: false,
      created_at: "2025-12-07T11:10:00",
    },
    {
      comment_id: 2,
      user_id: 1,
      nickname: "Test",
      profile_url: "",
      content: "감사합니다",
      is_mine: true,
      created_at: "2025-12-07T11:10:00",
    },
  ],
  next_cursor: null,
  has_next: false,
};
