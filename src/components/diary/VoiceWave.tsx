/**
 * VoiceWave 컴포넌트
 *
 * 상세설명:
 * - 통화 중 사용자의 발화 상태를 시각적으로 나타내는 애니메이션
 *
 * 사용 화면:
 * AI 음성 대화 중 화면 (DiaryChat.tsx)
 */

const VoiceWave = () => {
  return (
    <div className="flex items-center justify-center bg-transparent rounded-xl">
      <style>
        {`
          @keyframes voice-bounce {
            0%, 100% {
              transform: scaleY(0.4);
            }
            50% {
              transform: scaleY(1);
            }
          }
        `}
      </style>

      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="w-[0.2rem] h-[0.8rem] mx-[3px] bg-[#ffffff] rounded-sm origin-bottom"
          style={{
            animation: "voice-bounce 1s infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWave;
