import { useEffect, useRef } from "react";

import type { TimelineItem } from "@/api/timeline";

type TimelineCardProps = {
  index: number;
  item: TimelineItem;
  onChange: (id: string, updated: Partial<TimelineItem>) => void;
};

const MAX_CHARS = 200;

function getFirebaseFileName(url: string): string {
  const path = decodeURIComponent(new URL(url).pathname);
  const raw = path.split("/").pop() ?? url;
  return raw.replace(/^\d+-/, "");
}

export function TimelineCard({ index, item, onChange }: TimelineCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [item.description]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(item._id, { newImage: file });
  };

  const handleRemoveImage = () => {
    onChange(item._id, { newImage: undefined, imageUrl: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const displayName =
    item.newImage?.name ?? (item.imageUrl ? getFirebaseFileName(item.imageUrl) : null);

  return (
    <div className="flex flex-col gap-[25px] w-[585px] justify-center">
      <h2 className="text-[24px] font-medium text-[#1E1E1E] -tracking-[0.48px]">
        Timeline {index + 1}
      </h2>

      <div className="flex items-center">
        <label className="text-[16px] font-semibold text-[#1E1E1E]">Year:</label>
        <input
          value={item.year}
          onChange={(e) => onChange(item._id, { year: Number(e.target.value) })}
          className="flex ml-auto w-[337px] bg-[#F4F4F4] border-[#C7C7C7] border-[1px] rounded-[10px] py-[10px] px-[15px] text-[#5D5D5D] leading-[24px] outline-none focus:ring-1 focus:ring-blue-300"
        />
      </div>

      <div className="flex flex-col gap-[10px]">
        <label className="text-[16px] font-semibold text-[#1E1E1E]">Description:</label>
        <textarea
          ref={textareaRef}
          value={item.description}
          maxLength={MAX_CHARS}
          onChange={(e) => onChange(item._id, { description: e.target.value })}
          rows={1}
          className={`w-full bg-[#F4F4F4] border-[1px] rounded-[10px] py-[10px] px-[15px] text-[#5D5D5D] leading-[24px] outline-none focus:ring-1 resize-none overflow-hidden ${
            item.description.length >= MAX_CHARS
              ? "border-[#B93B3B] focus:ring-[#B93B3B]"
              : "border-[#C7C7C7] focus:ring-blue-300"
          }`}
        />
        <p
          className={`text-right text-[12px] leading-[16px] ${
            item.description.length >= MAX_CHARS ? "text-[#B93B3B]" : "text-[#5D5D5D]"
          }`}
        >
          Characters: {item.description.length}/{MAX_CHARS}
        </p>
      </div>

      <div className="flex items-center">
        <label className="text-[16px] text-[#1E1E1E] font-bold mr-auto">Image:</label>
        {displayName ? (
          <div className="flex w-[337px] items-center gap-[10px] px-[15px] py-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_2273_4118"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_2273_4118)">
                <path
                  d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z"
                  fill="#5D5D5D"
                />
              </g>
            </svg>
            <span className="text-[16px] text-[#5D5D5D]">{displayName}</span>
            <button onClick={handleRemoveImage} className="cursor-pointer ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L10.5858 12L7.29289 15.2929C6.90237 15.6834 6.90237 16.3166 7.29289 16.7071C7.68342 17.0976 8.31658 17.0976 8.70711 16.7071L12 13.4142L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L13.4142 12L16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289C16.3166 6.90237 15.6834 6.90237 15.2929 7.29289L12 10.5858L8.70711 7.29289Z"
                  fill="#5D5D5D"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-[337px] px-[15px] py-[10px] text-[16px] text-[#5D5D5D] text-left cursor-pointer"
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

      {index !== 4 && <div className="w-[555px] border-b-[1px] border-[#C7C7C7]" />}
    </div>
  );
}
