import { useState, useRef } from "react";

export const useProfileImage = () => {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImg(imageUrl);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return {
    profileImg,
    fileInputRef,
    handleSelectImage,
    openFileDialog,
    setProfileImg,
  };
};
