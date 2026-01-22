import Image from "next/image";

import styles from "./HighlightOverlay.module.css";

import type { Highlight } from "@/components/Highlights";

export type HighlightOverlayProps = {
  highlight: Highlight;
  onClose: () => void;
};

export function HighlightOverlay({ highlight, onClose }: HighlightOverlayProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div className={styles.imageContainer}>
          <Image
            src={highlight.imageUrl}
            alt={highlight.quote}
            className={styles.image}
            fill
            priority
          />
          <div className={styles.gradient} />
          <div className={styles.quoteIcon}>"</div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.quote}>"{highlight.quote}"</h3>
          <p className={styles.fullText}>{highlight.fullText}</p>
        </div>
      </div>
    </div>
  );
}
