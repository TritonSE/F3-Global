"use client";
import { type ReactNode, useEffect, useRef, useState } from "react";

type BackgroundProps = {
  children: ReactNode;
  className?: string;
};

const Background = ({ children, className = "" }: BackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lockedTop, setLockedTop] = useState(0);

  useEffect(() => {
    const step5Element = document.getElementById("step-5");
    if (!step5Element || !containerRef.current) return;

    const handleScroll = () => {
      const step5Title = step5Element.querySelector("h1");
      if (!step5Title) return;

      const step5Rect = step5Title.getBoundingClientRect();
      const titleOffset = 320;

      if (step5Rect.top <= titleOffset && !isLocked) {
        const containerRect = containerRef.current!.getBoundingClientRect();
        const titleElement = titleRef.current;

        if (titleElement) {
          const titleRect = titleElement.getBoundingClientRect();
          const relativeTop = titleRect.top - containerRect.top;
          setLockedTop(relativeTop);
          setIsLocked(true);
        }
      } else if (step5Rect.top > titleOffset && isLocked) {
        setIsLocked(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLocked]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full md:bg-[linear-gradient(0deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.60)_100%),url('/imgs/donors.webp')] md:bg-cover md:bg-center md:bg-fixed md:bg-no-repeat ${className}`}
    >
      <div className="pointer-events-none sticky top-0 z-0 -mb-[100vh] h-screen bg-[linear-gradient(0deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.60)_100%),url('/imgs/donors.webp')] bg-no-repeat [background-position:54%_top] [background-size:auto_100%] md:hidden" />
      <div
        className="hidden md:block"
        style={{
          position: isLocked ? "absolute" : "sticky",
          top: isLocked ? lockedTop : 200,
          height: isLocked ? "auto" : "0",
          zIndex: 10,
        }}
      >
        <div
          ref={titleRef}
          className="pointer-events-none select-none flex text-white text-center font-dm-sans text-[48px] font-medium leading-[150%] tracking-[-0.96px] pt-[200px] pl-[100px]"
        >
          <span>How You Can Help</span>
        </div>
      </div>

      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default Background;
