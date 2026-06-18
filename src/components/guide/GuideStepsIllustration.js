"use client";

import AppImage from "@/components/common/AppImage";
import { IMAGES } from "@/config/images";

export default function GuideStepsIllustration() {
  return (
    <div className="guide-steps-illustration-panel">
      <div className="guide-steps-illustration-image-wrap">
        <AppImage
          src={IMAGES.guides.stepsOffice}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1366px) 100vw, (max-width: 1200px) 45vw, 520px"
          className="guide-steps-illustration-image"
        />
        <span className="guide-steps-illustration-overlay" aria-hidden="true" />
      </div>
    </div>
  );
}
