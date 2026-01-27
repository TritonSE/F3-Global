"use client";

import { useRouter } from "next/navigation";
import React from "react";

type ButtonProps = {
  text: string;
  onClick_link?: string;
  external?: boolean;
} & React.ComponentProps<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, onClick_link, external, ...props }, ref) => {
    const router = useRouter();

    const handleClick = () => {
      if (external && onClick_link) {
        window.open(onClick_link, "_blank", "noopener,noreferrer");
      } else {
        router.push(onClick_link || "/");
      }
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className="flex items-center justify-center gap-2.5 rounded-full bg-[#172447] px-5 py-[15px] hover:opacity-90 transition-opacity"
        {...props}
      >
        <p className="text-center font-dm-sans text-base font-semibold leading-6 text-white">
          {text}
        </p>
      </button>
    );
  },
);

Button.displayName = "Button";
