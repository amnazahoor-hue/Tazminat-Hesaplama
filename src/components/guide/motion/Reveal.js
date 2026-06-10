"use client";

import { motion } from "framer-motion";
import { useMotionPrefs } from "./useMotionPrefs";

function resolveMotionComponent(Tag) {
  if (typeof Tag === "string") {
    return motion[Tag] ?? motion.div;
  }
  return Tag;
}

export function Reveal({
  as: Tag = motion.div,
  children,
  className = "",
  delay = 0,
  direction = "up",
  ...props
}) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();
  const offset = reduceMotion ? 0 : direction === "left" ? -28 : direction === "right" ? 28 : 22;
  const Component = resolveMotionComponent(Tag);

  return (
    <Component
      className={className}
      initial={{ opacity: reduceMotion ? 1 : 0, x: direction === "left" || direction === "right" ? offset : 0, y: direction === "up" ? offset : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease, delay }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function RevealStagger({ children, className = "", as: Tag = motion.div, stagger = 0.08 }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();
  const Component = resolveMotionComponent(Tag);

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : stagger, delayChildren: 0.04 } }
      }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className = "", as: Tag = motion.div }) {
  const { reduceMotion, ease } = useMotionPrefs();
  const Component = resolveMotionComponent(Tag);

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 },
        visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.45, ease } }
      }}
    >
      {children}
    </Component>
  );
}

export function GuideSection({ id, alt = false, className = "", children, parallax = false }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <motion.section
      id={id}
      className={`section content-section guide-section${alt ? " alt" : ""}${parallax ? " guide-section--parallax" : ""}${className ? ` ${className}` : ""}`}
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
    >
      {parallax ? <span className="guide-parallax-blob" aria-hidden="true" /> : null}
      <div className="container">{children}</div>
    </motion.section>
  );
}
