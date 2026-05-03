"use client";

import { getAllAffiliates } from "@/api/affiliates";
import { LogoCarouselSection } from "@/components/LogoCarouselSection";

export const AffiliateCarousel = () => {
  return (
    <LogoCarouselSection
      title="Where Our Alumni Have Gone"
      description="We're proud to work alongside organizations that share our commitment to economic empowerment and financial inclusion. These partnerships help us extend our reach and deepen our impact."
      fetchItems={getAllAffiliates}
    />
  );
};
