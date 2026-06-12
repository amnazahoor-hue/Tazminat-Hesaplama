"use client";

import Image from "next/image";
import { IMAGES } from "@/config/images";

export default function GuideStepsIllustration() {
  return (
    <div className="guide-steps-illustration-panel">
      <div className="guide-steps-illustration-image-wrap">
        <Image
          src={IMAGES.guides.stepsOffice}
          alt="Tazminat hesaplama sürecini gösteren ofis toplantısı görseli"
          fill
          quality={90}
          sizes="(max-width: 900px) 100vw, (max-width: 1200px) 45vw, 520px"
          className="guide-steps-illustration-image"
        />
        <span className="guide-steps-illustration-overlay" aria-hidden="true" />
      </div>
    </div>
  );
}
