"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { HOME_PATH } from "@/config/site";
import { InternalLink, linkInternalTerms } from "@/utils/linkInternalTerms";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CountUp from "./ui/CountUp";
import TiltCard from "./ui/TiltCard";
import Scene3D from "./three/Scene3D";
import { Reveal, RevealItem, RevealStagger } from "./motion/Reveal";
import { H3 } from "@/components/common/Heading";
import SectionHeading from "./motion/SectionHeading";
import { useMotionPrefs } from "./motion/useMotionPrefs";
export function IntroBlock({ children }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <div className="guide-intro-grid">
      <motion.div
        className="guide-intro-copy"
        initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
      >
        {children}
      </motion.div>
      <motion.aside
        className="guide-intro-visual"
        aria-hidden="true"
        initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewport}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease, delay: reduceMotion ? 0 : 0.08 }}
      >
        <Scene3D variant="intro" />
      </motion.aside>
    </div>
  );
}

export function FormulaBlock() {
  const { reduceMotion, viewport } = useMotionPrefs();
  const parts = ["Kıdem tazminatı", " = ", "brüt maaş", " × ", "hizmet süresi."];

  return (
    <Reveal className="guide-formula-layout">
      <TiltCard className="guide-formula-card" tiltMax={6} scale={1.015}>
        <code>
          {parts.map((part, index) =>
            part.trim() === "=" || part.trim() === "×" ? (
              <motion.span
                key={`${part}-${index}`}
                className="guide-formula-op"
                initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{
                  type: reduceMotion ? "tween" : "spring",
                  stiffness: 420,
                  damping: 16,
                  delay: reduceMotion ? 0 : 0.18 + index * 0.06
                }}
              >
                {part}
              </motion.span>
            ) : part === "Kıdem tazminatı" ? (
              <InternalLink key={`${part}-${index}`} href={HOME_PATH}>
                {part}
              </InternalLink>
            ) : (
              <span key={`${part}-${index}`}>{part}</span>
            )
          )}
        </code>
      </TiltCard>
      <span className="guide-formula-coin-fallback" aria-hidden="true" />
    </Reveal>
  );
}

export function EquationPillsBlock() {
  const { reduceMotion, viewport, ease } = useMotionPrefs();
  const pills = ["Maaş", "Bonuslar", "Ödenekler"];

  return (
    <RevealStagger className="guide-equation">
      {pills.map((pill, index) => (
        <span className="guide-equation-group" key={pill}>
          <RevealItem>
            <motion.span
              className="guide-equation-pill"
              whileHover={reduceMotion ? undefined : { y: -4, boxShadow: "0 14px 28px rgba(79,70,229,0.14)" }}
            >
              {pill}
            </motion.span>
          </RevealItem>
          {index < pills.length - 1 ? (
            <motion.span
              className="guide-equation-op"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease, delay: 0.12 + index * 0.1 }}
            >
              +
            </motion.span>
          ) : null}
        </span>
      ))}
      <span className="guide-equation-group">
        <span className="guide-equation-op" aria-hidden="true">
          =
        </span>
        <RevealItem>
          <motion.span
            className="guide-equation-result"
            initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ type: reduceMotion ? "tween" : "spring", stiffness: 360, damping: 18, delay: 0.35 }}
          >
            Ücretlendirme
          </motion.span>
        </RevealItem>
      </span>
    </RevealStagger>
  );
}

export function ExampleBlock({ inputs, rows }) {
  const [totalGlow, setTotalGlow] = useState(false);

  return (
    <div className="guide-example-grid">
      <RevealStagger className="guide-example-inputs" as={motion.ul}>
        {inputs.map((item) => (
          <RevealItem key={item} as={motion.li}>
            {item}
          </RevealItem>
        ))}
      </RevealStagger>
      <TiltCard className="guide-example-table-wrap" tiltMax={7} scale={1.02}>
        <p className="guide-example-label">Tazminat Belirleme:</p>
        <table className="guide-example-table">
          <caption className="sr-only">Tazminat bileşenleri örnek tablosu</caption>
          <thead>
            <tr>
              <th scope="col">Bileşen</th>
              <th scope="col">Miktar (TL)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className={row.highlight ? `is-total${totalGlow ? " is-glow" : ""}` : undefined}>
                <th scope="row">{row.highlight ? <strong>{row.label}</strong> : row.label}</th>
                <td>
                  {row.highlight ? (
                    <strong>
                      <CountUp value={row.amount} onComplete={() => setTotalGlow(true)} />
                    </strong>
                  ) : (
                    <CountUp value={row.amount} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TiltCard>
    </div>
  );
}

export function ChecklistTable({ rows }) {
  return (
    <div className="guide-check-table-wrap">
      <table className="guide-check-table">
        <caption className="sr-only">Dahil edilen tazminat bileşenleri</caption>
        <thead>
          <tr>
            <th scope="col">Tazminat Bileşeni</th>
            <th scope="col">Dahil veya Değil</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <motion.tr
              key={row}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.38, delay: index * 0.05 }}
              whileHover={{ backgroundColor: "rgba(238, 242, 255, 0.65)" }}
            >
              <th scope="row">{linkInternalTerms(row)}</th>
              <td>
                <motion.span
                  className="guide-check-yes"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.08 + index * 0.06 }}
                >
                  <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" />
                  Evet
                </motion.span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TimelineSteps({ steps }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 40%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const { reduceMotion } = useMotionPrefs();

  return (
    <ol className="guide-timeline" ref={ref}>
      <motion.span
        className="guide-timeline-line"
        aria-hidden="true"
        style={{ scaleY: reduceMotion ? 1 : lineScale, transformOrigin: "top center" }}
      />
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          className="guide-timeline-step"
          initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
        >
          <motion.span
            className="guide-timeline-num"
            aria-hidden="true"
            initial={{ scale: reduceMotion ? 1 : 0.5, opacity: reduceMotion ? 1 : 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 420, damping: 16, delay: index * 0.08 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <div className="guide-timeline-body">
            <H3>{step.title}</H3>
            {step.formula ? (
              <motion.p
                className="guide-step-formula"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 + index * 0.08 }}
              >
                {step.formula}
              </motion.p>
            ) : null}
            {step.body ? <p>{linkInternalTerms(step.body)}</p> : null}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export function StepsShowcase({ intro, steps, illustration }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(null);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return undefined;

    const media = window.matchMedia("(min-width: 1367px)");

    const update = () => {
      if (media.matches) {
        setContentHeight(node.offsetHeight);
      } else {
        setContentHeight(null);
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    media.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [steps]);

  return (
    <div className="guide-steps-showcase">
      <Reveal
        direction="left"
        className="guide-steps-visual"
        style={contentHeight ? { minHeight: `${contentHeight}px` } : undefined}
      >
        {illustration}
      </Reveal>
      <div className="guide-steps-content" ref={contentRef}>
        <Reveal>{intro}</Reveal>
        <TimelineSteps steps={steps} />
      </div>
    </div>
  );
}

export function FactorsShowcase({ intro, illustration, children }) {
  return (
    <div className="guide-factors-showcase">
      <div className="guide-factors-content">
        <Reveal>{intro}</Reveal>
        {children}
      </div>
      <Reveal direction="right" className="guide-factors-visual">
        {illustration}
      </Reveal>
    </div>
  );
}

export function FeaturedPanel({ children, cards }) {
  return (
    <div className="guide-featured-panel">
      <div className="guide-featured-layout">
        <div className="guide-featured-copy">{children}</div>
        <Scene3D variant="featured" className="guide-featured-scene" />
      </div>
      <RevealStagger className="guide-featured-cards">{cards}</RevealStagger>
    </div>
  );
}

export function ImportanceCards({ left, right }) {
  return (
    <div className="guide-importance-grid">
      <Reveal direction="left">
        <TiltCard className="guide-importance-card-wrap" tiltMax={6} scale={1.02}>
          <article className="guide-importance-card">{left}</article>
        </TiltCard>
      </Reveal>
      <Reveal direction="right" delay={0.08}>
        <TiltCard className="guide-importance-card-wrap" tiltMax={6} scale={1.02}>
          <article className="guide-importance-card">{right}</article>
        </TiltCard>
      </Reveal>
    </div>
  );
}

export function InfoCalloutBlock({ children }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <motion.aside
      className="guide-info-callout"
      initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: reduceMotion ? 0 : 0.48, ease }}
    >
      <motion.span
        className="guide-info-callout-border"
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={viewport}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
      />
      {children}
    </motion.aside>
  );
}

export { SectionHeading, Reveal, RevealItem, RevealStagger, TiltCard };
