import { useEffect } from "react";

interface ToastProps {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, open, onClose, duration = 1200 }: ToastProps) => {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
      <div
        className="w-82 px-6 py-3 bg-[#E0CFC5] text-white text-sm text-center rounded-lg shadow-md"
        style={{
          animation: `toastFade ${duration}ms ease-in-out forwards`,
        }}
      >
        {message}
      </div>

      <style>
        {`
          @keyframes toastFade {
            0% {
              opacity: 0;
              transform: translateY(8px);
            }
            15% {
              opacity: 1;
              transform: translateY(0);
            }
            85% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Toast;
