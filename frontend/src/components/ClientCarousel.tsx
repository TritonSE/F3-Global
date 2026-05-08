"use client";

import { getAllClients } from "@/api/client";
import { LogoCarouselSection } from "@/components/LogoCarouselSection";

export const ClientCarousel = () => {
  return (
    <LogoCarouselSection
      title="Clients We've Supported"
      description="Over the years, F3 Global has supported entrepreneurs and small businesses across diverse communities, helping turn ideas into sustainable ventures. We're proud to have worked with organizations and founders who trust us as partners in their growth. Explore a few of the businesses we've served and hear directly from the people behind them."
      fetchItems={getAllClients}
    />
  );
};
