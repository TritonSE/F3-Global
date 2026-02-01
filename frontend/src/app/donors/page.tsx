import React from "react";

import { WaysToGiveCarouselData } from "../carouselData";

import Parallax from "./parallax";

import { Carousel } from "@/components/Carousel";

export default function Donors() {
  return (
    <>
      <Parallax />

      <div className="relative left-1/2 right-1/2 flex w-screen -translate-x-1/2">
        <Carousel data={WaysToGiveCarouselData} />
      </div>
    </>
  );
}
