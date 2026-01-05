import { useEffect, useRef } from "react";

export interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dropdown = ({ open, onClose, children }: DropdownProps) => {
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

  return <div ref={ref}>{children}</div>;
};

export default Dropdown;
