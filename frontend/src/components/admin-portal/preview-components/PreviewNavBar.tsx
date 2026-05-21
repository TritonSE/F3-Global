import Image from "next/image";

type NavItem = "Home" | "About Us" | "Meet the Team" | "Get Involved" | "Newsletter";

type PreviewNavBarProps = {
  activeItem: NavItem;
};

export function PreviewNavBar({ activeItem }: PreviewNavBarProps) {
  return (
    <div className="bg-[rgba(244,244,244,0.7)] backdrop-blur-sm flex items-center justify-between px-[24px] py-[16px]">
      <div className="flex items-center gap-[12px]">
        <Image
          src="/imgs/f3-logo.svg"
          alt="F3 Global Logo"
          width={44}
          height={44}
          className="size-[44px] object-contain"
        />
        <span className="font-dm-sans font-black text-[10px] text-[#172447] tracking-[2px] leading-[1.1] whitespace-pre-line">
          {"FUTURE\nFORWARD\nFOUNDATION"}
        </span>
      </div>
      <div className="flex items-center gap-[8px]">
        {["Home", "About Us", "Meet the Team"].map((item) => (
          <span
            key={item}
            className={`px-[12px] py-[8px] font-dm-sans text-[16px] ${
              activeItem === item ? "bg-[#E6E6E6] text-[#172447] rounded-[99px]" : "text-[#5D5D5D]"
            }`}
          >
            {item}
          </span>
        ))}
        <span
          className={`px-[12px] py-[8px] font-dm-sans text-[16px] ${
            activeItem === "Get Involved"
              ? "bg-[#E6E6E6] text-[#172447] rounded-[99px]"
              : "text-[#5D5D5D]"
          }`}
        >
          Get Involved ↓
        </span>
        <span
          className={`px-[12px] py-[8px] font-dm-sans text-[16px] ${
            activeItem === "Newsletter"
              ? "bg-[#E6E6E6] text-[#172447] rounded-[99px]"
              : "text-[#5D5D5D]"
          }`}
        >
          Newsletter
        </span>
        <div className="border border-[#C7C7C7] rounded-[99px] px-[16px] py-[8px] font-dm-sans font-semibold text-[16px] text-[#012060] flex items-center gap-[8px]">
          DONATE
          <Image
            src="/imgs/ic_arrowforward.svg"
            alt=""
            width={20}
            height={20}
            className="size-[20px]"
          />
        </div>
      </div>
    </div>
  );
}
