"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function parseAmount(value) {
  return Number(String(value).replace(/,/g, ""));
}

function formatAmount(num) {
  return num.toLocaleString("en-US");
}

export default function CountUp({ value, duration = 1.15, onComplete, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!inView || completedRef.current) return undefined;

    if (reduceMotion) {
      setDisplay(value);
      completedRef.current = true;
      onComplete?.();
      return undefined;
    }

    const target = parseAmount(value);
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(formatAmount(Math.round(target * eased)));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(value);
        completedRef.current = true;
        onComplete?.();
      }
    };

    setDisplay(formatAmount(0));
    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduceMotion, onComplete]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
