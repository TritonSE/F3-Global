type HeaderSectionProps = {
  title: string;
  tags: string[];
  description: string;
  onBack: () => void;
  onPreview?: () => void;
};

export function HeaderSection({ title, description, onBack, tags, onPreview }: HeaderSectionProps) {
  return (
    <header className="border-b border-[#C7C7C7] flex flex-col gap-[10px] items-start justify-center px-[100px] py-[50px]">
      <button
        type="button"
        aria-label="Go back to admin portal"
        onClick={onBack}
        className="group flex gap-[10px] items-center cursor-pointer py-[12px] pr-[15px] transition-transform duration-350 hover:-translate-x-2"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="#1e1e1e"
          className="size-[24px] transition-transform duration-350 group-hover:-translate-x-1"
        >
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        <span className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E]">BACK</span>
      </button>

      <div className="flex items-center justify-between w-full">
        <h1 className="font-dm-sans font-medium text-[32px] text-[#1E1E1E] tracking-[-0.64px]">
          {title}
        </h1>
        <button
          type="button"
          disabled
          className="bg-[#012060] flex gap-[10px] items-center justify-center px-[20px] py-[10px] rounded-[99px] cursor-pointer"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="white" className="size-[32px]">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <span className="font-dm-sans font-semibold text-[16px] text-white">PREVIEW</span>
        </button>
      </div>
      <div className="flex gap-[10px] w-full justify-start">
        {tags.map((tag) => (
          <div key={tag} className="self-start bg-[#F4F4F4] px-[10px] py-[5px] rounded-[10px]">
            <span className="font-dm-sans font-semibold text-[12px] text-[#5d5d5d]">{tag}</span>
          </div>
        ))}
      </div>

      <p className="font-dm-sans text-[14px] text-[#5D5D5D] leading-[20px]">{description}</p>
    </header>
  );
}
