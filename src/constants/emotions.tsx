/* eslint-disable react/jsx-pascal-case */
import Happy_S from "@assets/icons/emotion_s/happy.svg?react";
import Joy_S from "@assets/icons/emotion_s/joy.svg?react";
import Neutral_S from "@assets/icons/emotion_s/neutral.svg?react";
import Sad_S from "@assets/icons/emotion_s/sad.svg?react";
import Annoyed_S from "@assets/icons/emotion_s/annoyed.svg?react";
import Angry_S from "@assets/icons/emotion_s/angry.svg?react";
import Happy_M from "@assets/icons/emotion_m/happy.svg?react";
import Joy_M from "@assets/icons/emotion_m/joy.svg?react";
import Neutral_M from "@assets/icons/emotion_m/neutral.svg?react";
import Sad_M from "@assets/icons/emotion_m/sad.svg?react";
import Annoyed_M from "@assets/icons/emotion_m/annoyed.svg?react";
import Angry_M from "@assets/icons/emotion_m/angry.svg?react";

export const EMOTIONS = {
  행복: "행복",
  기쁨: "기쁨",
  무난함: "무난함",
  슬픔: "슬픔",
  짜증: "짜증",
  분노: "분노",
} as const;

export type EmotionKey = keyof typeof EMOTIONS;

export const EMOTION_S_ICONS: Record<string, React.ReactNode> = {
  행복: <Happy_S />,
  기쁨: <Joy_S />,
  무난함: <Neutral_S />,
  슬픔: <Sad_S />,
  짜증: <Annoyed_S />,
  분노: <Angry_S />,
};

export const EMOTION_M_ICONS: Record<string, React.ReactNode> = {
  행복: <Happy_M />,
  기쁨: <Joy_M />,
  무난함: <Neutral_M />,
  슬픔: <Sad_M />,
  짜증: <Annoyed_M />,
  분노: <Angry_M />,
};

export const EMOTION_SENTENCE: Record<string, string> = {
  행복: "행복한",
  기쁨: "기쁜",
  무난함: "무난한",
  슬픔: "슬픈",
  짜증: "짜증이 많은",
  분노: "분노가 강했던",
};
