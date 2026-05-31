import { useEffect, useState } from "react";
import { getTopicIcon } from "@/constants/topics";

interface TopicChipProps {
  rank: number;
  title: string;
  bgColor: string;
}

const TopicChip = ({ rank, title, bgColor }: TopicChipProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <div
      className={[
        "relative flex items-center gap-1",
        "rounded-full px-4 py-2 text-xs font-bold text-[#4A4A4A]",
        bgColor,
      ].join(" ")}
    >
      <span className="shrink-0 opacity-70">#{rank}</span>

      <button
        onClick={() => setOpen(true)}
        className="
          flex-1 min-w-0
          truncate whitespace-nowrap text-left px-1
          cursor-pointer
        "
      >
        {getTopicIcon(title)} {title}
      </button>

      {open && (
        <div
          className="
            absolute left-1/2 top-full mt-1 -translate-x-1/2
            z-20 rounded-lg border border-[#B28C7E]
            bg-white px-3 py-2 text-xs text-[#4A4A4A]
            shadow whitespace-nowrap
          "
        >
          {getTopicIcon(title)} {title}
        </div>
      )}
    </div>
  );
};

export default TopicChip;
