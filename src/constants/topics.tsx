export type TopicCategory =
  | "학업"
  | "인간관계"
  | "취미"
  | "건강"
  | "휴식"
  | "여행"
  | "일상"
  | "기타";

type TopicRule = {
  category: TopicCategory;
  keywords: string[];
  icon: string;
};

export const DEFAULT_CATEGORY: TopicCategory = "기타";
export const DEFAULT_ICON = "🏷️";

const TOPIC_RULES: TopicRule[] = [
  {
    category: "학업",
    keywords: ["학업", "공부", "시험", "과제", "수업"],
    icon: "📚",
  },
  {
    category: "인간관계",
    keywords: ["인간관계", "친구", "연애", "사람", "가족"],
    icon: "👨🏻",
  },
  {
    category: "취미",
    keywords: ["취미", "음악", "게임", "독서", "영화"],
    icon: "🎧",
  },
  {
    category: "건강",
    keywords: ["건강", "운동", "헬스", "병원"],
    icon: "💪",
  },
  {
    category: "휴식",
    keywords: ["휴식", "잠", "쉼", "휴가"],
    icon: "🌙",
  },
  {
    category: "여행",
    keywords: ["여행", "출장"],
    icon: "✈️",
  },
  {
    category: "일상",
    keywords: ["일상", "하루", "아침", "점심", "저녁", "산책"],
    icon: "☀️",
  },
  {
    category: "기타",
    keywords: [],
    icon: "🏷️",
  },
];

export const resolveTopicCategory = (title: string): TopicCategory => {
  if (!title) return DEFAULT_CATEGORY;

  const rule = TOPIC_RULES.find(r =>
    r.keywords.some(keyword => title.includes(keyword)),
  );

  return rule ? rule.category : DEFAULT_CATEGORY;
};

export const getTopicIcon = (title: string): string => {
  if (!title) return DEFAULT_ICON;

  const rule = TOPIC_RULES.find(r =>
    r.keywords.some(keyword => title.includes(keyword)),
  );

  const fallbackRule = TOPIC_RULES.find(r => r.category === "기타");

  return rule ? rule.icon : (fallbackRule?.icon ?? DEFAULT_ICON);
};
