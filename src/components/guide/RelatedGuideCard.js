"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { useMotionPrefs } from "./motion/useMotionPrefs";
import { capitalizeHeadingText } from "@/utils/capitalizeHeading";

export default function RelatedGuideCard({
  href,
  title,
  description,
  linkLabel
}) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <motion.section
      className="guide-related-card-wrap"
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
    >
      <article className="guide-related-card">
        <span className="guide-related-card-icon" aria-hidden="true">
          <BookOpen size={22} strokeWidth={1.8} />
        </span>
        <div className="guide-related-card-copy">
          <p className="guide-related-card-eyebrow">İlgili Rehber</p>
          <h3>{capitalizeHeadingText(title)}</h3>
          <p>{description}</p>
        </div>
        <Link href={href} className="guide-related-card-link">
          {linkLabel}
          <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
        </Link>
      </article>
    </motion.section>
  );
}
