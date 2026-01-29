import Image from "next/image";

import styles from "./HighlightOverlay.module.css";

import type { Highlight } from "@/components/Highlights";

export type HighlightOverlayProps = {
  highlight: Highlight;
  onClose: () => void;
};

export function HighlightOverlay({ highlight, onClose }: HighlightOverlayProps) {
  const renderParagraph = (
    paragraph: { text: string; boldSegments?: Array<{ start: number; end: number }> },
    index: number,
  ) => {
    if (!paragraph.boldSegments || paragraph.boldSegments.length === 0) {
      return (
        <p key={index} className={styles.paragraph}>
          {paragraph.text}
        </p>
      );
    }

    const segments: Array<{ text: string; bold: boolean }> = [];
    let lastIndex = 0;

    paragraph.boldSegments
      .sort((a, b) => a.start - b.start)
      .forEach(({ start, end }) => {
        if (start > lastIndex) {
          segments.push({ text: paragraph.text.slice(lastIndex, start), bold: false });
        }
        segments.push({ text: paragraph.text.slice(start, end), bold: true });
        lastIndex = end;
      });

    if (lastIndex < paragraph.text.length) {
      segments.push({ text: paragraph.text.slice(lastIndex), bold: false });
    }

    return (
      <p key={index} className={styles.paragraph}>
        {segments.map((segment, i) =>
          segment.bold ? (
            <strong key={i}>{segment.text}</strong>
          ) : (
            <span key={i}>{segment.text}</span>
          ),
        )}
      </p>
    );
  };

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
        <div className={styles.contentWrapper}>
          <div className={styles.imageContainer}>
            <Image
              src={highlight.imageUrl}
              alt={highlight.quote}
              fill
              className={styles.image}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.textContent}>
            {highlight.fullTextParagraphs ? (
              highlight.fullTextParagraphs.map((paragraph, index) =>
                renderParagraph(paragraph, index),
              )
            ) : (
              <p className={styles.paragraph}>{highlight.fullText}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
