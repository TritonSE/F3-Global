"use client";
import Image from "next/image";
export const ScrollTopButton = function ScrollTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center text-[#5D5D5D] text-[14px] font-normal tracking-[2px] leading-[32px] gap-[2px] cursor-pointer"
    >
      BACK TO TOP
      <Image src="/imgs/ic_arrowup.svg" alt="arrow up" width={15} height={15} />
    </button>
  );
};
