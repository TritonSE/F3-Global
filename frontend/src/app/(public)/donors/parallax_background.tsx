"use client";
import { useEffect, useRef, useState } from "react";

type BackgroundProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Background = ({ children, style }: BackgroundProps) => {
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
      const titleOffset = 200;

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
      className="relative w-full bg-[url('/imgs/donors.png')] bg-cover bg-no-repeat bg-center"
      style={{
        backgroundAttachment: "fixed",
        ...style,
      }}
    >
      <div
        style={{
          position: isLocked ? "absolute" : "sticky",
          top: isLocked ? lockedTop : 0,
          height: isLocked ? "auto" : "0",
          zIndex: 10,
        }}
      >
        <div
          ref={titleRef}
          className="pointer-events-none select-none flex text-white text-center font-['DM_Sans'] text-[48px] font-medium leading-[150%] tracking-[-0.96px] pt-[200px] pl-[100px]"
        >
          <span>How You Can Help</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default Background;
