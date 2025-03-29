"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import asset_1 from "@/public/carousel/1.png";
import asset_2 from "@/public/carousel/2.jpg";
import asset_3 from "@/public/carousel/3.png";
import asset_4 from "@/public/carousel/4.jpg";
export default function CarouselAuto() {
  const assets = [asset_1, asset_2, asset_3, asset_4];
  const [position, setPosition] = useState(1);
  const IMAGES_LENGTH = 3;
  useEffect(() => {
    const timerId = setInterval(() => {
      if (position === IMAGES_LENGTH - 1) return setPosition(1);

      setPosition((pos) => pos + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <picture className="max-w-[1200px] overflow-hidden rounded-xl ">
      <div
        className="flex flex-row transition-transform"
        style={{
          transform: `translateX(${position * 100}%)`,
        }}
      >
        {assets.map((asset, index) => (
          <Image
            key={index}
            src={asset}
            alt={`Imagen ${index} del Carousel.`}
            className=" object-contain object-center"
          />
        ))}
      </div>
    </picture>
  );
}
