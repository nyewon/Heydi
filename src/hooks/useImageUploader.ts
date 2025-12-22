import { useRef, useState } from "react";

interface UseImageUploaderOptions {
  maxCount?: number;
}

export const useImageUploader = (options: UseImageUploaderOptions = {}) => {
  const { maxCount = 4 } = options;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    if (images.length + files.length > maxCount) {
      alert(`사진은 최대 ${maxCount}장까지 업로드할 수 있어요.`);
      return;
    }

    const newImages = Array.from(files).map(file => URL.createObjectURL(file));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const next = prev.filter((_, i) => i !== index);

      if (currentIndex >= next.length) {
        setCurrentIndex(Math.max(0, next.length - 1));
      }

      return next;
    });
  };

  return {
    images,
    currentIndex,
    setCurrentIndex,
    fileInputRef,
    openFilePicker,
    handleFiles,
    removeImage,
  };
};
