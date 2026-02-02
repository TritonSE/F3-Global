import React from "react";

type BackgroundProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Background = ({ children, style }: BackgroundProps) => (
  <div
    className="relative w-full bg-[url('/imgs/donors.png')] bg-cover bg-no-repeat bg-center"
    style={{
      backgroundAttachment: "fixed",
      ...style,
    }}
  >
    {/* Title layer scoped to this component */}
    <div className="pointer-events-none select-none absolute inset-0 z-10 flex h-screen pt-[200px] pl-[100px] text-white text-center font-['DM_Sans'] text-[48px] font-medium leading-[150%] tracking-[-0.96px]">
      <span>How You Can Help</span>
    </div>

    {/* Content */}
    <div className="relative z-20">{children}</div>
  </div>
);

export default Background;
