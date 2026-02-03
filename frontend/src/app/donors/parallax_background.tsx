import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => (
  <div className="relative top-0 left-0 w-screen h-screen overflow-y-scroll bg-[url('/imgs/donors.png')] bg-cover bg-repeat">
    {/* Text background layer (fixed to viewport) */}
    <div className="pointer-events-none select-none fixed inset-0 z-0 flex h-screen pt-[200px] pl-[100px] text-white text-center font-['DM_Sans'] text-[48px] font-medium leading-[150%] tracking-[-0.96px]">
      <span>How You Can Help</span>
    </div>

    {/* Content */}
    <div className="relative z-10">{children}</div>
  </div>
);

export default Background;
