/*
 * ImageSlider - 이미지 슬라이더 컴포넌트
 *
 * 세부사항:
 * - Diary Detail, Diary Edit, Community에서 사용
 * - 이미지 배열을 받아 슬라이더 형태로 표시
 * - 좌우 스와이프로 이미지 전환 가능
 * - 이미지 삭제 기능 포함
 */

import { useState } from "react";
import { MdCancel } from "react-icons/md";

interface ImageSliderProps {
  images: string[];
  currentIndex: number;
  // eslint-disable-next-line no-unused-vars
  onChangeIndex: (index: number) => void;
  // eslint-disable-next-line no-unused-vars
  onRemove?: (index: number) => void;
  height?: number;
}

const ImageSlider = ({
  images,
  currentIndex,
  onChangeIndex,
  onRemove,
  height = 160,
}: ImageSliderProps) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || startX === null) return;

    const diff = e.clientX - startX;
    const threshold = 50;

    if (diff > threshold && currentIndex > 0) {
      onChangeIndex(currentIndex - 1);
    } else if (diff < -threshold && currentIndex < images.length - 1) {
      onChangeIndex(currentIndex + 1);
    }

    setStartX(null);
    setIsDragging(false);
  };

  if (images.length === 0) return null;

  return (
    <div className="w-full">
      <div
        className="relative w-full overflow-hidden touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative w-full flex-shrink-0"
              style={{ height }}
            >
              <img
                src={src}
                draggable={false}
                className="
                  w-full h-full
                  object-cover
                  rounded-xl
                  select-none
                  pointer-events-none
                "
              />

              {idx === currentIndex && onRemove && (
                <button
                  onClick={() => onRemove(idx)}
                  className="
                    absolute top-2 right-2
                    rounded-full
                    p-1 cursor-pointer
                    "
                >
                  <MdCancel size={26} color="white" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => onChangeIndex(idx)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              idx === currentIndex ? "bg-[#B28C7E]" : "bg-[#E0CFC5]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
