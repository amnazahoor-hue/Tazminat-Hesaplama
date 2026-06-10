"use client";

import Image from "next/image";
import { IMAGES } from "@/config/images";

export default function GuideStepsIllustration() {
  return (
    <div className="guide-steps-illustration-panel">
      <div className="guide-steps-illustration-image-wrap">
        <Image
          src={IMAGES.guides.stepsOffice}
          alt="Tazminat hesaplama sürecini gösteren ofis görseli"
          fill
          sizes="(max-width: 900px) 100vw, 40vw"
          className="guide-steps-illustration-image"
        />
        <span className="guide-steps-illustration-overlay" aria-hidden="true" />
      </div>
    </div>
  );
}
