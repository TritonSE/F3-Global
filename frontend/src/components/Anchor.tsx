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
        className="flex items-center justify-center gap-2.5 rounded-full bg-[#172447] px-5 py-[15px] hover:bg-[#1169B0] cursor-pointer font-semibold leading-6 text-white"
      >
        {text}
      </a>
    );
  },
);
