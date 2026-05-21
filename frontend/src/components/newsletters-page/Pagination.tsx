"use client";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const buildPageList = (current: number, total: number): (number | "ellipsis")[] => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
};

const ChevronLeft = () => (
  <svg viewBox="0 0 32 32" fill="none" className="size-[20px] md:size-[32px]" aria-hidden>
    <path
      d="M19 8L11 16L19 24"
      stroke="#1e1e1e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 32 32" fill="none" className="size-[20px] md:size-[32px]" aria-hidden>
    <path
      d="M13 8L21 16L13 24"
      stroke="#1e1e1e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDoubleLeft = () => (
  <svg viewBox="0 0 32 32" fill="none" className="size-[20px] md:size-[32px]" aria-hidden>
    <path
      d="M22 8L14 16L22 24M16 8L8 16L16 24"
      stroke="#1e1e1e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDoubleRight = () => (
  <svg viewBox="0 0 32 32" fill="none" className="size-[20px] md:size-[32px]" aria-hidden>
    <path
      d="M10 8L18 16L10 24M16 8L24 16L16 24"
      stroke="#1e1e1e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;
  const pages = buildPageList(currentPage, totalPages);
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <nav
      style={{ fontFamily: "'Rubik', sans-serif" }}
      className="flex gap-[10px] md:gap-[20px] items-center justify-center"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={!canPrev}
        aria-label="First page"
        className="size-[20px] md:size-[32px] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:opacity-70 transition-opacity"
      >
        <ChevronDoubleLeft />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
        className="size-[20px] md:size-[32px] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:opacity-70 transition-opacity"
      >
        <ChevronLeft />
      </button>
      <ul className="flex gap-[5px] md:gap-[10px] items-center">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <li
              key={`e-${String(i)}`}
              className="size-[29px] flex items-center justify-center font-normal text-[12px] leading-[16px] md:text-[16px] md:leading-[24px] text-[#5d5d5d]"
              aria-hidden
            >
              ...
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onPageChange(p)}
                aria-label={`Page ${String(p)}`}
                aria-current={p === currentPage ? "page" : undefined}
                className={`size-[29px] flex items-center justify-center rounded-[99px] font-normal text-[12px] leading-[16px] md:text-[16px] md:leading-[24px] cursor-pointer transition-colors ${
                  p === currentPage
                    ? "bg-[#f4f4f4] text-[#1e1e1e]"
                    : "text-[#5d5d5d] hover:bg-[#f4f4f4]"
                }`}
              >
                {p}
              </button>
            </li>
          ),
        )}
      </ul>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNext}
        aria-label="Next page"
        className="size-[20px] md:size-[32px] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:opacity-70 transition-opacity"
      >
        <ChevronRight />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={!canNext}
        aria-label="Last page"
        className="size-[20px] md:size-[32px] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:opacity-70 transition-opacity"
      >
        <ChevronDoubleRight />
      </button>
    </nav>
  );
}
