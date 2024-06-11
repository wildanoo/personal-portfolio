"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type ImgSliderProps = {
  imgListUrl: string[];
  width?: number;
  height?: number;
  delay?: number;
};
const ImgSlider: React.FC<ImgSliderProps> = ({
  imgListUrl,
  width = 600,
  height = 300,
  delay = 2000,
}) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: delay,
        }),
      ]}
    >
      <CarouselContent className="max-h-[300px]">
        {imgListUrl.map((img, i) => (
          <CarouselItem key={i}>
            <Image
              alt={img}
              src={img}
              width={width}
              height={height}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {imgListUrl.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default ImgSlider;
