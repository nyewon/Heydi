import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}

const Modal = ({ isOpen, title, children, onClose, footer }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/30 backdrop-blur-[2px]
      "
      onClick={onClose}
    >
      <div
        className="
          bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]
          w-[85%] max-w-[300px] p-6
          flex flex-col gap-4
        "
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-lg font-semibold text-center text-[#4A3F3A]">
            {title}
          </h2>
        )}

        <div
          className="
            text-center text-[#4A3F3A]
            max-h-[400px] overflow-y-auto pr-1
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[#B28C7E]
            [&::-webkit-scrollbar-thumb]:rounded-full
          "
        >
          {children}
        </div>

        {footer && <div className="mt-2 flex justify-center">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
