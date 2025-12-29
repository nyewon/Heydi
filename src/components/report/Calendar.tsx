import { useNavigate } from "react-router-dom";
import { CalendarProps, CalendarDate, CalendarEntry } from "@mocks/report";

const Calendar = ({
  year,
  month,
  calendars,
}: CalendarProps & { calendars: CalendarEntry[] }) => {
  const navigate = useNavigate();

  const firstDay = new Date(year, month - 1, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const lastDate = new Date(year, month, 0).getDate();
  const prevLastDate = new Date(year, month - 1, 0).getDate();

  const dates: CalendarDate[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    dates.push({ day: prevLastDate - i, current: false });
  }

  for (let i = 1; i <= lastDate; i++) {
    dates.push({ day: i, current: true });
  }

  while (dates.length % 7 !== 0) {
    dates.push({
      day: dates.length - lastDate - startDay + 1,
      current: false,
    });
  }

  const diaryMap: Record<number, number> = {};
  calendars.forEach(d => {
    if (d.year === year && d.month === month) {
      diaryMap[d.day] = d.diaryId;
    }
  });

  const hasDiary = (day?: number) => !!day && diaryMap[day];

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-7 text-center font-bold text-xs text-[#76615A] mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0 text-center text-sm">
        {dates.map((date, idx) => {
          const diaryId = date.current ? diaryMap[date.day ?? 0] : undefined;

          const isStartOfWeek = idx % 7 === 0;
          const isEndOfWeek = idx % 7 === 6;

          const prev = dates[idx - 1];
          const next = dates[idx + 1];

          const isPrevDiary =
            !isStartOfWeek && prev?.current && hasDiary(prev.day);

          const isNextDiary =
            !isEndOfWeek && next?.current && hasDiary(next.day);

          let radius = "rounded-full";

          if (diaryId) {
            if (isPrevDiary && isNextDiary) radius = "rounded-none";
            else if (isPrevDiary) radius = "rounded-r-full";
            else if (isNextDiary) radius = "rounded-l-full";
          }

          return (
            <div key={idx} className="h-8 flex items-center justify-center">
              <div
                onClick={() => {
                  if (date.current && diaryId) {
                    navigate(`/diary/detail/${diaryId}`);
                  }
                }}
                className={`
                  w-full h-6 flex items-center justify-center
                  ${radius}
                  ${
                    date.current
                      ? diaryId
                        ? "bg-[#D4B6A6] text-white cursor-pointer"
                        : "text-[#4A4A4A]"
                      : "text-[#D9D9D9] pointer-events-none"
                  }
                `}
              >
                {date.day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
