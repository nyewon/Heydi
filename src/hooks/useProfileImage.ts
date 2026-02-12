import { useState, useRef } from "react";

export const useProfileImage = () => {
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const [profileFile, setProfileFile] = useState<File | null | undefined>(
    undefined,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setProfileFile(undefined);
      return;
    }

    setProfileFile(file);
    setProfileImg(URL.createObjectURL(file));
  };

  const clearProfileImage = () => {
    setProfileFile(null);
    setProfileImg(null);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return {
    profileImg,
    setProfileImg,
    profileFile,
    clearProfileImage,
    fileInputRef,
    handleSelectImage,
    openFileDialog,
  };
};
