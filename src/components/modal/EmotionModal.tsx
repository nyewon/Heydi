/*
 * EmotionModal - 감정 선택 모달
 */

import { useState } from "react";
import { Modal, Button } from "@components/index";
import { EMOTIONS, EMOTION_M_ICONS, EmotionKey } from "@constants/emotions";

interface EmotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm?: (emotion: EmotionKey) => void;
  defaultEmotion?: EmotionKey;
}

const EmotionModal = ({
  isOpen,
  onClose,
  onConfirm,
  defaultEmotion,
}: EmotionModalProps) => {
  const [selected, setSelected] = useState<EmotionKey | null>(
    defaultEmotion ?? null,
  );

  const handleConfirm = () => {
    if (!selected) return;
    onConfirm?.(selected);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="감정 선택"
      footer={
        <div className="flex w-full justify-center">
          <Button
            variant="pill"
            onClick={handleConfirm}
            disabled={!selected}
            className="mx-auto"
          >
            확인
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-3 px-1 py-2">
        {(Object.keys(EMOTIONS) as EmotionKey[]).map(key => {
          const isSelected = selected === key;

          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`
                flex items-center gap-3
                px-4 py-3 rounded-xl
                border text-sm font-semibold
                transition
                ${
                  isSelected
                    ? "bg-[#EFE8E1] border-[#B28C7E] text-[#4A4A4A]"
                    : "bg-white border-[#E0CFC5] text-[#4A4A4A]"
                }
              `}
            >
              <span className="w-6 h-6 text-[#B28C7E] flex items-center justify-center">
                {EMOTION_M_ICONS[key]}
              </span>
              {EMOTIONS[key]}
            </button>
          );
        })}
      </div>
    </Modal>
  );
};

export default EmotionModal;
