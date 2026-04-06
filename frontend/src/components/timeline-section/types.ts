export type TimelineImage = {
  src: string;
  alt: string;
};

export type TimelineHeader = {
  title: string;
  description: string;
};

export type TimelineItem = {
  year: number;
  description: string;
  imageUrl: string;
};

export const TIMELINE_HEADER: TimelineHeader = {
  title: "The Path to Impact",
  description:
    "Founded in 2025, our organization emerged from a passion for financial inclusion and a commitment to breaking down barriers that prevent aspiring entrepreneurs from achieving their dreams. We believe that by equipping individuals with the tools they need, we can create lasting change and drive economic development.",
};

export const TIMELINE_INSTRUCTION = "Click on each year to explore our growth during that time.";

export type TimelineSectionProps = {
  items: TimelineItem[];
};
