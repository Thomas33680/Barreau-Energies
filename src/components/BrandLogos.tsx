import Image from "next/image";

import ariston from "@/assets/brands/ariston.png";
import atlantic from "@/assets/brands/atlantic.webp";
import daikin from "@/assets/brands/daikin.webp";
import thermor from "@/assets/brands/thermor.webp";
import panasonic from "@/assets/brands/panasonic.webp";
import bwt from "@/assets/brands/bwt.png";
import altech from "@/assets/brands/altech.webp";
import mitsubishi from "@/assets/brands/mitsubishi-electric.png";

const brands = [
  { name: "Ariston", src: ariston },
  { name: "Atlantic", src: atlantic },
  { name: "Daikin", src: daikin },
  { name: "Thermor", src: thermor },
  { name: "Panasonic", src: panasonic },
  { name: "BWT", src: bwt },
  { name: "Altech", src: altech },
  { name: "Mitsubishi Electric", src: mitsubishi },
];

export function BrandLogos() {
  return (
    <div className="grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
      {brands.map((brand) => (
        <div key={brand.name} className="flex items-center justify-center">
          <Image
            src={brand.src}
            alt={brand.name}
            className="h-8 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-9"
          />
        </div>
      ))}
    </div>
  );
}
