export type TimelineImage = {
  src: string;
  alt: string;
};

export type TimelineItem = {
  year: number; //act as primary key
  description: string;
  isActive: boolean;
};

export type TimelineHeader = {
  title: string;
  description: string;
};

export type TimelineImageProps = {
  isdefault?: string; //the default starting image
};

export type TimelineImages = {
  images: TimelineImage[];
};

export const TIMELINE_HEADER: TimelineHeader = {
  title: "The Path to Impact",
  description:
    "Founded in 2021, our organization emerged from a passion for financial inclusion and a commitment to breaking down barriers that prevent aspiring entrepreneurs from achieving their dreams. We believe that by equipping individuals with the tools they need, we can create lasting change and drive economic development.",
};

export const TIMELINE_INSTRUCTION = "Click on each year to explore our growth during that time";

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: 2015,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus dolor, pulvinar tempus commodo at. Lorem ipsum dolor sit amet, adipiscing elit. Etiam risus dolor pulvinar tempus commodo at.",
    isActive: true,
  },
  {
    year: 2022,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus dolor, pulvinar tempus commodo at. Lorem ipsum dolor sit amet, adipiscing elit. Etiam risus dolor pulvinar tempus commodo at.",
    isActive: false,
  },
  {
    year: 2026,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus dolor, pulvinar tempus commodo at. Lorem ipsum dolor sit amet, adipiscing elit. Etiam risus dolor pulvinar tempus commodo at.",
    isActive: false,
  },
];
