"use client";

import { useEffect, useRef, useState } from "react";

import { getClientHighlights, type HighlightItem } from "@/api/clientHighlights";
import { HighlightCard } from "@/components/HighlightCard";
import { HighlightOverlay } from "@/components/HighlightOverlay";

export function Highlights({
  highlights: providedHighlights,
}: { highlights?: HighlightItem[] } = {}) {
  const [highlights, setHighlights] = useState<HighlightItem[]>(
    providedHighlights ? [...providedHighlights].sort((a, b) => a.order - b.order) : [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightItem | null>(null);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    if (providedHighlights) {
      setHighlights([...providedHighlights].sort((a, b) => a.order - b.order));
      return;
    }
    const fetchHighlights = async () => {
      try {
        const data = await getClientHighlights();
        setHighlights(data.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error(error);
      }
    };

    void fetchHighlights();
  }, [providedHighlights]);

  if (highlights.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : highlights.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < highlights.length - 1 ? prev + 1 : 0));
  };

  const handleLearnMore = (highlight: HighlightItem) => {
    setSelectedHighlight(highlight);
  };

  const handleCloseOverlay = () => {
    setSelectedHighlight(null);
  };

  const handleDragStart = (x: number) => {
    dragStartX.current = x;
  };
  const handleDragEnd = (x: number) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - x;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrevious();
    dragStartX.current = null;
  };

  const getVisibleHighlights = () => {
    const prevIndex = currentIndex === 0 ? highlights.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === highlights.length - 1 ? 0 : currentIndex + 1;

    return [prevIndex, currentIndex, nextIndex];
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === highlights.length - 1;

  const offset = isFirst
    ? 0
    : isLast
      ? `calc(100% - 278px - 60px - ${currentIndex * 213}px)`
      : `calc(50% - 139px - ${currentIndex * 213}px - 30px)`;

  return (
    <section className="relative flex w-full flex-col items-center gap-[20px] md:gap-[50px] border-t border-[#f4f4f4] bg-white py-[50px] md:px-0 box-border overflow-hidden">
      <div className="flex w-full px-[30px] md:px-[100px] items-center justify-start">
        <h2 className="font-dm-sans text-[28px] md:text-[48px] font-medium leading-[150%] tracking-[-0.96px] text-[#172447]">
          Client Highlights
        </h2>
      </div>

      {/* Mobile swipe layout */}
      <div
        className="md:hidden w-full pb-[20px]"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      >
        <div
          className="flex items-center transition-transform duration-300 ease-in-out pl-[30px]"
          style={{ transform: `translateX(${offset})` }}
        >
          {highlights.map((highlight, i) => (
            <div key={highlight._id} className="shrink-0 mr-[4px]">
              <HighlightCard
                highlight={highlight}
                onLearnMore={handleLearnMore}
                onActivate={() => setCurrentIndex(i)}
                isActive={i === currentIndex}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop layout — arrows anchor to viewport edges below 1338px (when content no longer fits inline) */}
      <div className="hidden md:relative md:flex w-full items-center justify-center min-[1338px]:gap-[38px]">
        {/*
          At md–1337px: absolute, 20px from the left edge of this w-full container (= viewport edge).
          At 1338px+: back in flex flow alongside the cards.
          1338px = 45 + 38 + 322 + 30 + 468 + 30 + 322 + 38 + 45 (arrows + gaps + cards).
        */}
        <button
          className="flex h-[45px] w-[45px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[99px] bg-white p-0 text-[#1e1e1e] transition-all duration-200 ease-in-out hover:bg-[#f4f4f4] active:scale-95 z-10 md:absolute md:left-[20px] md:top-1/2 md:-translate-y-1/2 min-[1338px]:relative min-[1338px]:left-auto min-[1338px]:top-auto min-[1338px]:translate-y-0"
          onClick={handlePrevious}
          aria-label="Previous highlight"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="23"
            viewBox="0 0 14 23"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5758 0.549175C13.3081 1.28141 13.3081 2.46859 12.5758 3.20083L4.52665 11.25L12.5758 19.2992C13.3081 20.0314 13.3081 21.2186 12.5758 21.9508C11.8436 22.6831 10.6564 22.6831 9.92417 21.9508L0.549175 12.5758C-0.183058 11.8436 -0.183058 10.6564 0.549175 9.92417L9.92417 0.549175C10.6564 -0.183058 11.8436 -0.183058 12.5758 0.549175Z"
              fill="#1E1E1E"
            />
          </svg>
        </button>

        <div className="flex items-center justify-center gap-[30px]">
          {getVisibleHighlights().map((highlightIndex, position) => {
            const highlight = highlights[highlightIndex];
            const isActive = highlightIndex === currentIndex;

            return (
              <HighlightCard
                key={`${highlight._id}-${position}`}
                highlight={highlight}
                onLearnMore={handleLearnMore}
                onActivate={() => setCurrentIndex(highlightIndex)}
                isActive={isActive}
              />
            );
          })}
        </div>

        <button
          className="flex h-[45px] w-[45px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[99px] bg-white p-0 text-[#1e1e1e] transition-all duration-200 ease-in-out hover:bg-[#f4f4f4] active:scale-95 z-10 md:absolute md:right-[20px] md:top-1/2 md:-translate-y-1/2 min-[1338px]:relative min-[1338px]:right-auto min-[1338px]:top-auto min-[1338px]:translate-y-0"
          onClick={handleNext}
          aria-label="Next highlight"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
          >
            <rect width="45" height="45" rx="22.5" transform="matrix(-1 0 0 1 45 0)" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.4242 11.7992C16.6919 12.5314 16.6919 13.7186 17.4242 14.4508L25.4734 22.5L17.4242 30.5492C16.6919 31.2814 16.6919 32.4686 17.4242 33.2008C18.1564 33.9331 19.3436 33.9331 20.0758 33.2008L29.4508 23.8258C30.1831 23.0936 30.1831 21.9064 29.4508 21.1742L20.0758 11.7992C19.3436 11.0669 18.1564 11.0669 17.4242 11.7992Z"
              fill="#1E1E1E"
            />
          </svg>
        </button>
      </div>

      <div className="flex w-full items-center justify-center gap-[10px]">
        {highlights.map((_, index) => (
          <button
            key={index}
            className={`h-[2px] md:h-[5px] w-[48px] md:w-[125px] rounded-[2px] border-0 p-0 transition-all duration-200 ease-in-out ${
              index === currentIndex ? "bg-[#012060] opacity-100" : "bg-[#c7c7c7] hover:opacity-50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to highlight ${index + 1}`}
          />
        ))}
      </div>

      {selectedHighlight && (
        <HighlightOverlay highlight={selectedHighlight} onClose={handleCloseOverlay} />
      )}
    </section>
  );
}
