import Image from "next/image";
import React from "react";

import styles from "./HighlightCard.module.css";

import type { Highlight } from "@/components/Highlights";

export type HighlightCardProps = {
  highlight: Highlight;
  onLearnMore: (highlight: Highlight) => void;
  isActive?: boolean;
  onActivate?: () => void;
};

export function HighlightCard({
  highlight,
  onLearnMore,
  onActivate,
  isActive = false,
}: HighlightCardProps) {
  const handleCardClick = () => {
    if (!isActive) {
      onActivate?.();
    }
  };

  const handleLearnMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isActive) {
      event.stopPropagation();
      onLearnMore(highlight);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isActive && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onActivate?.();
    }
  };

  return (
    <div
      className={`${styles.card} ${!isActive ? styles.inactive : ""}`}
      role={!isActive ? "button" : undefined}
      tabIndex={!isActive ? 0 : -1}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-pressed={isActive}
    >
      <div className={styles.imageContainer}>
        <Image src={highlight.imageUrl} alt={highlight.quote} className={styles.image} fill />
        <div className={styles.gradient} />
        <div className={styles.quoteIcon}>"</div>
      </div>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <p className={styles.quote}>"{highlight.quote}"</p>
          <p className={styles.previewText}>{highlight.previewText}</p>
        </div>
        <button className={styles.learnMoreButton} type="button" onClick={handleLearnMoreClick}>
          <span>Learn More</span>
          <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
