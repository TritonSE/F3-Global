export type ServiceImage = {
  src: string;
  alt: string;
};

export type ServiceDescription = {
  id: string;
  title: string;
  description: string;
  image: ServiceImage;
};

export type ServiceImageProps = {
  defaultServiceID?: string; //Which services starts on default
};

export type ServiceDeckProps = {
  images: ServiceImage[];
  isShuffling: boolean;
};

export const DEFAULT_SERVICES: ServiceDescription[] = [
  {
    id: "MicroLoans",
    title: "MicroLoans",
    description:
      "We provide low or zero-interest microloans to small entrepreneurs who are ready to take the next step in growing their business. These loans are designed to fund strategic initiatives, whether that is purchasing inventory, expanding operations, or launching new services. Our goal is to remove financial barriers and empower business owners to build long-term economic stability.",
    image: {
      src: "/imgs/services/microloans.jpg",
      alt: "Credit card payment with Square reader",
    },
  },

  {
    id: "Consulting",
    title: "Consulting",
    description:
      "Our consulting services offer entrepreneurs tailored guidance on how to improve, grow and sustain their ventures. We analyze each client's unique needs to develop personalized strategies, and we remain engaged through the implementation process to refine our approach. From initial strategic planning to customer engagement, we help turn vision into action.",
    image: {
      src: "/imgs/services/consulting.jpg",
      alt: "Business partners high-fiving in office",
    },
  },

  {
    id: "Research",
    title: "Research",
    description:
      "We conduct rigorous market and economic research to ensure every recommendation we give is grounded in real data. Our team analyzes industry trends, competitive landscapes, and regional dynamics to help clients make informed, future-ready decisions. This research not only supports our consulting work, but also helps entrepreneurs navigate uncertainty with clarity.",
    image: {
      src: "/imgs/services/research.jpg",
      alt: "Team planning with sticky notes and wireframes",
    },
  },

  {
    id: "Professional Development",
    title: "Professional Development",
    description:
      "We offer training and resources designed to sharpen professional skills and strengthen organizational positioning in today's evolving marketplace. Whether it's through leadership workshops, branding strategies, or communication development, we help individuals and companies increase their impact. Our approach is rooted in modern best practices and real-world adaptability.",
    image: {
      src: "/imgs/services/professional-development.jpg",
      alt: "Professionals collaborating at laptop",
    },
  },
];
