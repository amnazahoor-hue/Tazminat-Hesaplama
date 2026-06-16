"use client";

import { motion } from "framer-motion";
import { capitalizeHeadingText } from "@/utils/capitalizeHeading";
import { useMotionPrefs } from "./useMotionPrefs";

function formatHeadingChildren(children) {
  if (typeof children === "string") {
    return capitalizeHeadingText(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => (typeof child === "string" ? capitalizeHeadingText(child) : child));
  }

  return children;
}

export default function SectionHeading({ as: Tag = "h2", children, className = "", light = false, id }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <motion.div
      className={`guide-section-heading${light ? " guide-section-heading--light" : ""}${className ? ` ${className}` : ""}`}
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: reduceMotion ? 0 : 0.48, ease }}
    >
      <Tag id={id}>{formatHeadingChildren(children)}</Tag>
    </motion.div>
  );
}
