import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { LuMenu } from "react-icons/lu";
import { useState } from "react";
import Logo from "@assets/logo_txt.svg?react";
import SaveIcon from "@assets/icons/save.svg?react";
import { MenuDropdown, DeleteModal, PdfModal } from "@components/index";
import { deleteDiary, exportDiaryPdf } from "@services/diary";

interface BackHeaderProps {
  rightIcon?: "none" | "save" | "menu";
  diaryId?: string;
  onSave?: () => void;
}

const BackHeader = ({
  rightIcon = "none",
  diaryId,
  onSave,
}: BackHeaderProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditDiary = () => {
    navigate(`/diary/edit/${diaryId}`);
  };

  const handleDeleteDiary = () => {
    setDeleteOpen(true);
  };

  const handleExportPdf = () => {
    setPdfOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!diaryId) return;

    try {
      await deleteDiary(Number(diaryId));

      setDeleteOpen(false);
      setOpen(false);

      navigate("/diary", { replace: true });
    } catch (e) {
      console.error("일기 삭제 실패", e);
      setDeleteOpen(false);
    }
  };

  const handlePdfConfirm = async () => {
    if (!diaryId) return;

    try {
      const res = await exportDiaryPdf(Number(diaryId));

      const link = document.createElement("a");
      link.href = res.pdfUrl;
      link.download = res.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setPdfOpen(false);
    } catch (e) {
      console.error("PDF 생성 실패", e);
      setPdfOpen(false);
    }
  };

  return (
    <>
      <header className="relative w-full bg-white flex items-center justify-center p-4">
        <button onClick={handleBack} className="absolute left-4 cursor-pointer">
          <MdArrowBackIosNew size={24} color="#B28C7E" />
        </button>

        <Logo className="mx-auto" />

        {rightIcon !== "none" && (
          <div className="absolute right-4">
            <button
              onClick={() => {
                if (rightIcon === "save") onSave?.();
                if (rightIcon === "menu") setOpen(prev => !prev);
              }}
              className="cursor-pointer"
            >
              {rightIcon === "save" && <SaveIcon />}
              {rightIcon === "menu" && <LuMenu size={24} color="#B28C7E" />}
            </button>

            {rightIcon === "menu" && (
              <MenuDropdown
                open={open}
                onClose={() => setOpen(false)}
                onEdit={handleEditDiary}
                onDelete={handleDeleteDiary}
                onExportPdf={handleExportPdf}
              />
            )}
          </div>
        )}
      </header>

      <DeleteModal
        isOpen={deleteOpen}
        type="diary"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteOpen(false)}
      />

      <PdfModal
        isOpen={pdfOpen}
        onConfirm={handlePdfConfirm}
        onClose={() => setPdfOpen(false)}
      />
    </>
  );
};

export default BackHeader;
