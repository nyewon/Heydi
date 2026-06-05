/*
 * PostEdit - 글 등록 전 수정 화면
 *
 * 세부사항:
 * - 글 수정 내용 표시
 * - 감정 상태, 주제, 한 줄 일기, 일기 내용 수정 기능
 * - 사진 업로드 및 삭제 기능
 * - 임시 더미 데이터 사용
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Container,
  BackHeader,
  DiaryInfoBox,
  ImageSlider,
  EmotionModal,
  TopicModal,
  Button,
} from "@components/index";
import { EMOTION_SENTENCE, EMOTION_S_ICONS } from "@constants/emotions";
import { DIARY_DETAIL_DUMMIES } from "@mocks/diary";
import { useImageUploader } from "@hooks/useImageUploader";
import { formatDate, formatElapsedTime } from "@utils/date";
import { DiaryDetailResponse } from "@models/diary";
import { CommunityPostUpsertRequest } from "@models/community";
import { getDiaryDetail } from "@services/diary";
import {
  uploadPostPhoto,
  deletePostPhoto,
  updatePost,
} from "@services/community";
import Plus from "@assets/icons/plus.svg?react";

const PostEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const diaryId = location.state?.diaryId;
  const { postId } = useParams<{ postId: string }>();
  const diaryData = DIARY_DETAIL_DUMMIES.find(d => d.id === Number(diaryId));

  const [diary, setDiary] = useState<DiaryDetailResponse | null>(
    diaryData ?? null,
  );

  const [emotionModalOpen, setEmotionModalOpen] = useState(false);
  const [topicModalOpen, setTopicModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<
    null | "oneLine" | "content"
  >(null);
  const [tempValue, setTempValue] = useState("");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const initialImages = useMemo(() => {
    return (diary?.photos ?? []).map(photo => ({
      id: photo.id,
      imageUrl: photo.imageUrl,
    }));
  }, [diary?.photos]);

  const {
    images,
    currentIndex,
    setCurrentIndex,
    removeImage,
    fileInputRef,
    openFilePicker,
    handleFiles,
  } = useImageUploader({ initialImages });

  useEffect(() => {
    const id = Number(diaryId);

    if (!id) return;

    const fetchDiaryDetail = async () => {
      try {
        const detail = await getDiaryDetail(id);

        setDiary(detail);
      } catch (error) {
        console.error("일기 상세 조회 실패", error);

        const dummyDiary = DIARY_DETAIL_DUMMIES.find(d => d.id === id);

        if (dummyDiary) {
          setDiary(dummyDiary);
        }
      }
    };

    fetchDiaryDetail();
  }, [diaryId]);

  useEffect(() => {
    if (editingField === "content" && contentRef.current) {
      const el = contentRef.current;

      el.style.height = "auto";
      el.style.height = el.scrollHeight - 3.2 + "px";

      const length = el.value.length;
      el.setSelectionRange(length, length);
    }
  }, [editingField]);

  if (!diary) {
    return null;
  }

  const handleSave = async () => {
    console.log("images", images);
    const payload: CommunityPostUpsertRequest = {
      diaryId: diary.id,
      postTitle: diary.title ?? "제목 없음",
      diaryDate: diary.createdDate.split("T")[0],
      conversationDuration: diary.conversationDurationSec,
      postEmotion: diary.emotionCategory,
      postContent: diary.content,
      postTopics: diary.topic,
      existingPhotos: images
        .filter(img => !img.file)
        .map(img => ({ imageUrl: img.imageUrl })),
    };
    console.log("payload", payload);

    try {
      const res = await updatePost(Number(postId), payload);

      if (!res.success) {
        alert("게시글 수정에 실패했습니다.");
        return;
      }

      if (images.length > 0) {
        await Promise.all(
          images
            .filter(img => img.file)
            .map(img => uploadPostPhoto(Number(postId), img.file as File)),
        );
      }

      navigate(`/community/detail/${postId}`, {
        replace: true,
      });
    } catch (error) {
      console.error("게시글 수정 실패", error);
      alert("게시글 저장 중 오류가 발생했습니다.");
    }
  };

  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files || !postId) return;
    const fileArray = Array.from(files);
    try {
      const uploadResults = await Promise.all(
        fileArray.map(file => uploadPostPhoto(Number(postId), file)),
      );

      const uploadedPhotos = uploadResults.flatMap(result =>
        (result.photos ?? []).map(
          (photo: { fileId: number; fileUrl: string }) => ({
            id: photo.fileId,
            imageUrl: photo.fileUrl,
          }),
        ),
      );

      console.log(
        "업로드된 사진 URL",
        uploadedPhotos.map(photo => photo.imageUrl),
      );

      handleFiles(files);

      setDiary(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          photos: [...prev.photos, ...uploadedPhotos],
        };
      });
    } catch (error) {
      console.error("사진 업로드 실패", error);
      alert("사진 업로드에 실패했습니다.");
    }
  };

  const handleRemoveImage = async (photoId: number) => {
    console.log("삭제할 photoId", photoId);
    console.log("현재 photos", diary.photos);

    try {
      const res = await deletePostPhoto(Number(postId), photoId);

      console.log("삭제 응답", res);

      removeImage(photoId);

      setDiary(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          photos: prev.photos.filter(photo => photo.id !== photoId),
        };
      });
    } catch (error) {
      console.error("사진 삭제 실패", error);

      if (error && typeof error === "object" && "response" in error) {
        console.log("삭제 에러 응답", (error as any).response?.data);
        console.log("삭제 에러 상태", (error as any).response?.status);
        console.log("삭제 에러 URL", (error as any).config?.url);
      }

      alert("사진 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader />

      <Container className="pb-10">
        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
          <p className="text-sm font-extrabold text-[#4A4A4A] mb-2">
            {diary.title ?? "제목 없음"}
          </p>
          <p className="text-xs text-[#4A4A4A]">
            작성 날짜: {formatDate(diary.createdDate)}
          </p>
          <p className="text-xs text-[#4A4A4A]">
            총 대화 시간: {formatElapsedTime(diary.conversationDurationSec)}
          </p>
        </div>

        <DiaryInfoBox
          label="오늘의 감정상태"
          type="edit"
          onEditClick={() => setEmotionModalOpen(true)}
        >
          <div className="flex items-center gap-1">
            {EMOTION_S_ICONS[diary.emotionCategory]}
            <span>
              오늘은 {EMOTION_SENTENCE[diary.emotionCategory]} 하루를 보냈어요.
            </span>
          </div>
        </DiaryInfoBox>

        <DiaryInfoBox
          label="오늘의 주제"
          type="edit"
          onEditClick={() => setTopicModalOpen(true)}
        >
          {diary.topic.join(" / ")}
        </DiaryInfoBox>

        <DiaryInfoBox
          label="오늘의 일기"
          type="edit"
          onEditClick={() => {
            setEditingField("content");
            setTempValue(diary.content);
          }}
        >
          {editingField === "content" ? (
            <textarea
              ref={contentRef}
              value={tempValue}
              autoFocus
              spellCheck={false}
              onChange={e => {
                setTempValue(e.target.value);

                if (contentRef.current) {
                  contentRef.current.style.height = "auto";
                  contentRef.current.style.height =
                    contentRef.current.scrollHeight + "px";
                }
              }}
              onBlur={() => {
                setDiary(prev => {
                  if (!prev) return prev;

                  return {
                    ...prev,
                    content: tempValue,
                  };
                });

                setEditingField(null);
              }}
              className="
                w-full
                text-xs leading-5
                resize-none
                overflow-hidden
                focus:outline-none
              "
            />
          ) : (
            <p className="text-xs leading-5">{diary.content}</p>
          )}
        </DiaryInfoBox>

        <DiaryInfoBox
          label="오늘의 사진"
          type="image"
          imageCount={images.length}
          maxImageCount={4}
          onImageAddClick={openFilePicker}
        >
          {images.length === 0 ? (
            <>
              <label
                onClick={openFilePicker}
                className="
                  w-full h-[120px]
                  bg-[#EFE8E1]
                  rounded-xl
                  border border-[#E0CFC5]
                  flex items-center justify-center
                  cursor-pointer
                "
              >
                <Plus />
              </label>

              <p className="text-[10px] text-[#B28C7E] text-center font-bold mt-2">
                사진은 최대 4장까지 업로드 할 수 있어요.
              </p>
            </>
          ) : (
            <ImageSlider
              images={images}
              currentIndex={currentIndex}
              onChangeIndex={setCurrentIndex}
              onRemove={handleRemoveImage}
            />
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={e => handlePhotoUpload(e.target.files)}
          />
        </DiaryInfoBox>

        <Button variant="full" className="w-full mt-8" onClick={handleSave}>
          확인
        </Button>
      </Container>

      <EmotionModal
        isOpen={emotionModalOpen}
        defaultEmotion={diary.emotionCategory}
        onClose={() => setEmotionModalOpen(false)}
        onConfirm={nextEmotion =>
          setDiary(prev => {
            if (!prev) return prev;

            return {
              ...prev,
              emotionCategory: nextEmotion,
            };
          })
        }
      />

      <TopicModal
        isOpen={topicModalOpen}
        defaultTopics={diary.topic}
        onClose={() => setTopicModalOpen(false)}
        onConfirm={nextTopics =>
          setDiary(prev => {
            if (!prev) return prev;

            return {
              ...prev,
              topic: nextTopics,
            };
          })
        }
      />
    </div>
  );
};

export default PostEdit;
