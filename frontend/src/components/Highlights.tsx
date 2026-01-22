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
};

export type HighlightsProps = {
  highlights: Highlight[];
};

export function Highlights({ highlights }: HighlightsProps) {
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
        <div className={styles.navigation}>
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
          <button className={styles.navButton} onClick={handleNext} aria-label="Next highlight">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.content}>
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

        <div className={styles.pagination}>
          {highlights.map((_, index) => (
            <button
              key={index}
              className={`${styles.paginationDot} ${index === currentIndex ? styles.active : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to highlight ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedHighlight && (
        <HighlightOverlay highlight={selectedHighlight} onClose={handleCloseOverlay} />
      )}
    </section>
  );
}
