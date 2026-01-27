"use client";

import { useRouter } from "next/navigation";
import React from "react";

type ButtonProps = {
  text: string;
  onClick_link?: string;
  external?: boolean;
} & React.ComponentProps<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, onClick_link, external, className = "", style, ...props }, ref) => {
    const router = useRouter();

    const baseClass =
      className ||
      "flex items-center justify-center gap-2.5 rounded-full bg-[#172447] px-5 py-[15px] hover:opacity-90 transition-opacity";

    if (external && onClick_link) {
      return (
        <a
          href={onClick_link}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          style={style}
        >
          <span className="text-center font-dm-sans text-base font-semibold leading-6 text-white">
            {text}
          </span>
        </a>
      );
    }

    return (
      <button
        ref={ref}
        onClick={() => router.push(onClick_link || "/")}
        className={baseClass}
        style={style}
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
