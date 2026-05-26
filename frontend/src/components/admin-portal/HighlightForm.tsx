import { useEffect, useRef } from "react";

import type { HighlightItem } from "@/api/clientHighlights";

type HighlightFormProps = {
  index: number;
  highlight: HighlightItem;
  isPrimary: boolean;
  onChange: (id: string, updated: Partial<HighlightItem>) => void;
  onMakePrimary: (id: string) => void;
};

const QUOTE_MAX_CHARS = 70;
const STORY_MAX_WORDS = 200;

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function getFirebaseFileName(url: string): string {
  try {
    const path = decodeURIComponent(new URL(url).pathname);
    const raw = path.split("/").pop() ?? url;
    return raw.replace(/^\d+-/, "");
  } catch {
    return url;
  }
}

export function HighlightForm({
  index,
  highlight,
  isPrimary,
  onChange,
  onMakePrimary,
}: HighlightFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storyRef = useRef<HTMLTextAreaElement | null>(null);
  const id = highlight._id ?? "";

  useEffect(() => {
    const el = storyRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [highlight.fullText]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onChange(id, { newImage: file, imageUrl: previewUrl });
    }
  };

  const handleRemoveImage = () => {
    onChange(id, { newImage: undefined, imageUrl: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, { quoteText: e.target.value });
  };

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (countWords(e.target.value) <= STORY_MAX_WORDS) {
      onChange(id, { fullText: e.target.value });
    }
  };

  const displayName =
    highlight.newImage?.name ??
    (highlight.imageUrl ? getFirebaseFileName(highlight.imageUrl) : null);

  const quoteLength = highlight.quoteText.length;
  const storyWordCount = countWords(highlight.fullText);
  const quoteAtLimit = quoteLength >= QUOTE_MAX_CHARS;
  const storyAtLimit = storyWordCount >= STORY_MAX_WORDS;

  return (
    <div className="flex flex-col gap-[25px] w-[585px]">
      <h2 className="font-dm-sans font-medium text-[24px] text-[#1E1E1E] tracking-[-0.48px]">
        Edit Client {index + 1}
      </h2>

      <div className="flex items-center justify-between">
        <label className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E]">
          Client Name:
        </label>
        <input
          aria-label={`Client ${index + 1} name`}
          value={highlight.clientName}
          onChange={(e) => onChange(id, { clientName: e.target.value })}
          className="bg-[#F4F4F4] border border-[#C7C7C7] px-[15px] py-[10px] rounded-[10px] w-[337px] font-dm-sans text-[16px] text-[#5D5D5D] outline-none focus:ring-1 focus:ring-blue-300"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="font-dm-sans font-bold text-[16px] text-[#1E1E1E]">Image:</label>
        {displayName ? (
          <div className="flex w-[337px] items-center gap-[10px] px-[15px] py-[10px]">
            <svg viewBox="0 0 24 24" fill="none" className="size-[24px] shrink-0">
              <path
                d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z"
                fill="#5D5D5D"
              />
            </svg>
            <span className="font-dm-sans text-[16px] text-[#5D5D5D] truncate">{displayName}</span>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="cursor-pointer ml-auto"
              aria-label="Remove image"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-[24px]">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="#5D5D5D"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-[337px] px-[15px] py-[10px] font-dm-sans text-[16px] text-[#5D5D5D] text-left cursor-pointer"
          >
            Select image...
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex gap-[25px] items-start">
        <div className="flex flex-1 flex-col py-[10px]">
          <span className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E] leading-[1.5]">
            Showcase:
          </span>
          <span className="font-dm-sans text-[12px] text-[#5D5D5D] leading-[16px]">
            Primary testimonial will show on Clients page and will start as the center testimonial
            in carousels.
          </span>
        </div>
        <div className="flex flex-col items-start px-[15px] py-[10px] w-[337px]">
          <button
            type="button"
            onClick={() => onMakePrimary(id)}
            className="flex gap-[5px] items-start cursor-pointer text-left w-full"
            aria-pressed={isPrimary}
          >
            <span className="shrink-0 size-[24px] flex items-center justify-center">
              <span
                className={`size-[16px] rounded-full border-[1.5px] flex items-center justify-center ${
                  isPrimary ? "border-[#1169B0]" : "border-[#C7C7C7]"
                }`}
              >
                {isPrimary && <span className="size-[8px] rounded-full bg-[#1169B0]" />}
              </span>
            </span>
            <span className="flex flex-1 flex-col">
              <span className="font-dm-sans text-[16px] text-[#1E1E1E] leading-[24px]">
                Primary
              </span>
              <span className="font-dm-sans text-[12px] text-[#5D5D5D] leading-[16px]">
                Selecting will deselect any other client&apos;s Primary selections
              </span>
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] items-end">
        <label className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E] w-full">
          Highlighted Quote/Title:
        </label>
        <span className="font-dm-sans text-[12px] text-[#5D5D5D] leading-[16px] w-full">
          Will be shown in the preview carousels bolded on the home page. Can be a quote (include
          quotation marks) or title.
        </span>
        <input
          aria-label={`Client ${index + 1} highlighted quote`}
          value={highlight.quoteText}
          maxLength={QUOTE_MAX_CHARS}
          onChange={handleQuoteChange}
          className={`bg-[#F4F4F4] border px-[15px] py-[10px] rounded-[10px] w-full font-dm-sans text-[16px] text-[#5D5D5D] outline-none focus:ring-1 ${
            quoteAtLimit
              ? "border-[#B93B3B] focus:ring-[#B93B3B]"
              : "border-[#C7C7C7] focus:ring-blue-300"
          }`}
        />
        <span
          className={`font-dm-sans text-[12px] leading-[16px] ${
            quoteAtLimit ? "text-[#B93B3B]" : "text-[#5D5D5D]"
          }`}
        >
          Characters: {quoteLength}/{QUOTE_MAX_CHARS}
        </span>
      </div>

      <div className="flex flex-col gap-[10px] items-end">
        <label className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E] w-full">
          Story:
        </label>
        <textarea
          ref={storyRef}
          aria-label={`Client ${index + 1} story`}
          value={highlight.fullText}
          onChange={handleStoryChange}
          rows={1}
          className={`bg-[#F4F4F4] border px-[15px] py-[10px] rounded-[10px] w-full font-dm-sans text-[16px] text-[#5D5D5D] outline-none focus:ring-1 resize-none overflow-hidden leading-[24px] ${
            storyAtLimit
              ? "border-[#B93B3B] focus:ring-[#B93B3B]"
              : "border-[#C7C7C7] focus:ring-blue-300"
          }`}
        />
        <span
          className={`font-dm-sans text-[12px] leading-[16px] ${
            storyAtLimit ? "text-[#B93B3B]" : "text-[#5D5D5D]"
          }`}
        >
          Words: {storyWordCount}/{STORY_MAX_WORDS}
        </span>
      </div>
    </div>
  );
}
