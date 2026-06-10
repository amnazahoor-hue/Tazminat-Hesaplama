"use client";

import { motion } from "framer-motion";
import { useMotionPrefs } from "./useMotionPrefs";

export default function SectionHeading({ as: Tag = "h2", children, className = "", light = false }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <motion.div
      className={`guide-section-heading${light ? " guide-section-heading--light" : ""}${className ? ` ${className}` : ""}`}
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: reduceMotion ? 0 : 0.48, ease }}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
}
