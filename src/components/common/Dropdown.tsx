import { useEffect, useRef } from "react";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  open: boolean;
  onClose: () => void;
  items: DropdownItem[];
}

const Dropdown = ({ open, onClose, items }: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 mt-2 w-34 bg-white rounded-xl shadow-lg border border-[#D9D9D9] text-[#4A4A4A] overflow-hidden"
    >
      {items.map((item, index) => (
        <button
          key={item.label}
          onClick={item.onClick}
          className={`w-full px-4 text-center text-sm cursor-pointer ${
            index === 1 ? "py-1" : "py-3"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
