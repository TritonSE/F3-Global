type ImpactSectionProps = {
  title?: string;
};

export const ImpactSection = ({ title = "Our Global Impact" }: ImpactSectionProps) => {
  return (
    <div className="relative z-20 w-full py-[75px] px-[5vw] flex gap-6 flex-col items-start border-t border-[#F4F4F4] bg-white shadow-[inset_0_-12px_10px_rgba(0,0,0,0.02)]">
      <h3 className="text-[#172447] font-dm text-[48px] font-medium leading-[1.5] tracking-[-0.96px]">
        {title}
      </h3>
      <div className="self-stretch flex justify-between items-start p-[25px] rounded-[10px] bg-[#F4F4F4]">
        <div className="w-[375px] flex flex-col items-start self-stretch">
          <h4 className="text-[#012060] font-ethic text-[64px] font-light leading-[1.1]">$10k</h4>
          <p className="text-[#1E1E1E] font-dm text-[24px] font-semibold leading-[1.5]">
            Total Raised
          </p>
          <p className="text-[#5D5D5D] font-dm text-[16px] font-normal leading-[1.5]">
            Deployed as microloans to entrepreneurs lacking traditional banking access, providing
            capital to launch businesses and lift families out of poverty.
          </p>
        </div>

        <div className="w-[2px] h-48 bg-[#C7C7C7] mx-6 self-center"></div>

        <div className="w-[375px] flex flex-col items-start self-stretch">
          <h4 className="text-[#012060] font-ethic text-[64px] font-light leading-[1.1]">57</h4>
          <p className="text-[#1E1E1E] font-dm text-[24px] font-semibold leading-[1.5]">
            Members Worldwide
          </p>
          <p className="text-[#5D5D5D] font-dm text-[16px] font-normal leading-[1.5]">
            Funding microloans that help entrepreneurs across continents launch businesses, create
            jobs, and build sustainable futures for their communities.
          </p>
        </div>

        <div className="w-[2px] h-48 bg-[#C7C7C7] mx-6 self-center"></div>

        <div className="w-[375px] flex flex-col items-start self-stretch">
          <h4 className="text-[#012060] font-ethic text-[64px] font-light leading-[1.1]">25</h4>
          <p className="text-[#1E1E1E] font-dm text-[24px] font-semibold leading-[1.5]">
            Organizations Supported
          </p>
          <p className="text-[#5D5D5D] font-dm text-[16px] font-normal leading-[1.5]">
            Invested directly into entrepreneurs worldwide, providing the capital they need to
            launch businesses, create employment, and build thriving futures.
          </p>
        </div>
      </div>
      <p className="text-[#5D5D5D] font-dm text-[16px] font-bold leading-[1.5] mt-4 self-start uppercase">
        *Data from Jan 2026
      </p>
    </div>
  );
};
