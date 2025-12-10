import HappyIcon from "@assets/icons/happy.svg?react";
import JoyIcon from "@assets/icons/joy.svg?react";
import NeutralIcon from "@assets/icons/neutral.svg?react";
import SadIcon from "@assets/icons/sad.svg?react";
import AnnoyedIcon from "@assets/icons/annoyed.svg?react";
import AngryIcon from "@assets/icons/angry.svg?react";

export const EMOTIONS = {
  happy: "행복",
  joy: "기쁨",
  neutral: "무난함",
  sad: "슬픔",
  annoyed: "짜증",
  angry: "분노",
} as const;

export type EmotionKey = keyof typeof EMOTIONS;

export const EMOTION_ICONS: Record<EmotionKey, React.ReactNode> = {
  happy: <HappyIcon />,
  joy: <JoyIcon />,
  neutral: <NeutralIcon />,
  sad: <SadIcon />,
  annoyed: <AnnoyedIcon />,
  angry: <AngryIcon />,
};
