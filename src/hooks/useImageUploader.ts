import { useRef, useState } from "react";
import { PhotoItem } from "@models/diary";

interface UseImageUploaderOptions {
  maxCount?: number;
  initialImages?: PhotoItem[];
}

export const useImageUploader = ({
  maxCount = 4,
  initialImages = [],
}: UseImageUploaderOptions = {}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<PhotoItem[]>(initialImages);
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

    const startOrder = images.length;

    const newImages: PhotoItem[] = Array.from(files).map((file, index) => ({
      file,
      imageUrl: URL.createObjectURL(file),
      order: startOrder + index,
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const next = prev
        .filter((_, i) => i !== index)
        .map((img, idx) => ({
          ...img,
          order: idx,
        }));

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
