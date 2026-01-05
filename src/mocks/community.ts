import { EmotionKey } from "@constants/emotions";

// Community Post List
export interface CommunityCardProps {
  postId: string;
  profileImg?: string;
  user: string;
  date: string;
  title: string;
  emotion: EmotionKey;
  topics: string[];
  content: string;
  likes: number;
  comments: number;
  onClick?: () => void;
}

export const COMMUNITY_POST_DUMMIES: CommunityCardProps[] = [
  {
    postId: "1",
    user: "Test",
    date: "2025.12.7",
    title: "일본 여행 1일차",
    emotion: "happy",
    topics: ["여행"],
    content:
      "오늘은 일본 여행 1일차예요. 아침 일찍 비행기를 타고 인천공항에서 간사이 공항으로 이동했어요. 오랜만에 하는 여행이라서 매우 설렜어요. 공항에 도착해서는 바로 숙소로 이동했어요. 숙소는 깔끔하고 아늑했어요. 짐을 풀고 나서는 근처 맛집을 찾아가서 점심을 먹었어요. 일본 음식은 역시 맛있었어요! 오후에는 유명한 관광지를 돌아다녔어요. 날씨도 좋아서 사진도 많이 찍었답니다. 저녁에는 현지 친구를 만나서 함께 저녁을 먹었어요. 오늘 하루 정말 알차고 즐거웠어요. 내일도 기대돼요!",
    likes: 32,
    comments: 2,
  },
  {
    postId: "2",
    user: "Test2",
    date: "2025.12.5",
    title: "운동 열심히 한 날",
    emotion: "joy",
    topics: ["운동", "요리"],
    content:
      "오랜만에 헬스장에 가서 운동을 했어요. 계속 미루다가 가서 처음에는 힘들었지만 계속 운동을 하다보니 기분이 좋아졌어요. 운동을 마치고 집에 돌아가서 간단한 파스타를 만들었는데 생각보다 맛있게 나와서 기분이 좋았어요. 오늘 하루는 운동도 하고 요리도 해서 뿌듯한 하루였어요.",
    likes: 5,
    comments: 1,
  },
  {
    postId: "3",
    user: "Test1",
    date: "2025.12.1",
    title: "조용한 하루",
    emotion: "neutral",
    topics: ["일상"],
    content: "오늘은 별다른 일 없이 조용하게 보낸 하루였다.",
    likes: 0,
    comments: 0,
  },
];

// Community Post Detail
export interface CommunityComment {
  user: string;
  profile: string;
  content: string;
}

export interface CommunityPostDetail {
  postId: string;
  user: string;
  profile?: string;
  date: string;
  title: string;
  emotion: EmotionKey;
  topics: string[];
  content: string;
  postImages: string[];
  likes: number;
  diaryDate: string;
  comments: CommunityComment[];
}

export const POST_DETAIL_DUMMIES: CommunityPostDetail[] = [
  {
    postId: "1",
    user: "Test",
    profile: "",
    date: "2025.12.7",
    title: "일본 여행 1일차",
    emotion: "happy",
    topics: ["여행"],
    content:
      "오늘은 일본 여행 1일차예요. 아침 일찍 비행기를 타고 인천공항에서 간사이 공항으로 이동했어요. 오랜만에 하는 여행이라서 매우 설렜어요. 공항에 도착한 뒤에는 짐을 찾고 바로 숙소로 이동했어요. 저녁에는 숙소 주변에서 간단하게 라멘을 먹었는데, 진한 국물 향이 피곤함을 싹 날려줬어요. 오랜 이동으로 몸은 조금 피곤했지만, 드디어 여행이 시작됐다는 설렘이 더 컸어요. 이제 내일은 본격적으로 여러 곳을 돌아다닐 생각이라 벌써부터 기대가 돼요.",
    postImages: [
      "https://images.unsplash.com/photo-1549693578-d683be217e58",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    ],
    likes: 32,
    diaryDate: "2025.12.5",
    comments: [
      {
        user: "Test1",
        profile: "",
        content: "와 여행 시작부터 너무 알차네요!",
      },
      {
        user: "Test2",
        profile: "",
        content: "사진 많이 찍었겠다 😊",
      },
    ],
  },
  {
    postId: "2",
    user: "Test2",
    profile: "",
    date: "2025.12.5",
    title: "운동 열심히 한 날",
    emotion: "joy",
    topics: ["운동", "요리"],
    content:
      "오랜만에 헬스장에 가서 운동을 했어요. 계속 미루다가 가서 처음에는 힘들었지만 계속 운동을 하다보니 기분이 좋아졌어요. 운동을 마치고 집에 돌아가서 간단한 파스타를 만들었는데 생각보다 맛있게 나와서 기분이 좋았어요. 오늘 하루는 운동도 하고 요리도 해서 뿌듯한 하루였어요.",
    postImages: ["https://images.unsplash.com/photo-1554284126-aa88f22d8b74"],
    likes: 5,
    diaryDate: "2025.12.4",
    comments: [
      {
        user: "Test",
        profile: "",
        content: "운동하고 요리까지 완벽한 하루네!",
      },
    ],
  },
  {
    postId: "3",
    user: "Test1",
    profile: "",
    date: "2025.12.1",
    title: "조용한 하루",
    emotion: "neutral",
    topics: ["일상"],
    content: "오늘은 별다른 일 없이 조용하게 보낸 하루였다.",
    postImages: [],
    likes: 0,
    diaryDate: "2025.12.1",
    comments: [],
  },
];
