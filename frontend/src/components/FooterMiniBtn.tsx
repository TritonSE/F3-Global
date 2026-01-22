"use client";

import { useRouter } from "next/navigation";
import React from "react";

type FooterMiniBtnProps = {
  text: string;
  link?: string;
} & React.ComponentProps<"button">;

export const FooterMiniBtn = React.forwardRef<HTMLButtonElement, FooterMiniBtnProps>(
  ({ text, link, ...props }, ref) => {
    const router = useRouter();

    const handleClick = () => {
      if (!link) return;

      if (link.startsWith("http")) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else {
        router.push(link);
      }
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        {...props}
        className="hover:text-[#1169B0] cursor-pointer"
      >
        <p>{text}</p>
      </button>
    );
  },
);
