"use client";

import { useRouter } from "next/navigation";
import React from "react";

type FooterMiniBtnProps = {
  text: string;
  link?: string;
} & React.ComponentProps<"button">;

export const FooterMiniBtn = React.forwardRef<HTMLButtonElement, FooterMiniBtnProps>(
  ({ text, link, className, onClick, ...props }, ref) => {
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);

      if (event.defaultPrevented || onClick) return;

      if (!link) return;

      if (link.startsWith("http")) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else {
        router.push(link);
      }
    };

    return (
      <button
        type="button"
        ref={ref}
        onClick={handleClick}
        {...props}
        className={`cursor-pointer hover:text-[#1169B0] ${className ?? ""}`.trim()}
      >
        <p>{text}</p>
      </button>
    );
  },
);
