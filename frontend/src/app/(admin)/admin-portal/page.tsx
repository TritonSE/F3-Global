import { ScrollTopButton } from "@/components/ScrollTopButton";

export default function AdminPortal() {
  return (
    <div className="flex p-[50px] gap-[50px] flex-col items-start">
      <p className="text-[#1E1E1E] text-[32px] font-bold -tracking-[0.64px]">Welcome, F3 GLOBAL</p>
      <div className="flex w-full gap-[25px]">
        <div className="flex w-full pb-[5px] border-b-[1px] border-[#172447] justify-between">
          <p className="text-[#172447] text-[24px] font-bold tracking-[3px] ">HOME</p>
          <ScrollTopButton />
        </div>
        {/* div for the components section */}
      </div>
    </div>
  );
}
