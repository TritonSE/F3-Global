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
};

export const TIMELINE_HEADER: TimelineHeader = {
  title: "The Path to Impact",
  description:
    "Founded in 2025, our organization emerged from a passion for financial inclusion and a commitment to breaking down barriers that prevent aspiring entrepreneurs from achieving their dreams. We believe that by equipping individuals with the tools they need, we can create lasting change and drive economic development.",
};

export const TIMELINE_INSTRUCTION = "Click on each year to explore our growth during that time.";

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: 2015,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus dolor, pulvinar tempus commodo at. Lorem ipsum dolor sit amet, adipiscing elit. Etiam risus dolor pulvinar tempus commodo at.",
  },
  {
    year: 2022,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus dolor, pulvinar tempus commodo at. Lorem ipsum dolor sit amet, adipiscing elit. Etiam risus dolor pulvinar tempus commodo at.",
  },
  {
    year: 2026,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus dolor, pulvinar tempus commodo at. Lorem ipsum dolor sit amet, adipiscing elit. Etiam risus dolor pulvinar tempus commodo at.",
  },
];

export const TIMELINE_IMAGES: TimelineImage[] = [
  { src: "/imgs/timeline/Laptop-Image.jpg", alt: "Timeline photo 4" },
  { src: "/imgs/timeline/People-working-Image.jpg", alt: "Timeline photo 2" },
  { src: "/imgs/timeline/People-Talking-Image.jpg", alt: "Timeline photo 1" },
];
