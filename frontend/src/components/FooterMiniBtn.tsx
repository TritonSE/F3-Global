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

    return (
      <button
        ref={ref}
        onClick={() => router.push(link || "/")}
        {...props}
        className="hover:text-[#1169B0] cursor-pointer"
      >
        <p>{text}</p>
      </button>
    );
  },
);
