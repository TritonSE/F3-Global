"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getNewsletters, type Newsletter, type PaginatedNewsletters } from "@/api/newsletters";
import { AdminSidebar } from "@/components/admin-portal/AdminSidebar";
import { HeaderSection } from "@/components/admin-portal/HeaderSection";
import { auth } from "@/firebase/firebase";

const PAGE_SIZE = 5;
const NEWSLETTER_TABLE_GRID =
  "grid w-full grid-cols-[minmax(0,1.68fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(44px,0.42fr)]";

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

function SortIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px] shrink-0" aria-hidden="true">
      <path d="M6 3v14M6 3 3 6M6 3l3 3" stroke="#1E1E1E" strokeWidth="1.5" />
      <path d="M14 17V3m0 14 3-3m-3 3-3-3" stroke="#1E1E1E" strokeWidth="1.5" />
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

function cellClass(extra = "", featured = false) {
  return `flex h-[56px] min-w-0 items-center px-[14px] py-[10px] font-dm-sans text-[14px] leading-[20px] text-[#1E1E1E] ${
    featured ? "bg-[#EEF8FF]" : "bg-white"
  } ${extra}`;
}

function HeaderCell({
  icon,
  label,
  sortable,
}: {
  icon: React.ReactNode;
  label: string;
  sortable?: boolean;
}) {
  return (
    <div className="flex h-[56px] min-w-0 items-center gap-[8px] bg-[#F4F4F4] px-[14px] py-[10px] font-dm-sans text-[14px] font-bold uppercase leading-[20px] text-[#1E1E1E]">
      {icon}
      <span className="min-w-0 truncate">{label}</span>
      {sortable && (
        <span className="ml-auto flex shrink-0 items-center justify-center">
          <SortIcon />
        </span>
      )}
    </div>
  );
}

function NewsletterRow({ newsletter, featured }: { newsletter: Newsletter; featured: boolean }) {
  return (
    <div className={`${NEWSLETTER_TABLE_GRID} border-b border-[#C7C7C7]`}>
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
        <button type="button" aria-label={`Delete ${newsletter.title}`} className="cursor-pointer">
          <TrashIcon />
        </button>
      </div>
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
    getNewsletters({ page: currentPage, limit: PAGE_SIZE, search, sortBy: "newest" })
      .then((response) => {
        setList(response);
        setError(null);
      })
      .catch(() => setError("Failed to load newsletter articles."))
      .finally(() => setListLoading(false));
  }, [authLoading, currentPage, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const sortedNewsletters = useMemo(() => {
    return [...(list?.data ?? [])].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    });
  }, [list]);

  const totalPages = list?.pagination.pages ?? 1;
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  if (authLoading) return null;

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
                className="flex cursor-pointer items-center justify-center gap-[10px] rounded-[99px] bg-[#1169B0] px-[20px] py-[10px] font-dm-sans text-[16px] font-semibold text-white"
              >
                <PlusIcon />
                ADD NEW ARTICLE
              </button>
              <button
                type="button"
                onClick={() => router.push("/newsletters")}
                className="flex cursor-pointer items-center justify-center gap-[10px] rounded-[99px] bg-[#012060] px-[20px] py-[10px] font-dm-sans text-[16px] font-semibold text-white"
              >
                PREVIEW
                <EyeIcon />
              </button>
            </div>
          }
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
              <HeaderCell icon={<TextIcon />} label="Title" sortable />
              <HeaderCell icon={<BookIcon />} label="Text" />
              <HeaderCell icon={<CalendarIcon />} label="Date" sortable />
              <HeaderCell
                icon={<EyeIcon color="#1169B0" className="size-[20px] shrink-0" />}
                label="Views"
                sortable
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
    </div>
  );
}
