import { useMemo, useRef, useState } from "react";
import { Modal, Button } from "@components/index";

interface AlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm?: (ampm: "AM" | "PM", hour: number, minute: number) => void;
  onDisable?: () => void;
  defaultAmPm?: "AM" | "PM";
  defaultHour?: number;
  defaultMinute?: number;
}

const ITEM_HEIGHT = 40;
const CENTER_INDEX = Math.floor(3 / 2);

const now = new Date();
const currentHour24 = now.getHours();
const currentMinute = now.getMinutes();

const currentAmPm: "AM" | "PM" = currentHour24 >= 12 ? "PM" : "AM";
const currentHour12 = currentHour24 % 12 === 0 ? 12 : currentHour24 % 12;
const currentMinute10 = Math.floor(currentMinute / 10) * 10;

const AlarmModal = ({
  isOpen,
  onClose,
  onConfirm,
  onDisable,
  defaultAmPm = currentAmPm,
  defaultHour = currentHour12,
  defaultMinute = currentMinute10,
}: AlarmModalProps) => {
  const ampmList = ["AM", "PM"] as const;
  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const minutes = useMemo(
    () => Array.from({ length: 6 }, (_, i) => i * 10),
    [],
  );

  const [ampmIndex, setAmpmIndex] = useState(
    Math.max(0, ampmList.indexOf(defaultAmPm)),
  );
  const [hourIndex, setHourIndex] = useState(
    Math.max(0, hours.indexOf(defaultHour)),
  );
  const [minuteIndex, setMinuteIndex] = useState(
    Math.max(0, minutes.indexOf(defaultMinute)),
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

  const renderColumn = (
    items: readonly (string | number)[],
    selectedIndex: number,
    lineWidth: number,
    drag: ReturnType<typeof createDragHandler>,
    // eslint-disable-next-line no-unused-vars
    format?: (v: any) => string,
  ) => (
    <div className="relative w-[60px]">
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
                key={String(v)}
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

  const handleSetting = () => {
    onConfirm?.(ampmList[ampmIndex], hours[hourIndex], minutes[minuteIndex]);
    onClose();
  };

  const handleDisable = () => {
    onDisable?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="알람 설정"
      footer={
        <div className="flex gap-3 w-full justify-center">
          <Button variant="pill" className="flex-1" onClick={handleSetting}>
            설정
          </Button>

          <Button
            variant="pill"
            className="flex-1 bg-[#D9D9D9]"
            onClick={handleDisable}
          >
            해제
          </Button>
        </div>
      }
    >
      <div className="flex justify-center gap-6 py-6 select-none">
        {renderColumn(
          ampmList,
          ampmIndex,
          60,
          createDragHandler(ampmIndex, setAmpmIndex, ampmList.length - 1),
        )}

        <div className="flex gap-1">
          {renderColumn(
            hours,
            hourIndex,
            40,
            createDragHandler(hourIndex, setHourIndex, hours.length - 1),
            v => String(v).padStart(2, "0"),
          )}

          {renderColumn(
            minutes,
            minuteIndex,
            40,
            createDragHandler(minuteIndex, setMinuteIndex, minutes.length - 1),
            v => String(v).padStart(2, "0"),
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AlarmModal;
