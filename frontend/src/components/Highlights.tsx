"use client";

import React, { useState } from "react";

import { HighlightCard } from "@/components/HighlightCard";
import { HighlightOverlay } from "@/components/HighlightOverlay";

export type Highlight = {
  id: string;
  imageUrl: string;
  quote: string;
  previewText: string;
  fullText: string;
  fullTextParagraphs?: Array<{
    text: string;
    boldSegments?: Array<{ start: number; end: number }>;
  }>;
};

const highlights: Highlight[] = [
  {
    id: "1",
    imageUrl: "/imgs/highlights/highlight-1.png",
    quote: "...there is a desert snack for everyone...",
    previewText: "Rule Breaker Snacks is challenging what normal desserts are considered...",
    fullText:
      "Rule Breaker Snacks is challenging what normal desserts are considered with soft-baked treats that include chickpeas first and taste like the brownies and blondies many grew up enjoying, minus the ingredients many people avoid.",
    fullTextParagraphs: [
      {
        text: "Rule Breaker Snacks is challenging what normal desserts are considered with soft-baked treats that include chickpeas first and taste like the brownies and blondies many grew up enjoying, minus the ingredients many people avoid. Every bite is certified gluten-free, vegan, and made without nuts, dairy, eggs, or soy, making them a school-safe option for families and anyone with dietary needs. Their product catalog contains full-size Brownies and Blondies, snackable Bites, and kid-friendly junior bites, plus seasonal flavors that keep the brand fresh and dynamic....",
        boldSegments: [{ start: 0, end: 19 }], // "Rule Breaker Snacks"
      },
      {
        text: "Behind the scenes, Rule Breaker is operated passionately on the foundation that there is a desert snack for everyone, while the brand keeps strong creative control over recipes and quality. You'll find them online and in thousands of grocery doors nationwide, giving proof that better-for-you can also be great in taste.",
        boldSegments: [{ start: 80, end: 116 }], // "there is a desert snack for everyone"
      },
      {
        text: "We're proud to feature Rule Breaker Snacks for their simple ingredient decks, inclusive approach to snacking, and a product experience that strives for great taste, because the best rule to break is the one that says you have to choose between better and delicious.",
      },
    ],
  },
  {
    id: "2",
    imageUrl: "/imgs/highlights/highlight-2.png",
    quote: "...lorem ipsum dolor sit amet, consectetur.",
    previewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "3",
    imageUrl: "/imgs/highlights/highlight-3.png",
    quote: "...lorem ipsum dolor sit amet, consectetur.",
    previewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export function Highlights() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : highlights.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < highlights.length - 1 ? prev + 1 : 0));
  };

  const handleLearnMore = (highlight: Highlight) => {
    setSelectedHighlight(highlight);
  };

  const handleCloseOverlay = () => {
    setSelectedHighlight(null);
  };

  const getVisibleHighlights = () => {
    const prevIndex = currentIndex === 0 ? highlights.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === highlights.length - 1 ? 0 : currentIndex + 1;

    return [prevIndex, currentIndex, nextIndex];
  };

  return (
    <section className="relative flex w-full flex-col items-center gap-[50px] border-t border-[#f4f4f4] bg-white py-[50px] box-border">
      <div className="flex w-[1309px] items-center justify-start">
        <h2 className="font-dm-sans text-[48px] font-medium leading-[150%] tracking-[-0.96px] text-[#172447]">
          Client Highlights
        </h2>
      </div>

      <div className="relative flex w-full items-center justify-center gap-[38px]">
        <button
          className="flex h-[45px] w-[45px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[99px] bg-white p-0 text-[#1e1e1e] transition-all duration-200 ease-in-out hover:bg-[#f4f4f4] active:scale-95"
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
              fill-rule="evenodd"
              clip-rule="evenodd"
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
                key={`${highlight.id}-${position}`}
                highlight={highlight}
                onLearnMore={handleLearnMore}
                onActivate={() => setCurrentIndex(highlightIndex)}
                isActive={isActive}
              />
            );
          })}
        </div>

        {selectedHighlight && (
          <HighlightOverlay highlight={selectedHighlight} onClose={handleCloseOverlay} />
        )}

        <button
          className="flex h-[45px] w-[45px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[99px] bg-white p-0 text-[#1e1e1e] transition-all duration-200 ease-in-out hover:bg-[#f4f4f4] active:scale-95"
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
              fill-rule="evenodd"
              clip-rule="evenodd"
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
            className={`h-[5px] w-[125px] rounded-[2px] border-0 p-0 transition-all duration-200 ease-in-out ${
              index === currentIndex ? "bg-[#012060] opacity-100" : "bg-[#c7c7c7] hover:opacity-50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to highlight ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
