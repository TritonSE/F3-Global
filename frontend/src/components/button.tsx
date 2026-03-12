"use client";

import { useRouter } from "next/navigation";
import React from "react";

type ButtonProps = {
  text: string;
  onClick_link?: string;
  trailingIcon?: React.ReactNode;
  textClassName?: string;
} & React.ComponentProps<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, onClick_link, trailingIcon, textClassName, onClick, ...props }, ref) => {
    const router = useRouter();

    const isExternal = (url: string) => /^https?:\/\//i.test(url);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
        if (event.defaultPrevented) return;
      }

      if (!onClick_link) return;

      if (isExternal(onClick_link)) {
        window.open(onClick_link, "_blank", "noopener,noreferrer");
        return;
      }

      if (onClick_link.startsWith("#")) {
        const target = document.getElementById(onClick_link.slice(1));

        if (target) {
          const rect = target.getBoundingClientRect();
          const targetTop = rect.top + window.scrollY;
          const scrollTop = targetTop - 150;
          window.scrollTo({ top: scrollTop, behavior: "smooth" });
          return;
        }
      }

      router.push(onClick_link);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className="flex items-center justify-center gap-2.5 rounded-full bg-[#172447] px-5 py-[15px] hover:bg-[#1169B0] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] cursor-pointer"
        {...props}
      >
        <p
          className={
            textClassName ?? "text-center font-dm-sans text-base font-semibold leading-6 text-white"
          }
        >
          {text}
        </p>
        {trailingIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
