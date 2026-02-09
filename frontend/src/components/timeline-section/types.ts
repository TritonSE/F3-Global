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

export const TIMELINE_INSTRUCTION = "Click to read more";

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
  { src: "/imgs/timeline/photo1.png", alt: "Timeline photo 1" },
  { src: "/imgs/timeline/photo2.png", alt: "Timeline photo 2" },
  { src: "/imgs/timeline/photo3.png", alt: "Timeline photo 3" },
  { src: "/imgs/timeline/photo4.png", alt: "Timeline photo 4" },
  { src: "/imgs/timeline/photo5.png", alt: "Timeline photo 5" },
  { src: "/imgs/timeline/photo6.png", alt: "Timeline photo 6" },
];
