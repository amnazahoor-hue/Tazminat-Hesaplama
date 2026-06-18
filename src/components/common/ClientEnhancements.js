"use client";

import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("@/components/common/Preloader"), { ssr: false });
const ScrollRevealInit = dynamic(() => import("@/components/common/ScrollRevealInit"), { ssr: false });

export default function ClientEnhancements() {
  return (
    <>
      <Preloader />
      <ScrollRevealInit />
    </>
  );
}
