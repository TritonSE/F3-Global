import { ComponentSection } from "@/components/admin-portal/ComponentSection";
import { ScrollTopButton } from "@/components/admin-portal/ScrollTopButton";

type SectionProps = {
  name: string;
  components: {
    name: string;
    description: string;
    tags: string[];
    href: string;
  }[];
};

export const Section = function Section({ name, components }: SectionProps) {
  return (
    <div className="flex flex-col w-full gap-[25px]">
      <div className="flex w-full pb-[5px] border-b-[1px] border-[#172447] justify-between">
        <p className="text-[#172447] text-[24px] font-bold tracking-[3px] ">{name}</p>
        <ScrollTopButton />
      </div>
      <div className="flex gap-[30px] items-start">
        {components.map((c) => (
          <ComponentSection key={c.name} {...c} />
        ))}
      </div>
    </div>
  );
};
