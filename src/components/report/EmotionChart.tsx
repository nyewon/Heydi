import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EMOTION_S_ICONS } from "@constants/emotions";
import type { MonthlyEmotionResponse } from "@models/report";

const EmotionChart = ({ data }: { data: MonthlyEmotionResponse }) => {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    requestAnimationFrame(() => setAnimate(true));
  }, [location.pathname]);

  const weekCount = data.weeks.length;

  const getBarWidthPx = () => {
    if (weekCount <= 4) return 44;
    if (weekCount === 5) return 38;
    return 32;
  };

  const percents = data.weeks.map(w => w.emotionRate);
  const max = Math.max(...percents);
  const min = Math.min(...percents);

  const getBarColor = (percent: number) => {
    if (percent === max) return "#B28C7E";
    if (percent === min) return "#76615A";
    return "#D4B6A6";
  };

  return (
    <div className="w-full border border-[#E0CFC5] rounded-2xl p-2 bg-white mb-6">
      <div className="flex justify-center gap-6 px-1">
        {data.weeks.map(week => {
          const barHeight = (week.emotionRate / 100) * 90 + 20;

          return (
            <div key={week.weekIndex} className="flex flex-col items-center">
              <div
                className="relative h-[100px] mb-1 flex items-end"
                style={{ width: `${getBarWidthPx()}px` }}
              >
                <div
                  className="w-full rounded-t-xl flex items-end justify-center transition-[height] duration-400 ease-out"
                  style={{
                    height: animate ? `${barHeight - 6}px` : "0px",
                    backgroundColor: getBarColor(week.emotionRate),
                  }}
                >
                  <span className="text-[10px] text-white font-bold pb-1">
                    {week.emotionRate}%
                  </span>
                </div>

                <div
                  className="absolute left-1/2 -translate-x-1/2 transition-[bottom] duration-400 ease-out"
                  style={{
                    bottom: animate ? `${barHeight}px` : "0px",
                  }}
                >
                  {EMOTION_S_ICONS[week.topEmotion]}
                </div>
              </div>

              <span className="text-[10px] font-bold text-[#76615A]">
                {week.weekIndex}주차
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionChart;
