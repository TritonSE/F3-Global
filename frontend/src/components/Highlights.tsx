"use client";

import React, { useState } from "react";

import styles from "./Highlights.module.css";

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
    imageUrl: "/highlights/highlight-1.png",
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
        boldSegments: [{ start: 88, end: 127 }], // "there is a desert snack for everyone"
      },
      {
        text: "We're proud to feature Rule Breaker Snacks for their simple ingredient decks, inclusive approach to snacking, and a product experience that strives for great taste, because the best rule to break is the one that says you have to choose between better and delicious.",
      },
    ],
  },
  {
    id: "2",
    imageUrl: "/highlights/highlight-2.png",
    quote: "...lorem ipsum dolor sit amet, consectetur.",
    previewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "3",
    imageUrl: "/highlights/highlight-3.png",
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
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Client Highlights</h2>
      </div>

      <div className={styles.content}>
        <button
          className={styles.navButton}
          onClick={handlePrevious}
          aria-label="Previous highlight"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className={styles.cardsContainer}>
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

        <button className={styles.navButton} onClick={handleNext} aria-label="Next highlight">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className={styles.pagination}>
        {highlights.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationBar} ${index === currentIndex ? styles.active : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to highlight ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
