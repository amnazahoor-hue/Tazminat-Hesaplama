"use client";

import "./threeCompat";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { useMotionPrefs } from "../motion/useMotionPrefs";
import GuideFactorsIllustration from "../GuideFactorsIllustration";
import StaticSceneFallback from "./StaticSceneFallback";

const IntroScene = dynamic(() => import("./IntroScene"), { ssr: false, loading: () => <StaticSceneFallback variant="intro" /> });
const FeaturedScene = dynamic(() => import("./FeaturedScene"), {
  ssr: false,
  loading: () => <StaticSceneFallback variant="featured" />
});
const FactorsScene = dynamic(() => import("./FactorsScene"), {
  ssr: false,
  loading: () => <GuideFactorsIllustration />
});
const StepsScene = dynamic(() => import("./StepsScene"), {
  ssr: false,
  loading: () => <StaticSceneFallback variant="steps" />
});

const SCENE_MAP = {
  intro: IntroScene,
  featured: FeaturedScene,
  factors: FactorsScene,
  steps: StepsScene
};

const FALLBACK_MAP = {
  intro: "intro",
  featured: "featured",
  factors: "factors",
  steps: "steps"
};

export default function Scene3D({ variant = "intro", className = "" }) {
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const { enable3D } = useMotionPrefs();
  const Scene = SCENE_MAP[variant] ?? IntroScene;
  const fallbackVariant = FALLBACK_MAP[variant] ?? "intro";

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px", threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`guide-scene3d guide-scene3d--${variant}${className ? ` ${className}` : ""}`}
    >
      {enable3D && inView ? (
        <Suspense
          fallback={
            variant === "factors" ? (
              <GuideFactorsIllustration />
            ) : variant === "steps" ? (
              <StaticSceneFallback variant="steps" />
            ) : (
              <StaticSceneFallback variant={fallbackVariant} />
            )
          }
        >
          <Scene active={inView} />
        </Suspense>
      ) : variant === "factors" ? (
        <GuideFactorsIllustration />
      ) : variant === "steps" ? (
        <StaticSceneFallback variant="steps" />
      ) : (
        <StaticSceneFallback variant={fallbackVariant} />
      )}
    </div>
  );
}
