import { getTopicIcon } from "@/constants/topics";
import type { MonthlyTopicsResponse } from "@models/report";
import TopicChip from "./TopicChip";

const TopTopics = ({ data }: { data: MonthlyTopicsResponse }) => {
  const main = {
    rank: 1,
    title: data.top1.name,
    percent: data.top1.ratio,
    description: data.top1.description,
  };

  const subs = data.top2to4.map((t, idx) => ({
    rank: idx + 2,
    title: t.name,
    percent: t.ratio,
  }));

  const subBgMap: Record<number, string> = {
    2: "bg-[#EFE8E1]/80",
    3: "bg-[#EFE8E1]/60",
    4: "bg-[#EFE8E1]/40",
  };

  return (
    <div className="w-full mb-6">
      <div className="rounded-2xl bg-[#EFE8E1] text-[#4A4A4A] p-5 mb-4">
        <div className="text-xs opacity-70 font-bold mb-1">#{main.rank}</div>
        <div className="text-3xl mb-2">{getTopicIcon(main.title)}</div>
        <div className="text-[18px] font-bold">{main.title}</div>
        <div className="text-[13px] opacity-80 mt-1">
          전체 일기 중 {main.percent}%
        </div>
        <p className="text-[13px] leading-relaxed mt-2">{main.description}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {subs.map(topic => (
          <TopicChip
            key={topic.rank}
            rank={topic.rank}
            title={topic.title}
            bgColor={subBgMap[topic.rank]}
          />
        ))}
      </div>
    </div>
  );
};

export default TopTopics;
