import {
  CommunityCommentListResponse,
  PostDetailResponse,
  PostListResponse,
} from "@models/community";

// Community Post List
export const COMMUNITY_POST_LIST_DUMMY: PostListResponse = {
  posts: [
    {
      postId: 1,
      userId: 2,
      nickname: "Test",
      profileUrl: "https://bucket.s3.amazonaws.com/profiles/abc.jpg",
      postTitle: "일본 여행 1일차",
      postTopics: ["여행"],
      postEmotion: "행복",
      postContent:
        "오늘은 일본 여행 1일차예요. 아침 일찍 비행기를 타고 인천공항에서 간사이 공항으로 이동했어요. 오랜만에 하는 여행이라서 매우 설렜어요.",
      likeCount: 32,
      commentCount: 2,
      isLiked: true,
      createdAt: "2025-12-07T10:00:00",
    },
    {
      postId: 2,
      userId: 5,
      nickname: "Test2",
      profileUrl: "https://bucket.s3.amazonaws.com/profiles/def.jpg",
      postTitle: "운동 열심히 한 날",
      postTopics: ["운동", "요리"],
      postEmotion: "기쁨",
      postContent:
        "오랜만에 헬스장에 가서 운동을 했어요. 운동 후에 파스타를 만들어 먹었는데 생각보다 맛있었어요.",
      likeCount: 5,
      commentCount: 1,
      isLiked: false,
      createdAt: "2025-12-05T09:30:00",
    },
    {
      postId: 3,
      userId: 8,
      nickname: "Test1",
      profileUrl: "https://bucket.s3.amazonaws.com/profiles/ghi.jpg",
      postTitle: "조용한 하루",
      postTopics: ["일상"],
      postEmotion: "무난함",
      postContent: "오늘은 별다른 일 없이 조용하게 보낸 하루였다.",
      likeCount: 0,
      commentCount: 0,
      isLiked: false,
      createdAt: "2025-12-01T08:45:00",
    },
  ],
  nextCursor: null,
  hasNext: false,
};

// Post Detail
export const POST_DETAIL_DUMMIES: PostDetailResponse[] = [
  {
    postId: 1,
    author: {
      userId: 1,
      nickname: "Test",
      profileUrl: "",
    },
    diaryId: 101,
    diaryDate: "2025-12-05",
    postTitle: "일본 여행 1일차",
    postTopics: ["여행"],
    postEmotion: "행복",
    postContent:
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
    likeCount: 32,
    commentCount: 2,
    isLiked: true,
    createdAt: "2025-12-07T10:00:00",
  },
  {
    postId: 2,
    author: {
      userId: 2,
      nickname: "Test2",
      profileUrl: "",
    },
    diaryId: 102,
    diaryDate: "2025-12-04",
    postTitle: "운동 열심히 한 날",
    postTopics: ["운동", "요리"],
    postEmotion: "기쁨",
    postContent:
      "오랜만에 헬스장에 가서 운동을 했어요. 계속 미루다가 가서 처음에는 힘들었지만 계속 운동을 하다보니 기분이 좋아졌어요. 운동을 마치고 집에 돌아가서 간단한 파스타를 만들었는데 생각보다 맛있게 나와서 기분이 좋았어요. 오늘 하루는 운동도 하고 요리도 해서 뿌듯한 하루였어요.",
    photos: [
      {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
        order: 1,
      },
    ],
    likeCount: 5,
    commentCount: 1,
    isLiked: false,
    createdAt: "2025-12-05T09:30:00",
  },
  {
    postId: 3,
    author: {
      userId: 3,
      nickname: "Test1",
      profileUrl: "",
    },
    diaryId: 103,
    diaryDate: "2025-12-01",
    postTitle: "조용한 하루",
    postTopics: ["일상"],
    postEmotion: "무난함",
    postContent: "오늘은 별다른 일 없이 조용하게 보낸 하루였다.",
    photos: [],
    likeCount: 0,
    commentCount: 0,
    isLiked: false,
    createdAt: "2025-12-01T08:00:00",
  },
];

export const COMMUNITY_COMMENT_DUMMIES: CommunityCommentListResponse = {
  comments: [
    {
      commentId: 1,
      userId: 2,
      nickname: "Test1",
      profileUrl: "",
      content: "와 여행 시작부터 너무 알차네요!",
      isMine: false,
      createdAt: "2025-12-07T11:30:00",
    },
    {
      commentId: 2,
      userId: 3,
      nickname: "Test2",
      profileUrl: "",
      content: "사진 많이 찍었겠다 😊",
      isMine: false,
      createdAt: "2025-12-07T11:10:00",
    },
    {
      commentId: 3,
      userId: 1,
      nickname: "Test",
      profileUrl: "",
      content: "감사합니다",
      isMine: true,
      createdAt: "2025-12-07T11:10:00",
    },
  ],
  nextCursor: null,
  hasNext: false,
};
