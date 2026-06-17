"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { capitalizeHeadingText } from "@/utils/capitalizeHeading";
import { useMotionPrefs } from "@/components/guide/motion/useMotionPrefs";
import { linkInternalTerms } from "@/utils/linkInternalTerms";

const FOOTER_GAP = 32;
const CLAMP_TOLERANCE_PX = 12;

function measureOpenAnswer(answerEl) {
  const prevMax = answerEl.style.maxHeight;
  const prevOverflow = answerEl.style.overflowY;
  answerEl.style.maxHeight = "none";
  answerEl.style.overflowY = "visible";
  const fullHeight = Math.ceil(answerEl.scrollHeight);
  answerEl.style.maxHeight = prevMax;
  answerEl.style.overflowY = prevOverflow;

  const footer = document.querySelector(".site-footer");
  if (!footer) {
    return { offset: fullHeight, maxHeight: null, clamped: false };
  }

  const answerTop = answerEl.getBoundingClientRect().top;
  const footerTop = footer.getBoundingClientRect().top;
  const available = Math.floor(footerTop - answerTop - FOOTER_GAP);
  const needsClamp = available + CLAMP_TOLERANCE_PX < fullHeight;

  if (!needsClamp) {
    return { offset: fullHeight, maxHeight: null, clamped: false };
  }

  const visibleHeight = Math.max(64, Math.min(fullHeight, available));
  return {
    offset: visibleHeight,
    maxHeight: visibleHeight,
    clamped: true
  };
}

export default function FaqAccordion({ items, className = "", variant = "guide" }) {
  const [openId, setOpenId] = useState(null);
  const [answerOffset, setAnswerOffset] = useState(0);
  const [answerMaxHeight, setAnswerMaxHeight] = useState(null);
  const [isAnswerClamped, setIsAnswerClamped] = useState(false);
  const answerRef = useRef(null);
  const { reduceMotion, viewport, ease } = useMotionPrefs();
  const isHome = variant === "home";

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const updateMeasurements = useCallback(() => {
    const el = answerRef.current;
    if (!el || !openId) {
      setAnswerOffset(0);
      setAnswerMaxHeight(null);
      setIsAnswerClamped(false);
      return;
    }

    const { offset, maxHeight, clamped } = measureOpenAnswer(el);
    setAnswerOffset(offset);
    setAnswerMaxHeight(maxHeight);
    setIsAnswerClamped(clamped);
  }, [openId]);

  useLayoutEffect(() => {
    if (!openId) {
      setAnswerOffset(0);
      setAnswerMaxHeight(null);
      setIsAnswerClamped(false);
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
  const wrapClassName = [isHome ? "faq-panel-wrap" : "guide-accordion-wrap", openId ? "is-faq-open" : ""]
    .filter(Boolean)
    .join(" ");

  const wrapStyle = openId
    ? {
        "--faq-answer-offset": `${answerOffset}px`,
        ...(answerMaxHeight ? { "--faq-answer-max-height": `${answerMaxHeight}px` } : {})
      }
    : undefined;

  const answerStyle = answerMaxHeight ? { maxHeight: `${answerMaxHeight}px` } : undefined;
  const answerClampClass = isAnswerClamped ? " is-clamped" : "";

  return (
    <div className={wrapClassName} style={wrapStyle}>
      <div className={listClassName} role="list">
        {items.map((item, index) => {
          const isOpen = openId === item.id;
          const prefix = isHome ? "faq" : "guide-accordion";
          const buttonId = `${prefix}-button-${item.id}`;
          const panelId = `${prefix}-panel-${item.id}`;
          const number = String(index + 1).padStart(2, "0");
          const question = isHome ? capitalizeHeadingText(item.question) : item.question;

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
                className={
                  (isHome ? "faq-answer-wrap" : "guide-accordion-answer-wrap") + (isOpen ? answerClampClass : "")
                }
                style={isOpen ? answerStyle : undefined}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
              >
                <div className={isHome ? "faq-content-inner" : "guide-accordion-panel-inner"}>
                  <p>{linkInternalTerms(item.answer)}</p>
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
