import fs from "node:fs";

const src = fs.readFileSync("src/components/CompensationCalculator.js", "utf8");
const startMarker = '<div className="hero-visual-stage hero-visual-stage--desktop">';
const endMarker = `                </div>
              </div>`;

const start = src.indexOf(startMarker);
const end = src.indexOf(endMarker, start);
if (start < 0 || end < 0) {
  console.error("Markers not found", start, end);
  process.exit(1);
}

const block = src
  .slice(start, end)
  .replaceAll("HERO_CAROUSEL_IMAGES", "carouselImages");
const component = `"use client";

import AppImage from "@/components/common/AppImage";
import { getImageMeta } from "@/config/images";

export default function HeroDesktopVisual({ carouselImages, activeHeroSlide }) {
  return (
    ${block}
  );
}
`;

fs.writeFileSync("src/components/home/HeroDesktopVisual.js", component);

const replacement = `{showDesktopHero ? (
                  <HeroDesktopVisual
                    carouselImages={HERO_CAROUSEL_IMAGES}
                    activeHeroSlide={activeHeroSlide}
                  />
                ) : (
                  <div className="hero-visual-stage hero-visual-stage--desktop" aria-hidden="true" />
                )}`;

const updated = src.slice(0, start) + replacement + src.slice(end);
fs.writeFileSync("src/components/CompensationCalculator.js", updated);
console.log("Done");
