import { useEffect, useState } from "react";
import { getTopicIcon } from "@/constants/topics";
import type { MonthlyTopicsResponse } from "@models/report";

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
        {subs.map(topic => {
          const [open, setOpen] = useState(false);

          useEffect(() => {
            if (!open) return;
            const timer = setTimeout(() => setOpen(false), 2000);
            return () => clearTimeout(timer);
          }, [open]);

          return (
            <div
              key={topic.rank}
              className={[
                "relative flex items-center gap-1",
                "rounded-full px-4 py-2 text-xs font-bold text-[#4A4A4A]",
                subBgMap[topic.rank],
              ].join(" ")}
            >
              <span className="shrink-0 opacity-70">#{topic.rank}</span>

              <button
                onClick={() => setOpen(true)}
                className="
                  flex-1 min-w-0
                  truncate whitespace-nowrap text-left px-1
                  cursor-pointer
                "
              >
                {getTopicIcon(topic.title)} {topic.title}
              </button>

              {open && (
                <div
                  className="
                    absolute left-1/2 top-full mt-1 -translate-x-1/2
                    z-20
                    rounded-lg border border-[#B28C7E]
                    bg-white px-3 py-2
                    text-xs text-[#4A4A4A]
                    shadow
                    whitespace-nowrap
                  "
                >
                  {getTopicIcon(topic.title)} {topic.title}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopTopics;
