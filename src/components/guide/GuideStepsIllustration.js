"use client";

import Image from "next/image";

const STEPS_ILLUSTRATION_SRC =
  "https://media.istockphoto.com/id/2205123913/photo/businesswoman-showing-infographic-to-businessman-in-modern-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=wqTpLelKGasnT5vUOUGDYwXrms1cyE3Q1rniDA-AtuA=";

export default function GuideStepsIllustration() {
  return (
    <div className="guide-steps-illustration-panel">
      <div className="guide-steps-illustration-image-wrap">
        <Image
          src={STEPS_ILLUSTRATION_SRC}
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
