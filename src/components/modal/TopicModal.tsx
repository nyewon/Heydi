/*
 * TopicModal - 주제 선택 모달
 */

import { useEffect, useState } from "react";
import { Modal, Button } from "@components/index";
import { IoClose } from "react-icons/io5";
import { IoMdInformationCircle } from "react-icons/io";
import { BiSolidPlusSquare } from "react-icons/bi";

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm?: (topics: string[]) => void;
  defaultTopics?: string[];
  max?: number;
}

const TopicModal = ({
  isOpen,
  onClose,
  onConfirm,
  defaultTopics = [],
  max = 3,
}: TopicModalProps) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setTopics(defaultTopics);
  }, [defaultTopics, isOpen]);

  const handleAdd = () => {
    const value = input.trim();
    if (!value) return;
    if (topics.includes(value)) return;
    if (topics.length >= max) return;

    setTopics(prev => [...prev, value]);
    setInput("");
  };

  const handleRemove = (topic: string) => {
    setTopics(prev => prev.filter(t => t !== topic));
  };

  const handleConfirm = () => {
    onConfirm?.(topics);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="주제 선택"
      footer={
        <div className="flex w-full justify-center">
          <Button variant="pill" onClick={handleConfirm} className="mx-auto">
            확인
          </Button>
        </div>
      }
    >
      <div className="flex items-center gap-2 mb-2">
        <input
          value={input}
          spellCheck={false}
          onChange={e => setInput(e.target.value)}
          placeholder="주제 입력"
          className="
            flex-1 px-3 py-2 rounded-xl
            border border-[#B28C7E]
            text-sm text-[#4A4A4A] outline-none
          "
        />
        <button onClick={handleAdd} disabled={topics.length >= max}>
          <BiSolidPlusSquare size={42} color="#B28C7E" />
        </button>
      </div>

      <p className="flex items-center gap-1 text-[10px] text-[#EFE8E1] mb-4 text-left">
        <IoMdInformationCircle size={14} color="#EFE8E1" />
        주제는 최대 3개 선택 할 수 있습니다.
      </p>

      <div className="flex gap-2 flex-wrap mb-6">
        {topics.map(topic => (
          <button
            key={topic}
            className="
              px-3 py-2 rounded-xl
              bg-[#D8B8A7] text-white
              text-sm font-semibold
              flex items-center gap-2
            "
          >
            {topic}
            <IoClose
              size={20}
              color="#FFFFFF"
              className="cursor-pointer"
              onClick={() => handleRemove(topic)}
            />
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default TopicModal;
