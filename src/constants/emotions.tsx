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
  happy: "행복",
  joy: "기쁨",
  neutral: "무난함",
  sad: "슬픔",
  annoyed: "짜증",
  angry: "분노",
} as const;

export type EmotionKey = keyof typeof EMOTIONS;

export const EMOTION_S_ICONS: Record<EmotionKey, React.ReactNode> = {
  happy: <Happy_S />,
  joy: <Joy_S />,
  neutral: <Neutral_S />,
  sad: <Sad_S />,
  annoyed: <Annoyed_S />,
  angry: <Angry_S />,
};

export const EMOTION_M_ICONS: Record<EmotionKey, React.ReactNode> = {
  happy: <Happy_M />,
  joy: <Joy_M />,
  neutral: <Neutral_M />,
  sad: <Sad_M />,
  annoyed: <Annoyed_M />,
  angry: <Angry_M />,
};

export const EMOTION_SENTENCE: Record<EmotionKey, string> = {
  happy: "행복한",
  joy: "기쁜",
  neutral: "무난한",
  sad: "슬픈",
  annoyed: "짜증이 많은",
  angry: "분노가 강했던",
};
