"use client";

import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { StorageReference } from "firebase/storage";
import type { ReactNode } from "react";

import {
  createNewsletter,
  deleteNewsletter,
  getNewsletters,
  type Newsletter,
  type NewsletterPayload,
  type PaginatedNewsletters,
  type SortBy,
  updateNewsletter,
} from "@/api/newsletters";
import { AddEditArticle, type ArticleFormValues } from "@/components/admin-portal/AddEditArticle";
import { AdminSidebar } from "@/components/admin-portal/AdminSidebar";
import { ConfirmationNotification } from "@/components/admin-portal/ConfirmationNotification";
import { HeaderSection } from "@/components/admin-portal/HeaderSection";
import { PreviewMode } from "@/components/admin-portal/preview-components/PreviewMode";
import { PreviewNavBar } from "@/components/admin-portal/preview-components/PreviewNavBar";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { auth } from "@/firebase/firebase";
import { rollbackUploads, uploadToStorage } from "@/utils/firebaseStorage";

const PAGE_SIZE = 5;
const NEWSLETTER_TABLE_GRID =
  "grid w-full grid-cols-[minmax(0,1.68fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(44px,0.42fr)]";
const SORT_ACTIVE_COLOR = "#1169B0";
const SORT_INACTIVE_COLOR = "#1E1E1E";

type NewsletterSortColumn = "title" | "date" | "views";
type NewsletterSortDirection = "desc" | "none" | "asc";
type NewsletterTableSort = {
  column: NewsletterSortColumn;
  direction: NewsletterSortDirection;
  nextDirection: Exclude<NewsletterSortDirection, "none">;
};

function getNextSort(
  current: NewsletterTableSort,
  column: NewsletterSortColumn,
): NewsletterTableSort {
  if (current.column !== column) {
    return { column, direction: "desc", nextDirection: "asc" };
  }

  if (current.direction === "none") {
    return {
      column,
      direction: current.nextDirection,
      nextDirection: current.nextDirection === "desc" ? "asc" : "desc",
    };
  }

  return {
    column,
    direction: "none",
    nextDirection: current.direction === "desc" ? "asc" : "desc",
  };
}

function sortToApiSort(sort: NewsletterTableSort): SortBy | undefined {
  if (sort.direction === "none") return "none";

  const key = `${sort.column}${sort.direction === "asc" ? "Asc" : "Desc"}`;
  return key as SortBy;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[32px] shrink-0" aria-hidden="true">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 5.303-12.803A7.5 7.5 0 0 1 10.5 18Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
        fill="#5D5D5D"
      />
      <path d="m15.3 16.7 4 4a1 1 0 0 0 1.4-1.4l-4-4a1 1 0 0 0-1.4 1.4Z" fill="#5D5D5D" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[24px] shrink-0" aria-hidden="true">
      <path d="M11 5h2v14h-2V5Z" fill="currentColor" />
      <path d="M5 11h14v2H5v-2Z" fill="currentColor" />
    </svg>
  );
}

function EyeIcon({
  color = "white",
  className = "size-[32px] shrink-0",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className} aria-hidden="true">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

function SortIcon({ direction }: { direction: NewsletterSortDirection | null }) {
  const upColor = direction === "asc" ? SORT_ACTIVE_COLOR : SORT_INACTIVE_COLOR;
  const downColor = direction === "desc" ? SORT_ACTIVE_COLOR : SORT_INACTIVE_COLOR;

  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px] shrink-0" aria-hidden="true">
      <path
        d="M6 3v14M6 3 3 6M6 3l3 3"
        stroke={upColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 17V3m0 14 3-3m-3 3-3-3"
        stroke={downColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px] shrink-0" aria-hidden="true">
      <path d="M5 5h10M10 5v10" stroke="#1169B0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px] shrink-0" aria-hidden="true">
      <path
        d="M4 4.5h4.5A2.5 2.5 0 0 1 11 7v9a2.5 2.5 0 0 0-2.5-2.5H4v-9Z"
        stroke="#1169B0"
        strokeWidth="1.5"
      />
      <path
        d="M16 4.5h-4.5A2.5 2.5 0 0 0 9 7v9a2.5 2.5 0 0 1 2.5-2.5H16v-9Z"
        stroke="#1169B0"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px] shrink-0" aria-hidden="true">
      <path
        d="M5 3v3M15 3v3M4 7h12M5 5h10a1 1 0 0 1 1 1v10H4V6a1 1 0 0 1 1-1Z"
        stroke="#1169B0"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px] shrink-0" aria-hidden="true">
      <path
        d="M8.5 11.5 11.5 8.5M8 6.5l1-1a3 3 0 0 1 4.2 4.2l-1 1M12 13.5l-1 1a3 3 0 0 1-4.2-4.2l1-1"
        stroke="#1169B0"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px] shrink-0" aria-hidden="true">
      <rect x="4" y="4" width="12" height="12" rx="1" stroke="#1169B0" strokeWidth="1.5" />
      <path d="m5.5 14 3.2-3.2 2 2 1.3-1.3 2.5 2.5" stroke="#1169B0" strokeWidth="1.5" />
      <circle cx="12.5" cy="7.5" r="1" fill="#1169B0" />
    </svg>
  );
}

function ToggleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px] shrink-0" aria-hidden="true">
      <rect x="2.5" y="6.25" width="15" height="7.5" rx="3.75" stroke="#1169B0" strokeWidth="1.5" />
      <circle cx="6.25" cy="10" r="1.75" stroke="#1169B0" strokeWidth="1.5" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[24px] shrink-0" aria-hidden="true">
      <path d="M7 3h7l5 5v13H7V3Z" stroke="#1E1E1E" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3v6h5" stroke="#1E1E1E" strokeWidth="1.8" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[20px] shrink-0" aria-hidden="true">
      <path d="M4 7h16M10 11v6M14 11v6" stroke="#5D5D5D" strokeWidth="1.7" />
      <path
        d="M6 7h12l-1 14H7L6 7Zm4-3h4l1 3H9l1-3Z"
        stroke="#5D5D5D"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PagerArrow({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: "first" | "prev" | "next" | "last";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  const path =
    direction === "prev"
      ? "M13 6 7 12l6 6"
      : direction === "next"
        ? "m11 6 6 6-6 6"
        : direction === "first"
          ? "M15 6 9 12l6 6M11 6 5 12l6 6"
          : "m9 6 6 6-6 6m4-12 6 6-6 6";

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-[32px] items-center justify-center text-[#1E1E1E] transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-[24px] shrink-0" aria-hidden="true">
        <path d={path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function buildPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

function fileNameFromUrl(value?: string) {
  if (!value) return "";
  const cleanUrl = value.split("?")[0] ?? value;
  const rawName = cleanUrl.split("/").pop() ?? "";
  const decoded = decodeURIComponent(rawName);
  return decoded.split("/").pop() || decoded || "image";
}

function formatPreviewDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

function cellClass(extra = "", featured = false) {
  return `flex h-[56px] min-w-0 items-center px-[14px] py-[10px] font-dm-sans text-[14px] leading-[20px] text-[#1E1E1E] ${
    featured ? "bg-[#EEF8FF]" : "bg-white"
  } ${extra}`;
}

function HeaderCell({
  icon,
  label,
  sortDirection,
  onSort,
}: {
  icon: React.ReactNode;
  label: string;
  sortDirection?: NewsletterSortDirection | null;
  onSort?: () => void;
}) {
  const ariaSort =
    sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : "none";

  return (
    <div
      role="columnheader"
      aria-sort={onSort ? ariaSort : undefined}
      className="flex h-[56px] min-w-0 items-center gap-[8px] bg-[#F4F4F4] px-[14px] py-[10px] font-dm-sans text-[14px] font-bold uppercase leading-[20px] text-[#1E1E1E]"
    >
      {icon}
      <span className="min-w-0 truncate">{label}</span>
      {onSort && (
        <button
          type="button"
          onClick={onSort}
          className="ml-auto flex shrink-0 cursor-pointer items-center justify-center"
          aria-label={`Sort ${label}`}
        >
          <SortIcon direction={sortDirection ?? null} />
        </button>
      )}
    </div>
  );
}

function NewsletterRow({
  newsletter,
  featured,
  onEdit,
  onDelete,
}: {
  newsletter: Newsletter;
  featured: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onEdit}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onEdit();
      }}
      className={`${NEWSLETTER_TABLE_GRID} w-full cursor-pointer border-b border-[#C7C7C7] text-left transition-opacity hover:opacity-90`}
    >
      <div className={cellClass("font-medium", featured)}>
        <span className="truncate">{newsletter.title}</span>
      </div>
      <div className={cellClass("", featured)}>
        <span className="truncate">{newsletter.blurb}</span>
      </div>
      <div className={cellClass("", featured)}>{formatDate(newsletter.uploadDate)}</div>
      <div className={cellClass("", featured)}>{newsletter.views}</div>
      <div className={cellClass("", featured)}>{newsletter.featured ? "Yes" : "No"}</div>
      <div className={cellClass("", featured)}>
        <span className="truncate">{newsletter.pdfUrl}</span>
      </div>
      <div className={cellClass("gap-[8px]", featured)}>
        <FileIcon />
        <span className="truncate">{fileNameFromUrl(newsletter.imageUrl)}</span>
      </div>
      <div className={cellClass("justify-center", featured)}>
        <button
          type="button"
          aria-label={`Delete ${newsletter.title}`}
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          className="cursor-pointer text-[#5D5D5D] hover:text-[#B93B3B]"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

function PreviewArticleMeta({
  newsletter,
  compact = false,
}: {
  newsletter: Newsletter;
  compact?: boolean;
}) {
  const textClass = compact
    ? "text-[12px] leading-[16px]"
    : "text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]";

  return (
    <div className="flex w-full items-center justify-between gap-[12px]">
      <div className="flex min-w-0 items-center gap-[8px]">
        <span className={`font-dm-sans font-normal text-[#5D5D5D] whitespace-nowrap ${textClass}`}>
          {formatPreviewDate(newsletter.uploadDate)}
        </span>
        <span className="size-[8px] rounded-full bg-[#A5D0F2] shrink-0" aria-hidden />
        <span className={`font-dm-sans font-normal text-[#5D5D5D] whitespace-nowrap ${textClass}`}>
          Article
        </span>
      </div>
      <span className={`font-dm-sans font-normal text-[#5D5D5D] whitespace-nowrap ${textClass}`}>
        {newsletter.views} {newsletter.views === 1 ? "view" : "views"}
      </span>
    </div>
  );
}

function NewsletterHomePreview({
  newsletters,
  onSelectArticle,
}: {
  newsletters: Newsletter[];
  onSelectArticle: (newsletter: Newsletter) => void;
}) {
  const featured = newsletters.find((newsletter) => newsletter.featured) ?? newsletters[0] ?? null;
  const articles = newsletters.filter((newsletter) => newsletter._id !== featured?._id).slice(0, 6);

  if (!featured) {
    return (
      <div className="flex h-[360px] items-center justify-center font-dm-sans text-[16px] text-[#5D5D5D]">
        No newsletter articles found.
      </div>
    );
  }

  return (
    <div className="flex h-[560px] flex-col overflow-y-auto bg-white">
      <section className="flex min-h-[430px] items-center justify-between gap-[50px] px-[80px] py-[50px]">
        <div className="flex w-[520px] shrink-0 flex-col items-start gap-[34px]">
          <div className="flex w-full flex-col gap-[16px]">
            <PreviewArticleMeta newsletter={featured} compact />
            <h1 className="font-ethic text-[52px] font-light leading-[1.1] text-[#1E1E1E]">
              {featured.title}
            </h1>
            <p className="line-clamp-4 w-full font-dm-sans text-[14px] leading-[20px] text-[#5D5D5D]">
              {featured.blurb}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectArticle(featured)}
            className="flex cursor-pointer items-center gap-[8px] py-[10px] pr-[12px] font-dm-sans text-[14px] font-semibold text-[#1E1E1E] hover:opacity-70"
          >
            Read More
            <Image src="/imgs/arrow_right_alt.svg" alt="" width={20} height={20} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => onSelectArticle(featured)}
          className="relative h-[315px] flex-1 cursor-pointer overflow-hidden rounded-[10px] bg-[#F4F4F4]"
        >
          <Image
            src={featured.imageUrl || "/imgs/components_placeholder.png"}
            alt={featured.title}
            fill
            className="object-cover"
            sizes="620px"
          />
        </button>
      </section>

      <section className="flex flex-col gap-[40px] px-[80px] pb-[60px] pt-[40px]">
        <div className="flex items-center justify-between">
          <div className="flex w-[421px] items-center gap-[8px] rounded-[99px] border border-[#C7C7C7] px-[20px] py-[10px]">
            <SearchIcon />
            <span className="font-rubik text-[16px] leading-[24px] text-[#5D5D5D]">
              Search by keyword...
            </span>
          </div>
          <div className="flex items-center gap-[10px] font-dm-sans text-[16px] text-[#5D5D5D]">
            <span>Sort by:</span>
            <span className="rounded-[99px] border border-[#C7C7C7] px-[20px] py-[10px] text-[#1E1E1E]">
              Most Recent
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-[24px] gap-y-[40px]">
          {articles.map((newsletter) => (
            <button
              key={newsletter._id}
              type="button"
              onClick={() => onSelectArticle(newsletter)}
              className="group flex cursor-pointer flex-col gap-[18px] text-left"
            >
              <div className="relative aspect-[415/302] w-full overflow-hidden rounded-[10px] bg-[#F4F4F4]">
                <Image
                  src={newsletter.imageUrl || "/imgs/components_placeholder.png"}
                  alt={newsletter.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="330px"
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <PreviewArticleMeta newsletter={newsletter} compact />
                <h3 className="line-clamp-3 font-dm-sans text-[20px] leading-[28px] text-[#1E1E1E] group-hover:underline">
                  {newsletter.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[22px]" aria-hidden="true">
      <path
        d="M18 8a3 3 0 1 0-2.82-4H15a3 3 0 0 0 .18 1L8.9 8.63a3 3 0 1 0 0 6.74L15.18 19A3 3 0 1 0 16 17.27l-6.28-3.63a3.1 3.1 0 0 0 0-3.28L16 6.73A2.99 2.99 0 0 0 18 8Z"
        fill="#1E1E1E"
      />
    </svg>
  );
}

function NewsletterArticlePreview({
  newsletter,
  onBackToList,
}: {
  newsletter: Newsletter;
  onBackToList: () => void;
}) {
  const formattedDate = formatPreviewDate(newsletter.uploadDate);

  return (
    <div className="flex h-[560px] flex-col overflow-y-auto bg-white pb-[50px]">
      <div className="px-[80px] pb-[12px] pt-[32px]">
        <button
          type="button"
          onClick={onBackToList}
          className="group flex cursor-pointer items-center gap-[10px] py-[8px] pr-[15px] text-[#1E1E1E]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-[24px]" aria-hidden="true">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span className="font-rubik text-[16px] transition-transform duration-200 group-hover:translate-x-[6px]">
            Back
          </span>
        </button>
      </div>

      <section className="flex flex-col gap-[22px] px-[135px] pb-[34px] pt-[12px]">
        <div className="flex flex-col">
          <span className="font-rubik text-[14px] leading-[20px] text-[#5D5D5D]">Article</span>
          <h1 className="font-ethic text-[52px] font-light leading-[1.35] text-[#172447]">
            {newsletter.title}
          </h1>
        </div>
        <div className="flex items-center gap-[8px] font-dm-sans text-[14px] leading-[20px] text-[#5D5D5D]">
          <span>Posted on {formattedDate}</span>
          <span className="size-[8px] rounded-full bg-[#A5D0F2]" aria-hidden />
          <button
            type="button"
            className="flex cursor-pointer items-center gap-[8px] text-[#1E1E1E] hover:underline"
          >
            Share
            <ShareIcon />
          </button>
        </div>
      </section>

      <div className="px-[135px] pb-[36px]">
        <div className="relative h-[300px] w-full overflow-hidden rounded-[10px] bg-[#F4F4F4]">
          <Image
            src={newsletter.imageUrl || "/imgs/components_placeholder.png"}
            alt={newsletter.title}
            fill
            className="object-cover"
            sizes="900px"
          />
        </div>
      </div>

      <section className="flex flex-col gap-[18px] px-[135px]">
        <h2 className="font-dm-sans text-[28px] font-bold leading-[1.5] tracking-[-0.56px] text-[#1E1E1E]">
          Summary
        </h2>
        <p className="font-dm-sans text-[16px] leading-[24px] text-[#1E1E1E]">{newsletter.blurb}</p>
        <a
          href={newsletter.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[8px] w-fit rounded-[99px] bg-[#172447] px-[20px] py-[12px] font-dm-sans text-[14px] font-semibold text-white hover:bg-[#1169B0]"
        >
          READ FULL ARTICLE
        </a>
      </section>
    </div>
  );
}

export default function NewsletterArticlesEditor() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);
  const [list, setList] = useState<PaginatedNewsletters | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableSort, setTableSort] = useState<NewsletterTableSort>({
    column: "date",
    direction: "none",
    nextDirection: "desc",
  });
  const [articleEditorOpen, setArticleEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Newsletter | null>(null);
  const [pendingDeleteArticle, setPendingDeleteArticle] = useState<Newsletter | null>(null);
  const [articleSaving, setArticleSaving] = useState(false);
  const [toast, setToast] = useState<ReactNode | null>(null);
  const [toastFading, setToastFading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [previewNewsletterId, setPreviewNewsletterId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (authLoading) return;
    setListLoading(true);
    getNewsletters({
      page: currentPage,
      limit: PAGE_SIZE,
      search,
      sortBy: sortToApiSort(tableSort),
    })
      .then((response) => {
        setList(response);
        setError(null);
      })
      .catch(() => setError("Failed to load newsletter articles."))
      .finally(() => setListLoading(false));
  }, [authLoading, currentPage, search, tableSort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const sortedNewsletters = list?.data ?? [];

  function handleSort(column: NewsletterSortColumn) {
    setCurrentPage(1);
    setTableSort((current) => getNextSort(current, column));
  }

  function getSortDirection(column: NewsletterSortColumn): NewsletterSortDirection | null {
    return tableSort.column === column ? tableSort.direction : null;
  }

  const totalPages = list?.pagination.pages ?? 1;
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;
  const previewNewsletter =
    sortedNewsletters.find((newsletter) => newsletter._id === previewNewsletterId) ?? null;

  function showToast(message: ReactNode) {
    setToast(message);
    setToastFading(false);
    setTimeout(() => setToastFading(true), 3000);
    setTimeout(() => setToast(null), 4500);
  }

  function closeArticleEditor() {
    if (articleSaving) return;
    setArticleEditorOpen(false);
    setEditingArticle(null);
  }

  async function refreshNewsletters(page = currentPage) {
    const response = await getNewsletters({
      page,
      limit: PAGE_SIZE,
      search,
      sortBy: sortToApiSort(tableSort),
    });
    setList(response);
    setError(null);
  }

  async function handleSubmitArticle(values: ArticleFormValues) {
    setArticleSaving(true);
    const uploadedRefs: StorageReference[] = [];

    try {
      let imageUrl = values.imageUrl;
      if (values.newImage) {
        imageUrl = await uploadToStorage(
          values.newImage,
          `newsletters/images/${Date.now()}-${values.newImage.name}`,
          uploadedRefs,
        );
      }

      let pdfUrl = values.pdfUrl;
      if (values.newPdf) {
        pdfUrl = await uploadToStorage(
          values.newPdf,
          `newsletters/pdfs/${Date.now()}-${values.newPdf.name}`,
          uploadedRefs,
        );
      }

      const payload: NewsletterPayload = {
        title: values.title,
        uploadDate: values.uploadDate,
        views: values.views,
        blurb: values.blurb,
        pdfUrl,
        imageUrl,
        featured: values.featured,
      };

      if (editingArticle) {
        const saved = await updateNewsletter(editingArticle._id, payload);
        await refreshNewsletters();
        showToast(
          <>
            <strong className="font-bold">{saved.title}</strong> article has been edited
            successfully.
          </>,
        );
      } else {
        const saved = await createNewsletter(payload);
        setCurrentPage(1);
        await refreshNewsletters(1);
        showToast(
          <>
            <strong className="font-bold">{saved.title}</strong> article has been added
            successfully.
          </>,
        );
      }

      setArticleEditorOpen(false);
      setEditingArticle(null);
    } catch (submitError) {
      console.error("Failed to save newsletter article:", submitError);
      await rollbackUploads(uploadedRefs);
      setError("Failed to save newsletter article.");
    } finally {
      setArticleSaving(false);
    }
  }

  async function handleConfirmDeleteArticle() {
    if (!pendingDeleteArticle) return;
    setArticleSaving(true);

    try {
      await deleteNewsletter(pendingDeleteArticle._id);
      await refreshNewsletters();
      showToast(
        <>
          <strong className="font-bold">{pendingDeleteArticle.title}</strong> article has been
          deleted successfully.
        </>,
      );
      if (editingArticle?._id === pendingDeleteArticle._id) {
        setArticleEditorOpen(false);
        setEditingArticle(null);
      }
      setPendingDeleteArticle(null);
    } catch (deleteError) {
      console.error("Failed to delete newsletter article:", deleteError);
      setError("Failed to delete newsletter article.");
    } finally {
      setArticleSaving(false);
    }
  }

  if (authLoading) return null;

  if (isPreview) {
    return (
      <PreviewMode
        onBack={() => {
          setIsPreview(false);
          setPreviewNewsletterId(null);
        }}
        publishButton={<></>}
      >
        <div className="w-full overflow-hidden rounded-[10px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)]">
          <PreviewNavBar activeItem="Newsletter" />
          {listLoading ? (
            <div className="flex h-[560px] items-center justify-center font-dm-sans text-[16px] text-[#5D5D5D]">
              Loading newsletter preview...
            </div>
          ) : previewNewsletter ? (
            <NewsletterArticlePreview
              newsletter={previewNewsletter}
              onBackToList={() => setPreviewNewsletterId(null)}
            />
          ) : (
            <NewsletterHomePreview
              newsletters={sortedNewsletters}
              onSelectArticle={(newsletter) => setPreviewNewsletterId(newsletter._id)}
            />
          )}
        </div>
      </PreviewMode>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminSidebar />
      <main className="ml-[203px] min-h-screen">
        <HeaderSection
          title="Edit Newsletter Articles"
          tags={["NEWSLETTER"]}
          description="Add or remove newsletter articles, or edit information including the newsletter external PDF link and summary. Track how many views each article has. By default, articles appear sorted by date of upload, and the Featured article is always sticky to the top."
          onBack={() => router.push("/admin-portal")}
          actions={
            <div className="flex items-center gap-[14px]">
              <button
                type="button"
                onClick={() => {
                  setEditingArticle(null);
                  setArticleEditorOpen(true);
                }}
                className="flex cursor-pointer items-center justify-center gap-[10px] rounded-[99px] bg-[#1169B0] px-[20px] py-[10px] font-dm-sans text-[16px] font-semibold text-white"
              >
                <PlusIcon />
                ADD NEW ARTICLE
              </button>
              <button
                type="button"
                onClick={() => {
                  setPreviewNewsletterId(null);
                  setIsPreview(true);
                }}
                className="flex cursor-pointer items-center justify-center gap-[10px] rounded-[99px] bg-[#012060] px-[20px] py-[10px] font-dm-sans text-[16px] font-semibold text-white"
              >
                PREVIEW
                <EyeIcon />
              </button>
            </div>
          }
        />
        <ConfirmationNotification
          message={toast}
          fading={toastFading}
          onDismiss={() => setToast(null)}
        />

        <section className="flex flex-col gap-[20px] px-[50px] py-[50px] xl:px-[100px]">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSearch(searchInput.trim());
              setCurrentPage(1);
            }}
            className="flex w-[421px] items-center gap-[8px] rounded-[99px] border border-[#C7C7C7] px-[20px] py-[10px]"
          >
            <SearchIcon />
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by keyword..."
              className="w-full bg-transparent font-rubik text-[16px] leading-[24px] text-[#1E1E1E] outline-none placeholder:text-[#5D5D5D]"
            />
          </form>

          <div className="w-full overflow-hidden rounded-[16px] border border-[#C7C7C7]">
            <div className={`${NEWSLETTER_TABLE_GRID} overflow-hidden rounded-t-[16px]`}>
              <HeaderCell
                icon={<TextIcon />}
                label="Title"
                sortDirection={getSortDirection("title")}
                onSort={() => handleSort("title")}
              />
              <HeaderCell icon={<BookIcon />} label="Text" />
              <HeaderCell
                icon={<CalendarIcon />}
                label="Date"
                sortDirection={getSortDirection("date")}
                onSort={() => handleSort("date")}
              />
              <HeaderCell
                icon={<EyeIcon color="#1169B0" className="size-[20px] shrink-0" />}
                label="Views"
                sortDirection={getSortDirection("views")}
                onSort={() => handleSort("views")}
              />
              <HeaderCell icon={<ToggleIcon />} label="Feature" />
              <HeaderCell icon={<LinkIcon />} label="Link" />
              <HeaderCell icon={<PhotoIcon />} label="Photo" />
              <div className="h-[56px] bg-[#F4F4F4]" />
            </div>

            {listLoading ? (
              <div className="flex h-[280px] w-full items-center justify-center font-dm-sans text-[16px] text-[#5D5D5D]">
                Loading newsletter articles...
              </div>
            ) : error ? (
              <div className="flex h-[280px] w-full items-center justify-center font-dm-sans text-[16px] text-[#B93B3B]">
                {error}
              </div>
            ) : sortedNewsletters.length === 0 ? (
              <div className="flex h-[280px] w-full items-center justify-center font-dm-sans text-[16px] text-[#5D5D5D]">
                No newsletter articles found.
              </div>
            ) : (
              sortedNewsletters.map((newsletter) => (
                <NewsletterRow
                  key={newsletter._id}
                  newsletter={newsletter}
                  featured={newsletter.featured}
                  onEdit={() => {
                    setEditingArticle(newsletter);
                    setArticleEditorOpen(true);
                  }}
                  onDelete={() => setPendingDeleteArticle(newsletter)}
                />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-[10px] flex items-center justify-center gap-[20px] font-rubik"
              aria-label="Newsletter table pagination"
            >
              <PagerArrow
                direction="first"
                disabled={!canPrev}
                onClick={() => setCurrentPage(1)}
                label="First page"
              />
              <PagerArrow
                direction="prev"
                disabled={!canPrev}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                label="Previous page"
              />
              <div className="flex items-center gap-[10px]">
                {buildPageList(currentPage, totalPages).map((page, index) =>
                  page === "ellipsis" ? (
                    <span
                      key={`ellipsis-${String(index)}`}
                      className="flex size-[29px] items-center justify-center text-[16px] leading-[24px] text-[#5D5D5D]"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      aria-current={page === currentPage ? "page" : undefined}
                      className={`flex size-[29px] cursor-pointer items-center justify-center rounded-[99px] text-[16px] leading-[24px] ${
                        page === currentPage ? "bg-[#F4F4F4] text-[#1E1E1E]" : "text-[#5D5D5D]"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>
              <PagerArrow
                direction="next"
                disabled={!canNext}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                label="Next page"
              />
              <PagerArrow
                direction="last"
                disabled={!canNext}
                onClick={() => setCurrentPage(totalPages)}
                label="Last page"
              />
            </nav>
          )}
        </section>
      </main>

      {articleEditorOpen && (
        <AddEditArticle
          article={editingArticle}
          saving={articleSaving}
          onCancel={closeArticleEditor}
          onSubmit={(values) => {
            void handleSubmitArticle(values);
          }}
        />
      )}
      <ConfirmationDialog
        open={pendingDeleteArticle !== null}
        onClose={() => {
          if (articleSaving) return;
          setPendingDeleteArticle(null);
        }}
        title="Delete Article?"
        body="Are you sure you want to delete this newsletter article? This action cannot be undone."
        cancelLabel="Cancel"
        confirmLabel={articleSaving ? "DELETING..." : "YES, DELETE"}
        onConfirm={() => {
          void handleConfirmDeleteArticle();
        }}
      />
    </div>
  );
}
