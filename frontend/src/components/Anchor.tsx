import React from "react";

type AnchorProps = {
  text: string;
  link?: string;
} & React.ComponentProps<"a">;

export const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(({ text, link }, ref) => {
  return (
    <a
      href={link}
      target="_blank"
      ref={ref}
      className="flex items-center justify-center gap-10 rounded-full bg-[#172447] px-[20px] py-[15px] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] cursor-pointer font-semibold leading-6 text-white"
    >
      {text}
    </a>
  );
});
