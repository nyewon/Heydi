// 날짜 한국어 변환
export const getFormattedDate = () => {
  const now = new Date();

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("ko-KR", dateOptions).format(now);
};

// 시간 한국어 변환 및 12시간제 변환
export const getFormattedTime = () => {
  const now = new Date();

  const hour = now.getHours();
  const minute = now.getMinutes();

  const period = hour < 12 ? "오전" : "오후";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const paddedMinute = minute.toString().padStart(2, "0");

  return `${period} ${hour12}시 ${paddedMinute}분`;
};

// 경과 시간(sec)을 00:00 형태로 변환
export const formatElapsedTime = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  const paddedMin = minutes.toString().padStart(2, "0");
  const paddedSec = seconds.toString().padStart(2, "0");

  return `${paddedMin}:${paddedSec}`;
};
