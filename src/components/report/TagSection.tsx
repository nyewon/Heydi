const TagSection = () => {
  const tags = ["운동", "프로젝트", "학교", "점심", "회의"];

  return (
    <div className="w-full mb-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-[#EFE8E1] rounded-lg text-xs text-[#76615A] font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagSection;
