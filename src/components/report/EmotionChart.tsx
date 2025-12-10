import { EMOTION_ICONS, EmotionKey } from "@/constants/emotions";

const EmotionChart = () => {
  const data: { week: string; percent: number; emotion: EmotionKey }[] = [
    { week: "1주", percent: 72, emotion: "happy" },
    { week: "2주", percent: 54, emotion: "sad" },
    { week: "3주", percent: 68, emotion: "joy" },
    { week: "4주", percent: 72, emotion: "happy" },
    { week: "5주", percent: 38, emotion: "neutral" },
  ];

  const percents = data.map(d => d.percent);
  const max = Math.max(...percents);
  const min = Math.min(...percents);

  const getBarColor = (percent: number) => {
    if (percent === max) return "#B28C7E";
    if (percent === min) return "#76615A";
    return "#D4B6A6";
  };

  return (
    <div className="w-full border border-[#E0CFC5] rounded-2xl p-2 bg-white mb-6">
      <div className="flex justify-between items-end px-1">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-0">
            <div className="w-6 h-6 flex justify-center items-center mb-1">
              {EMOTION_ICONS[item.emotion]}
            </div>

            <div
              className="w-9 rounded-t-xl flex items-end justify-center mb-1"
              style={{
                height: `${item.percent * 0.9}px`,
                backgroundColor: getBarColor(item.percent),
              }}
            >
              <span className="text-[10px] text-white font-bold pb-1">
                {item.percent}%
              </span>
            </div>

            <span className="text-[10px] font-bold text-[#76615A]">
              {item.week}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionChart;
