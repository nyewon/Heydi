import {
  AlarmResponseRequest,
  MypageInfoResponse,
  MypagePost,
  UserInfoResponse,
} from "@models/mypage";

// User
export const USER_INFO_DUMMY: UserInfoResponse = {
  userId: 1,
  username: "test123",
  nickname: "Test",
  profileImageUrl: "",
  password: "test123!",
};

// Mypage Info
export const MYPAGE_INFO_DUMMY: MypageInfoResponse = {
  userId: 1,
  nickname: "Test",
  profileImageUrl: "",
  likedPostCount: 3,
  sharedPostCount: 4,
  alarm: {
    enabled: true,
  },
};

export const LIKE_POST_DUMMIES: MypagePost[] = [
  {
    userId: 1,
    nickname: "Test",
    profileImageUrl: "",
    postId: 1,
    diaryId: 1,
    title: "일본 여행 1일차",
    preview:
      "오늘은 일본 여행 1일차예요. 아침 일찍 비행기를 타고 인천공항에서 간사이 공항으로 이동했어요.",
    emotion: "행복",
    topics: ["여행"],
    createdAt: "2025-12-10T10:00:00Z",
    likeCount: 32,
    commentCount: 2,
    isLiked: true,
  },
  {
    userId: 2,
    nickname: "TestTest",
    profileImageUrl: "",
    postId: 2,
    diaryId: 2,
    title: "운동 열심히 한 날",
    preview:
      "오랜만에 헬스장에 가서 운동을 했어요. 계속 미루다가 가서 처음에는 힘들었지만 계속 운동을 하다보니 기분이 좋아졌어요. 운동을 마치고 집에 돌아가서 간단한 파스타를 만들었는데 생각보다 맛있게 나와서 기분이 좋았어요. 오늘 하루는 운동도 하고 요리도 해서 뿌듯한 하루였어요.",
    emotion: "기쁨",
    topics: ["운동", "요리"],
    createdAt: "2025-11-20T15:30:00Z",
    likeCount: 5,
    commentCount: 1,
    isLiked: true,
  },
  {
    userId: 2,
    nickname: "TestTest",
    profileImageUrl: "",
    postId: 3,
    diaryId: 3,
    title: "조용한 하루",
    preview: "오늘은 별다른 일 없이 조용하게 보낸 하루였다.",
    emotion: "무난함",
    topics: ["일상"],
    createdAt: "2025-10-05T09:15:00Z",
    likeCount: 0,
    commentCount: 0,
    isLiked: true,
  },
];

export const MY_POST_DUMMIES: MypagePost[] = [
  {
    userId: 1,
    nickname: "Test",
    profileImageUrl: "",
    postId: 101,
    diaryId: 41,
    title: "회의만 세 번 한 날",
    preview:
      "하루 종일 회의가 이어졌다. 결론은 많지 않았지만, 그래도 서로의 생각을 조금은 이해하게 된 것 같아 묘하게 피곤하면서도 허무하지는 않았다.",
    emotion: "피곤함",
    topics: ["업무", "회의"],
    createdAt: "2025-12-18T19:40:00Z",
    likeCount: 14,
    commentCount: 4,
    isLiked: false,
  },
  {
    userId: 1,
    nickname: "Test",
    profileImageUrl: "",
    postId: 1,
    diaryId: 1,
    title: "일본 여행 1일차",
    preview:
      "오늘은 일본 여행 1일차예요. 아침 일찍 비행기를 타고 인천공항에서 간사이 공항으로 이동했어요.",
    emotion: "행복",
    topics: ["여행"],
    createdAt: "2025-12-10T10:00:00Z",
    likeCount: 32,
    commentCount: 2,
    isLiked: true,
  },
  {
    userId: 1,
    nickname: "Test",
    profileImageUrl: "",
    postId: 102,
    diaryId: 42,
    title: "비 오는 저녁, 혼자 걷기",
    preview:
      "퇴근 후 비가 와서 우산을 쓰고 천천히 걸었다. 이어폰 없이 빗소리만 들으니 생각이 정리되는 느낌이었다. 괜히 마음이 차분해졌다.",
    emotion: "차분함",
    topics: ["산책", "퇴근길"],
    createdAt: "2025-12-02T21:10:00Z",
    likeCount: 8,
    commentCount: 0,
    isLiked: false,
  },
  {
    userId: 1,
    nickname: "Test",
    profileImageUrl: "",
    postId: 103,
    diaryId: 43,
    title: "괜히 예민했던 하루",
    preview:
      "사소한 말에도 신경이 곤두서 있었다. 집에 와서 곰곰이 생각해보니 피곤해서 그랬던 것 같다. 내일은 조금 더 여유를 가져야겠다.",
    emotion: "짜증",
    topics: ["감정", "일상"],
    createdAt: "2025-11-11T23:55:00Z",
    likeCount: 3,
    commentCount: 2,
    isLiked: false,
  },
];

// Alarm Setting
export const ALARM_DUMMY: AlarmResponseRequest = {
  enabled: true,
  meridiem: "PM",
  hour: 9,
  minute: 30,
};
