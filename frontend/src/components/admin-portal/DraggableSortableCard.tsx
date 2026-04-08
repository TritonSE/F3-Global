"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

type DraggableCollegeCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  onDelete: (id: string) => void;
  onReplace: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function DraggableCollegeCard({
  id,
  name,
  imageUrl,
  onDelete,
  onReplace,
}: DraggableCollegeCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-[#C7C7C7] rounded-[10px] flex flex-col overflow-hidden p-[10px] gap-[10px] w-[314px] h-[250px]"
    >
      <div className="relative w-full h-[164px] group rounded-[9px] overflow-hidden flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={name}
          width={294}
          height={164}
          unoptimized
          className="object-contain w-full h-full"
        />
        <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={onReplace} />
          <p className="text-[16px] text-center text-white font-bold">REPLACE IMAGE</p>
        </label>
      </div>

      <div className="flex items-center p-[10px]">
        <button
          type="button"
          aria-label="Drag to reorder"
          className="text-[#C7C7C7] cursor-grab active:cursor-grabbing shrink-0"
          {...attributes}
          {...listeners}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <mask
              id="mask0_1681_2264"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="30"
              height="30"
            >
              <rect width="30" height="30" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1681_2264)">
              <path
                d="M11.25 25C10.5625 25 9.97396 24.7552 9.48438 24.2656C8.99479 23.776 8.75 23.1875 8.75 22.5C8.75 21.8125 8.99479 21.224 9.48438 20.7344C9.97396 20.2448 10.5625 20 11.25 20C11.9375 20 12.526 20.2448 13.0156 20.7344C13.5052 21.224 13.75 21.8125 13.75 22.5C13.75 23.1875 13.5052 23.776 13.0156 24.2656C12.526 24.7552 11.9375 25 11.25 25ZM18.75 25C18.0625 25 17.474 24.7552 16.9844 24.2656C16.4948 23.776 16.25 23.1875 16.25 22.5C16.25 21.8125 16.4948 21.224 16.9844 20.7344C17.474 20.2448 18.0625 20 18.75 20C19.4375 20 20.026 20.2448 20.5156 20.7344C21.0052 21.224 21.25 21.8125 21.25 22.5C21.25 23.1875 21.0052 23.776 20.5156 24.2656C20.026 24.7552 19.4375 25 18.75 25ZM11.25 17.5C10.5625 17.5 9.97396 17.2552 9.48438 16.7656C8.99479 16.276 8.75 15.6875 8.75 15C8.75 14.3125 8.99479 13.724 9.48438 13.2344C9.97396 12.7448 10.5625 12.5 11.25 12.5C11.9375 12.5 12.526 12.7448 13.0156 13.2344C13.5052 13.724 13.75 14.3125 13.75 15C13.75 15.6875 13.5052 16.276 13.0156 16.7656C12.526 17.2552 11.9375 17.5 11.25 17.5ZM18.75 17.5C18.0625 17.5 17.474 17.2552 16.9844 16.7656C16.4948 16.276 16.25 15.6875 16.25 15C16.25 14.3125 16.4948 13.724 16.9844 13.2344C17.474 12.7448 18.0625 12.5 18.75 12.5C19.4375 12.5 20.026 12.7448 20.5156 13.2344C21.0052 13.724 21.25 14.3125 21.25 15C21.25 15.6875 21.0052 16.276 20.5156 16.7656C20.026 17.2552 19.4375 17.5 18.75 17.5ZM11.25 10C10.5625 10 9.97396 9.75521 9.48438 9.26562C8.99479 8.77604 8.75 8.1875 8.75 7.5C8.75 6.8125 8.99479 6.22396 9.48438 5.73438C9.97396 5.24479 10.5625 5 11.25 5C11.9375 5 12.526 5.24479 13.0156 5.73438C13.5052 6.22396 13.75 6.8125 13.75 7.5C13.75 8.1875 13.5052 8.77604 13.0156 9.26562C12.526 9.75521 11.9375 10 11.25 10ZM18.75 10C18.0625 10 17.474 9.75521 16.9844 9.26562C16.4948 8.77604 16.25 8.1875 16.25 7.5C16.25 6.8125 16.4948 6.22396 16.9844 5.73438C17.474 5.24479 18.0625 5 18.75 5C19.4375 5 20.026 5.24479 20.5156 5.73438C21.0052 6.22396 21.25 6.8125 21.25 7.5C21.25 8.1875 21.0052 8.77604 20.5156 9.26562C20.026 9.75521 19.4375 10 18.75 10Z"
                fill="#C7C7C7"
              />
            </g>
          </svg>
        </button>
        <span className="font-dm-sans text-[24px] font-medium text-[#1E1E1E] px-[8px] truncate">
          {name}
        </span>
        <button
          type="button"
          aria-label={`Delete ${name}`}
          onClick={() => onDelete(id)}
          className="text-[#5D5D5D] hover:text-[#e05c5c] transition-colors shrink-0 cursor-pointer ml-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
}
