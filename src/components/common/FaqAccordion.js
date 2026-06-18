"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCapitalizeHeadingText } from "@/hooks/useHeadingLocale";
import { useMotionPrefs } from "@/components/guide/motion/useMotionPrefs";
import { linkInternalTerms } from "@/utils/linkInternalTerms";

const FOOTER_GAP = 24;
const CLAMP_TOLERANCE_PX = 12;

function measureAnswerHeight(answerEl) {
  const prevMax = answerEl.style.maxHeight;
  const prevOverflow = answerEl.style.overflowY;
  answerEl.style.maxHeight = "none";
  answerEl.style.overflowY = "visible";
  const fullHeight = Math.ceil(answerEl.scrollHeight);
  answerEl.style.maxHeight = prevMax;
  answerEl.style.overflowY = prevOverflow;
  return fullHeight;
}

function measureOpenAnswer(answerEl, isLastOpen) {
  const fullHeight = measureAnswerHeight(answerEl);

  if (!isLastOpen) {
    return { offset: fullHeight, maxHeight: null, clamped: false };
  }

  const footer = document.querySelector(".site-footer");
  if (!footer) {
    return { offset: 0, maxHeight: null, clamped: false };
  }

  const answerTop = answerEl.getBoundingClientRect().top;
  const footerTop = footer.getBoundingClientRect().top;
  const available = Math.floor(footerTop - answerTop - FOOTER_GAP);
  const clampedHeight = Math.max(96, Math.min(fullHeight, available));
  const needsClamp = clampedHeight + CLAMP_TOLERANCE_PX < fullHeight;

  return {
    offset: 0,
    maxHeight: needsClamp ? clampedHeight : null,
    clamped: needsClamp
  };
}

export default function FaqAccordion({ items, className = "", variant = "guide", linkExcludeKeys }) {
  const [openId, setOpenId] = useState(null);
  const [answerOffset, setAnswerOffset] = useState(0);
  const [answerMaxHeight, setAnswerMaxHeight] = useState(null);
  const [isClamped, setIsClamped] = useState(false);
  const [isLastOpen, setIsLastOpen] = useState(false);
  const answerRef = useRef(null);
  const { reduceMotion, viewport, ease } = useMotionPrefs();
  const capitalize = useCapitalizeHeadingText();
  const isHome = variant === "home";

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const updateMeasurements = useCallback(() => {
    const el = answerRef.current;
    if (!el || !openId) {
      setAnswerOffset(0);
      setAnswerMaxHeight(null);
      setIsClamped(false);
      setIsLastOpen(false);
      return;
    }

    const openIndex = items.findIndex((item) => item.id === openId);
    const lastOpen = openIndex === items.length - 1;
    setIsLastOpen(lastOpen);

    const { offset, maxHeight, clamped } = measureOpenAnswer(el, lastOpen);
    setAnswerOffset(offset);
    setAnswerMaxHeight(maxHeight);
    setIsClamped(clamped);
  }, [openId, items]);

  useLayoutEffect(() => {
    if (!openId) {
      setAnswerOffset(0);
      setAnswerMaxHeight(null);
      setIsClamped(false);
      setIsLastOpen(false);
      return;
    }

    updateMeasurements();

    const rafId = requestAnimationFrame(updateMeasurements);

    const observer = new ResizeObserver(updateMeasurements);
    if (answerRef.current) {
      observer.observe(answerRef.current);
    }

    window.addEventListener("resize", updateMeasurements);
    window.addEventListener("scroll", updateMeasurements, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", updateMeasurements);
      window.removeEventListener("scroll", updateMeasurements);
    };
  }, [openId, updateMeasurements]);

  const listClassName = isHome ? "faq-list" : `guide-accordion ${className}`.trim();
  const wrapClassName = [
    isHome ? "faq-panel-wrap" : "guide-accordion-wrap",
    openId ? "is-faq-open" : "",
    openId && isLastOpen ? "is-faq-open-last" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const wrapStyle =
    openId && answerOffset > 0
      ? {
          "--faq-answer-offset": `${answerOffset}px`,
          ...(answerMaxHeight ? { "--faq-answer-max-height": `${answerMaxHeight}px` } : {})
        }
      : answerMaxHeight
        ? { "--faq-answer-max-height": `${answerMaxHeight}px` }
        : undefined;

  const answerStyle = answerMaxHeight ? { maxHeight: `${answerMaxHeight}px` } : undefined;

  return (
    <div className={wrapClassName} style={wrapStyle}>
      <div className={listClassName} role="list">
        {items.map((item, index) => {
          const isOpen = openId === item.id;
          const prefix = isHome ? "faq" : "guide-accordion";
          const buttonId = `${prefix}-button-${item.id}`;
          const panelId = `${prefix}-panel-${item.id}`;
          const number = String(index + 1).padStart(2, "0");
          const question = capitalize(item.question);

          const answerWrapClass = [
            isHome ? "faq-answer-wrap" : "guide-accordion-answer-wrap",
            isOpen && isClamped ? "is-clamped" : ""
          ]
            .filter(Boolean)
            .join(" ");

          const content = (
            <>
              <h3
                className={isHome ? "faq-question-heading" : undefined}
                role={isHome ? "heading" : undefined}
                aria-level={isHome ? 3 : undefined}
              >
                <button
                  id={buttonId}
                  type="button"
                  className={isHome ? "faq-trigger" : "guide-accordion-trigger"}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleToggle(item.id)}
                >
                  <span className={isHome ? "faq-num" : "guide-accordion-num"} aria-hidden="true">
                    {number}
                  </span>
                  <span className={isHome ? "faq-question-text" : "guide-accordion-question"}>{question}</span>
                  {isHome ? (
                    <span className="faq-toggle" aria-hidden="true">
                      +
                    </span>
                  ) : (
                    <motion.span
                      className="guide-accordion-chevron"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.25 }}
                      aria-hidden="true"
                    >
                      <ChevronDown size={18} strokeWidth={2.5} />
                    </motion.span>
                  )}
                </button>
              </h3>

              <div
                id={panelId}
                ref={isOpen ? answerRef : undefined}
                className={answerWrapClass}
                style={isOpen ? answerStyle : undefined}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
              >
                <div className={isHome ? "faq-content-inner" : "guide-accordion-panel-inner"}>
                  <p>{linkInternalTerms(item.answer, new Set(), linkExcludeKeys)}</p>
                  {item.formula ? (
                    <p className="guide-accordion-formula">
                      <span className="guide-equation-pill guide-formula-chip">{item.formula}</span>
                    </p>
                  ) : null}
                </div>
              </div>
            </>
          );

          if (isHome) {
            return (
              <article key={item.id} className={`faq-item${isOpen ? " is-open" : ""}`} role="listitem">
                {content}
              </article>
            );
          }

          return (
            <motion.article
              key={item.id}
              className={`guide-accordion-item${isOpen ? " is-open" : ""}`}
              role="listitem"
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: reduceMotion ? 0 : 0.42, ease, delay: reduceMotion ? 0 : index * 0.04 }}
            >
              {content}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
