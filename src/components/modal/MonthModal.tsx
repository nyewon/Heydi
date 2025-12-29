/*
 * MonthModal - 리포트 월 선택 모달
 */

import { useMemo, useRef, useState } from "react";
import { Modal, Button } from "@components/index";

interface MonthModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm?: (year: number, month: number) => void;
  defaultYear?: number;
  defaultMonth?: number;
}

const ITEM_HEIGHT = 40;
const CENTER_INDEX = Math.floor(3 / 2);

const MonthModal = ({
  isOpen,
  onClose,
  onConfirm,
  defaultYear,
  defaultMonth,
}: MonthModalProps) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const years = useMemo(
    () => Array.from({ length: 5 }, (_, i) => currentYear - i),
    [currentYear],
  );

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  const [yearIndex, setYearIndex] = useState(
    Math.max(0, years.indexOf(defaultYear ?? currentYear)),
  );

  const [monthIndex, setMonthIndex] = useState(
    Math.max(0, (defaultMonth ?? currentMonth) - 1),
  );

  const createDragHandler = (
    index: number,
    // eslint-disable-next-line no-unused-vars
    setIndex: (v: number) => void,
    max: number,
  ) => {
    const startY = useRef(0);
    const startIndex = useRef(0);

    return {
      onPointerDown: (e: React.PointerEvent) => {
        startY.current = e.clientY;
        startIndex.current = index;

        const onMove = (ev: PointerEvent) => {
          const diff = ev.clientY - startY.current;
          const moved = Math.floor(diff / ITEM_HEIGHT);
          const next = Math.min(Math.max(startIndex.current - moved, 0), max);
          setIndex(next);
        };

        const onUp = () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      },
    };
  };

  const handleConfirm = () => {
    onConfirm?.(years[yearIndex], months[monthIndex]);
    onClose();
  };

  const renderColumn = (
    items: number[],
    selectedIndex: number,
    unit: string,
    lineWidth: number,
    paddingRight: number,
    drag: ReturnType<typeof createDragHandler>,
    // eslint-disable-next-line no-unused-vars
    format?: (v: number) => string,
  ) => (
    <div className="relative w-[90px]" style={{ paddingRight }}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#76615A] font-bold">
        {unit}
      </div>

      <div
        className="h-[120px] overflow-hidden cursor-grab touch-none"
        {...drag}
      >
        <div
          className="transition-transform duration-200 ease-out"
          style={{
            transform: `translateY(${(CENTER_INDEX - selectedIndex) * ITEM_HEIGHT}px)`,
          }}
        >
          {items.map((v, i) => {
            const isActive = i === selectedIndex;

            return (
              <div
                key={v}
                className={`h-[40px] flex items-center justify-center transition-all ${
                  isActive
                    ? "relative text-[#76615A] text-xl font-semibold"
                    : "text-[#B8B8B8] text-sm"
                }`}
              >
                {isActive && (
                  <>
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 border-t-3 border-[#E0CFC5]"
                      style={{ width: lineWidth }}
                    />
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 border-t-3 border-[#E0CFC5]"
                      style={{ width: lineWidth }}
                    />
                  </>
                )}
                {format ? format(v) : v}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="월 선택"
      footer={
        <Button variant="pill" onClick={handleConfirm}>
          확인
        </Button>
      }
    >
      <div className="flex justify-center gap-4 py-6 select-none">
        {renderColumn(
          years,
          yearIndex,
          "년",
          80,
          24,
          createDragHandler(yearIndex, setYearIndex, years.length - 1),
        )}

        {renderColumn(
          months,
          monthIndex,
          "월",
          40,
          8,
          createDragHandler(monthIndex, setMonthIndex, months.length - 1),
          m => String(m).padStart(2, "0"),
        )}
      </div>
    </Modal>
  );
};

export default MonthModal;
