import { EmotionKey } from "@constants/emotions";
import {
  ConversationMessagesResponse,
  DiaryDetailResponse,
  DiaryListItem,
} from "@models/diary";

// Diary List
export interface DiaryListDummy {
  diaryId: string;
  title: string;
  emotion: EmotionKey;
  topics: string[];
}

export const DIARY_LIST_DUMMIES: DiaryListItem[] = [
  {
    diaryId: 0,
    date: "2025.11.20",
    title: "11월 20일의 일기",
    emotion: "짜증",
    topics: ["친구"],
  },
  {
    diaryId: 1,
    date: "2025.12.03",
    title: "12월 3일의 일기",
    emotion: "무난함",
    topics: ["일상"],
  },
  {
    diaryId: 2,
    date: "2025.12.05",
    title: "12월 5일의 일기",
    emotion: "슬픔",
    topics: ["감정", "휴식"],
  },
  {
    diaryId: 3,
    date: "2025.12.06",
    title: "12월 6일의 일기",
    emotion: "무난함",
    topics: ["일상"],
  },
  {
    diaryId: 4,
    date: "2025.12.07",
    title: "12월 7일의 일기",
    emotion: "슬픔",
    topics: ["감정"],
  },
  {
    diaryId: 5,
    date: "2025.12.20",
    title: "12월 20일의 일기",
    emotion: "행복",
    topics: ["취미"],
  },
  {
    diaryId: 6,
    date: "2025.12.21",
    title: "12월 21일의 일기",
    emotion: "무난함",
    topics: ["휴식"],
  },
  {
    diaryId: 7,
    date: "2025.12.22",
    title: "12월 22일의 일기",
    emotion: "행복",
    topics: ["여행", "맛집"],
  },
  {
    diaryId: 8,
    date: "2025.12.25",
    title: "12월 25일의 일기",
    emotion: "행복",
    topics: ["가족", "기념일"],
  },
];

export const DIARY_DETAIL_DUMMIES: DiaryDetailResponse[] = [
  {
    id: 0,
    title: "11월 20일의 일기",
    createdDate: "2025-11-20T00:00:00",
    emotionCategory: "짜증",
    topic: ["친구"],
    oneLineDiary: "친구와의 일로 괜히 예민해졌던 하루였어요.",
    content:
      "오늘은 친구와 나눈 대화 때문에 하루 종일 마음이 불편했어요. 큰 말다툼은 아니었지만, 사소한 말 한마디가 계속 신경 쓰였어요. 이해하려고 해도 감정이 쉽게 가라앉지 않았고, 혼자서 계속 곱씹게 됐어요. 시간이 지나면 괜찮아질 거라고 스스로를 달래봤지만, 하루가 끝날 때까지 찜찜한 기분이 남아 있었어요.",
    conversationDurationSec: 521,
    photos: [],
    report: { included: false, month: "2025-11" },
  },
  {
    id: 1,
    title: "12월 3일의 일기",
    createdDate: "2025-12-03T00:00:00",
    emotionCategory: "무난함",
    topic: ["일상"],
    oneLineDiary: "조용하지만 생각이 많았던 하루였어요.",
    content:
      "오늘은 특별한 일정은 없었지만 하루 종일 머릿속이 복잡했어요. 해야 할 일들을 정리하면서도 마음이 쉽게 가라앉지 않았어요. 점심 이후에는 잠시 산책을 하며 생각을 정리했고, 저녁에는 따뜻한 차를 마시며 하루를 마무리했어요. 크지 않은 하루였지만 나를 돌아보는 시간이 된 것 같아 의미가 있었어요.",
    conversationDurationSec: 388,
    photos: [],
    report: { included: false, month: "2025-12" },
  },
  {
    id: 2,
    title: "12월 5일의 일기",
    createdDate: "2025-12-05T00:00:00",
    emotionCategory: "슬픔",
    topic: ["감정", "휴식"],
    oneLineDiary: "조금은 지쳤던 하루였어요.",
    content:
      "생각이 많아지고 몸도 마음도 조금 지친 하루였어요. 그래서 오늘은 일찍 잠자리에 들기로 했어요.",
    conversationDurationSec: 585,
    photos: [],
    report: { included: false, month: "2025-12" },
  },
  {
    id: 3,
    title: "12월 6일의 일기",
    createdDate: "2025-12-06T00:00:00",
    emotionCategory: "무난함",
    topic: ["일상"],
    oneLineDiary: "평범하지만 차분하게 흘러간 하루였어요.",
    content:
      "특별한 일은 없었지만 해야 할 일들을 하나씩 정리한 하루였어요. 커피를 마시며 잠시 여유를 느낄 수 있었어요.",
    conversationDurationSec: 310,
    photos: [],
    report: { included: false, month: "2025-12" },
  },
  {
    id: 4,
    title: "12월 7일의 일기",
    createdDate: "2025-12-07T00:00:00",
    emotionCategory: "슬픔",
    topic: ["감정"],
    oneLineDiary: "감정이 쉽게 가라앉지 않았던 하루였어요.",
    content:
      "하루 종일 기분이 무거웠어요. 별다른 사건은 없었지만 사소한 말이나 생각에도 마음이 흔들렸어요. 밤이 되어서도 쉽게 잠들지 못했고, 감정을 어떻게 정리해야 할지에 대한 고민이 많았어요.",
    conversationDurationSec: 541,
    photos: [],
    report: { included: false, month: "2025-12" },
  },
  {
    id: 5,
    title: "12월 20일의 일기",
    createdDate: "2025-12-20T00:00:00",
    emotionCategory: "행복",
    topic: ["취미"],
    oneLineDiary: "오랜만에 온전히 나에게 집중한 하루였어요.",
    content:
      "오늘은 특별한 일정은 없었지만 하루 종일 머릿속이 복잡했어요. 해야 할 일들을 정리하면서도 마음이 쉽게 가라앉지 않았어요. 점심 이후에는 잠시 산책을 하며 생각을 정리했고, 저녁에는 따뜻한 차를 마시며 하루를 마무리했어요. 크지 않은 하루였지만 나를 돌아보는 시간이 된 것 같아 의미가 있었어요.",
    conversationDurationSec: 483,
    photos: [],
    report: { included: true, month: "2025-12" },
  },
  {
    id: 6,
    title: "12월 21일의 일기",
    createdDate: "2025-12-21T00:00:00",
    emotionCategory: "무난함",
    topic: ["휴식"],
    oneLineDiary: "아무것도 하지 않기로 한 하루였어요.",
    content:
      "오늘은 의도적으로 아무 일정도 잡지 않았어요. 늦잠을 자고 밀린 영상들을 보며 시간을 보냈어요. 생산적인 하루는 아니었지만, 그만큼 몸과 마음이 느슨해졌어요. 이런 날도 필요하다는 걸 다시 느꼈어요.",
    conversationDurationSec: 322,
    photos: [],
    report: { included: false, month: "2025-12" },
  },
  {
    id: 7,
    title: "12월 22일의 일기",
    createdDate: "2025-12-22T00:00:00",
    emotionCategory: "행복",
    topic: ["여행", "맛집"],
    oneLineDiary: "일본 여행을 시작한 첫 날이었어요.",
    content:
      "오늘은 일본 여행 1일차였어요. 아침 일찍 비행기를 타고 인천공항에서 간사이 공항으로 이동했어요. 오랜만에 하는 여행이라서 매우 설렜어요. 공항에 도착한 뒤에는 짐을 찾고 바로 숙소로 이동했어요. 저녁에는 숙소 주변에서 간단하게 라멘을 먹었는데, 진한 국물 향이 피곤함을 싹 날려줬어요. 오랜 이동으로 몸은 조금 피곤했지만, 드디어 여행이 시작됐다는 설렘이 더 컸어요. 이제 내일부터는 본격적으로 여러 곳을 돌아다닐 예정이라 벌써부터 기대돼요.",
    conversationDurationSec: 452,
    photos: [],
    report: { included: false, month: "2025-12" },
  },
  {
    id: 8,
    title: "12월 25일의 일기",
    createdDate: "2025-12-25T00:00:00",
    emotionCategory: "행복",
    topic: ["가족", "기념일"],
    oneLineDiary: "가족과 함께해 마음이 따뜻해진 하루였어요.",
    content:
      "크리스마스를 맞아 가족과 함께 시간을 보냈어요. 오랜만에 모두 모여 식사를 하며 이야기를 나눴고, 소소한 농담에도 웃음이 끊이지 않았어요. 바쁘다는 이유로 미뤄왔던 시간들이 얼마나 소중한지 다시 느끼게 된 하루였어요.",
    conversationDurationSec: 602,
    photos: [
      {
        id: 1,
        imageUrl: "https://picsum.photos/400/300?random=1",
        order: 1,
      },
      {
        id: 2,
        imageUrl: "https://picsum.photos/400/300?random=2",
        order: 2,
      },
    ],
    report: { included: true, month: "2025-12" },
  },
];

export const CONVERSATION_MESSAGES_DUMMIES: ConversationMessagesResponse[] = [
  {
    messages: [
      {
        role: "ASSISTANT",
        text: "오늘 하루 중에 가장 신경 쓰였던 일이 있었어?",
        createdAt: "2025-11-20T21:00:00",
      },
      {
        role: "USER",
        text: "응, 친구랑 대화한 게 계속 마음에 걸렸어.",
        createdAt: "2025-11-20T21:00:10",
      },
      {
        role: "ASSISTANT",
        text: "어떤 말이나 상황이 그렇게 느껴지게 했을까?",
        createdAt: "2025-11-20T21:00:20",
      },
      {
        role: "USER",
        text: "별 뜻 없이 한 말일 수도 있는데, 나를 무시하는 것처럼 들렸어.",
        createdAt: "2025-11-20T21:00:30",
      },
      {
        role: "ASSISTANT",
        text: "그 말을 듣고 어떤 감정이 들었어?",
        createdAt: "2025-11-20T21:00:40",
      },
      {
        role: "USER",
        text: "짜증도 났고, 괜히 서운했어.",
        createdAt: "2025-11-20T21:00:50",
      },
      {
        role: "ASSISTANT",
        text: "그 감정을 지금은 어떻게 바라보고 있어?",
        createdAt: "2025-11-20T21:01:00",
      },
      {
        role: "USER",
        text: "조금은 과하게 받아들인 것 같기도 한데, 아직 완전히 풀리진 않았어.",
        createdAt: "2025-11-20T21:01:10",
      },
    ],
  },
  {
    messages: [
      {
        role: "ASSISTANT",
        text: "오늘 하루를 한마디로 표현하면 어때?",
        createdAt: "2025-12-03T20:00:00",
      },
      {
        role: "USER",
        text: "조용했지만 생각이 많았어.",
        createdAt: "2025-12-03T20:00:10",
      },
      {
        role: "ASSISTANT",
        text: "무슨 생각들이 가장 많이 들었어?",
        createdAt: "2025-12-03T20:00:20",
      },
      {
        role: "USER",
        text: "앞으로 해야 할 일들이랑 요즘 내 상태에 대해서 생각했어.",
        createdAt: "2025-12-03T20:00:30",
      },
      {
        role: "ASSISTANT",
        text: "그 생각들 중에서 가장 마음에 남는 건 뭐였어?",
        createdAt: "2025-12-03T20:00:40",
      },
      {
        role: "USER",
        text: "지금 페이스를 계속 유지해도 괜찮을지 고민됐어.",
        createdAt: "2025-12-03T20:00:50",
      },
    ],
  },
  {
    messages: [
      {
        role: "ASSISTANT",
        text: "오늘은 어떤 기분이야?",
        createdAt: "2025-12-05T21:00:00",
      },
      {
        role: "USER",
        text: "조금 우울했어. 쉬고 싶었어.",
        createdAt: "2025-12-05T21:00:10",
      },
    ],
  },
  {
    messages: [
      {
        role: "ASSISTANT",
        text: "오늘 하루는 어땠어?",
        createdAt: "2025-12-06T21:00:00",
      },
      {
        role: "USER",
        text: "특별한 일은 없었지만 나쁘지 않았어.",
        createdAt: "2025-12-06T21:00:10",
      },
    ],
  },
  {
    messages: [
      {
        role: "ASSISTANT",
        text: "오늘 감정 상태는 어땠어?",
        createdAt: "2025-12-07T21:00:00",
      },
      {
        role: "USER",
        text: "계속 마음이 가라앉아 있었어.",
        createdAt: "2025-12-07T21:00:10",
      },
      {
        role: "ASSISTANT",
        text: "특별한 이유가 있었을까?",
        createdAt: "2025-12-07T21:00:20",
      },
      {
        role: "USER",
        text: "딱 하나라기보단 쌓여 있던 것 같아.",
        createdAt: "2025-12-07T21:00:30",
      },
      {
        role: "ASSISTANT",
        text: "그 감정을 지금 말로 표현한다면?",
        createdAt: "2025-12-07T21:00:40",
      },
      {
        role: "USER",
        text: "지치고 복잡해.",
        createdAt: "2025-12-07T21:00:50",
      },
    ],
  },
  {
    messages: [
      {
        role: "ASSISTANT",
        text: "오늘은 어떤 걸 하면서 보냈어?",
        createdAt: "2025-12-20T21:00:00",
      },
      {
        role: "USER",
        text: "집에서 그림을 그리면서 쉬었어.",
        createdAt: "2025-12-20T21:00:10",
      },
      {
        role: "ASSISTANT",
        text: "오랜만에 한 거야?",
        createdAt: "2025-12-20T21:00:20",
      },
      {
        role: "USER",
        text: "응, 한동안 못 했는데 다시 하니까 좋더라.",
        createdAt: "2025-12-20T21:00:30",
      },
      {
        role: "ASSISTANT",
        text: "그림 그리는 시간이 어떤 기분을 줬어?",
        createdAt: "2025-12-20T21:00:40",
      },
      {
        role: "USER",
        text: "머릿속이 정리되는 느낌이었어.",
        createdAt: "2025-12-20T21:00:50",
      },
    ],
  },
  {
    messages: [
      {
        role: "ASSISTANT",
        text: "오늘은 어떤 하루였어?",
        createdAt: "2025-12-21T21:00:00",
      },
      {
        role: "USER",
        text: "그냥 아무것도 안 했어.",
        createdAt: "2025-12-21T21:00:10",
      },
      {
        role: "ASSISTANT",
        text: "그 선택이 도움이 됐어?",
        createdAt: "2025-12-21T21:00:20",
      },
      {
        role: "USER",
        text: "응, 오히려 마음이 좀 편해졌어.",
        createdAt: "2025-12-21T21:00:30",
      },
    ],
  },
  {
    messages: [
      {
        role: "ASSISTANT",
        text: "안녕! 오늘은 어떤 하루를 보냈어?",
        createdAt: "2025-12-22T21:00:00",
      },
      {
        role: "USER",
        text: "오늘 일본 여행을 시작했어. 오사카에 가는데 아침에 일찍 일어났더니 피곤하네. 하지만 기분은 좋아!",
        createdAt: "2025-12-22T21:00:10",
      },
      {
        role: "ASSISTANT",
        text: "와! 재밌었겠다. 일본에 도착한 뒤에 어떤 걸 했어?",
        createdAt: "2025-12-22T21:00:20",
      },
      {
        role: "USER",
        text: "공항에 도착하자마자 짐을 찾고 바로 숙소로 이동했어.",
        createdAt: "2025-12-22T21:00:30",
      },
    ],
  },
  {
    messages: [
      {
        role: "ASSISTANT",
        text: "오늘은 누구랑 시간을 보냈어?",
        createdAt: "2025-12-25T21:00:00",
      },
      {
        role: "USER",
        text: "가족이랑 같이 있었어.",
        createdAt: "2025-12-25T21:00:10",
      },
      {
        role: "ASSISTANT",
        text: "어떤 순간이 가장 기억에 남아?",
        createdAt: "2025-12-25T21:00:20",
      },
      {
        role: "USER",
        text: "다 같이 웃으면서 밥 먹던 시간이 가장 좋았어. 케이크도 먹었어!",
        createdAt: "2025-12-25T21:00:30",
      },
      {
        role: "ASSISTANT",
        text: "오늘 하루가 너에게 어떤 의미였을까?",
        createdAt: "2025-12-25T21:00:40",
      },
      {
        role: "USER",
        text: "정말 행복했고, 마음이 따뜻해졌어.",
        createdAt: "2025-12-25T21:00:50",
      },
    ],
  },
];
