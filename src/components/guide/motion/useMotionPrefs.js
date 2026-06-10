"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-80px" };

export function useMotionPrefs() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobileMq = window.matchMedia("(max-width: 900px)");
    const touchMq = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setIsMobile(mobileMq.matches);
      setIsTouch(touchMq.matches || mobileMq.matches);
    };

    update();
    mobileMq.addEventListener("change", update);
    touchMq.addEventListener("change", update);
    return () => {
      mobileMq.removeEventListener("change", update);
      touchMq.removeEventListener("change", update);
    };
  }, []);

  const enable3D = mounted && !reduceMotion && !isMobile;
  const enableTilt = mounted && !reduceMotion && !isTouch;

  return {
    mounted,
    reduceMotion: !!reduceMotion,
    isMobile,
    isTouch,
    enable3D,
    enableTilt,
    viewport: VIEWPORT,
    ease: EASE
  };
}
