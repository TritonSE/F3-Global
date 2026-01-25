import React from "react";

type AnchorProps = {
  text: string;
  link?: string;
} & React.ComponentProps<"a">;

export const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ text, link, ...props }, ref) => {
    return (
      <a
        href={link}
        target="_blank"
        className="flex items-center justify-center gap-2.5 rounded-full bg-[#172447] px-5 py-[15px] hover:opacity-90 transition-opacity cursor-pointer text-center font-dm-sans text-base font-semibold leading-6 text-white"
      >
        {text}
      </a>
    );
  },
);
