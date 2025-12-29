/*
 * DiaryEdit - 일기 수정 화면
 *
 * 세부사항:
 * - 일기 수정 내용 표시
 * - 감정 상태, 주제, 한 줄 일기, 일기 내용 수정 기능
 * - 사진 업로드 및 삭제 기능
 * - 임시 더미 데이터 사용
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  BackHeader,
  DiaryInfoBox,
  ImageSlider,
  EmotionModal,
  TopicModal,
} from "@components/index";
import { EMOTION_SENTENCE, EMOTION_S_ICONS } from "@constants/emotions";
import { DIARY_DETAIL_DUMMIES, DiaryDetailDummy } from "@mocks/diary";
import { useImageUploader } from "@hooks/useImageUploader";
import Plus from "@assets/icons/plus.svg?react";

const DiaryEdit = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams<{ diaryId: string }>();
  const [emotionModalOpen, setEmotionModalOpen] = useState(false);
  const [topicModalOpen, setTopicModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<
    null | "oneLine" | "content"
  >(null);
  const [tempValue, setTempValue] = useState("");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const diaryData = DIARY_DETAIL_DUMMIES.find(d => d.diaryId === diaryId)!;
  const [diary, setDiary] = useState<DiaryDetailDummy>(diaryData);

  const {
    images,
    currentIndex,
    setCurrentIndex,
    removeImage,
    fileInputRef,
    openFilePicker,
    handleFiles,
  } = useImageUploader();

  useEffect(() => {
    if (editingField === "content" && contentRef.current) {
      const el = contentRef.current;

      el.style.height = "auto";
      el.style.height = el.scrollHeight - 3.2 + "px";

      const length = el.value.length;
      el.setSelectionRange(length, length);
    }
  }, [editingField]);

  const handleSave = () => {
    const payload = {
      id: diary.diaryId,
      emotion: diary.emotion,
      topics: diary.topics,
      oneLine: diary.oneLine,
      content: diary.content,
      images,
    };

    console.log("SAVE PAYLOAD", payload); // api 연동 시 삭제

    navigate(`/diary/detail/${diary.diaryId}`, {
      replace: true,
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <BackHeader rightIcon="save" onSave={handleSave} />

      <Container className="pb-8">
        <div className="w-full bg-white border border-[#E0CFC5] rounded-xl p-4 mb-4">
          <p className="text-sm font-bold text-[#4A4A4A] mb-2">{diary.title}</p>
          <p className="text-xs text-[#4A4A4A]">작성 날짜: {diary.createdAt}</p>
          <p className="text-xs text-[#4A4A4A]">
            총 대화 시간: {diary.totalTalkTime}
          </p>
        </div>

        <DiaryInfoBox
          label="오늘의 감정상태"
          type="edit"
          onEditClick={() => setEmotionModalOpen(true)}
        >
          <div className="flex items-center gap-1">
            <span className="flex items-center">
              {EMOTION_S_ICONS[diary.emotion]}
            </span>
            <span>
              오늘은 {EMOTION_SENTENCE[diary.emotion]} 하루를 보냈어요.
            </span>
          </div>
        </DiaryInfoBox>

        <DiaryInfoBox
          label="오늘의 주제"
          type="edit"
          onEditClick={() => setTopicModalOpen(true)}
        >
          {diary.topics.join(" / ")}
        </DiaryInfoBox>

        <DiaryInfoBox
          label="오늘의 한 줄 일기"
          type="edit"
          onEditClick={() => {
            setEditingField("oneLine");
            setTempValue(diary.oneLine);
          }}
        >
          {editingField === "oneLine" ? (
            <input
              value={tempValue}
              autoFocus
              spellCheck={false}
              onChange={e => setTempValue(e.target.value)}
              onBlur={() => {
                setDiary(prev => ({
                  ...prev,
                  oneLine: tempValue,
                }));
                setEditingField(null);
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
              className="w-full text-xs focus:outline-none"
            />
          ) : (
            diary.oneLine
          )}
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
                setDiary(prev => ({
                  ...prev,
                  content: tempValue,
                }));
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

        <DiaryInfoBox label="오늘의 대화 내용">
          <div className="w-full flex flex-col gap-2 max-h-[300px] overflow-y-auto pt-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {diary.conversations.map((msg, idx) => (
              <div
                key={idx}
                className={`text-[10px] p-2 px-3 rounded-lg break-words inline-block w-fit min-w-[60px] ${
                  msg.role === "assistant"
                    ? "bg-[#EFE8E1] text-[#4A4A4A] max-w-[60%] self-start"
                    : "bg-[#B28C7E] text-white max-w-[80%] self-end"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
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

              <p className="text-[10px] text-[#B28C7E] text-center font-semibold mt-2">
                사진은 최대 4장까지 업로드 할 수 있어요.
              </p>
            </>
          ) : (
            <ImageSlider
              images={images}
              currentIndex={currentIndex}
              onChangeIndex={setCurrentIndex}
              onRemove={removeImage}
            />
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={e => handleFiles(e.target.files)}
          />
        </DiaryInfoBox>
      </Container>

      <EmotionModal
        isOpen={emotionModalOpen}
        defaultEmotion={diary.emotion}
        onClose={() => setEmotionModalOpen(false)}
        onConfirm={nextEmotion => {
          setDiary(prev => ({
            ...prev,
            emotion: nextEmotion,
          }));
        }}
      />

      <TopicModal
        isOpen={topicModalOpen}
        defaultTopics={diary.topics}
        onClose={() => setTopicModalOpen(false)}
        onConfirm={nextTopics => {
          setDiary(prev => ({
            ...prev,
            topics: nextTopics,
          }));
        }}
      />
    </div>
  );
};

export default DiaryEdit;
