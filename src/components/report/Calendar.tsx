const Calendar = () => {
  const markedDates = [3, 6, 20, 22, 25];

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-7 text-center font-bold text-[10px] text-[#76615A] mb-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
          <div
            key={day}
            className={`py-1 rounded-full ${
              markedDates.includes(day)
                ? "bg-[#D4B6A6] text-white font-semibold"
                : "text-[#4A4A4A]"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
