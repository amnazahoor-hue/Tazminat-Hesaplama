"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { capitalizeHeadingText } from "@/utils/capitalizeHeading";
import { useMotionPrefs } from "@/components/guide/motion/useMotionPrefs";
import { linkInternalTerms } from "@/utils/linkInternalTerms";

const CLAMP_TOLERANCE_PX = 8;
const MOBILE_FAQ_MQ = "(max-width: 900px)";

function getFooterGap() {
  if (typeof window === "undefined") return 32;
  return window.matchMedia(MOBILE_FAQ_MQ).matches ? 40 : 32;
}

function measureAnswerHeight(answerEl) {
  const inner = answerEl.querySelector(".faq-content-inner, .guide-accordion-panel-inner");
  const measureTarget = inner || answerEl;

  const prevMax = answerEl.style.maxHeight;
  answerEl.style.maxHeight = "none";
  answerEl.style.overflowY = "visible";

  const fullHeight = Math.ceil(measureTarget.scrollHeight + 2);
  answerEl.style.maxHeight = prevMax;
  answerEl.style.overflowY = "";

  return fullHeight;
}

function measureOpenAnswer(answerEl, isLastOpen) {
  const fullHeight = measureAnswerHeight(answerEl);

  const footer = document.querySelector(".site-footer");
  if (!footer) {
    return { offset: fullHeight, maxHeight: null, clamped: false };
  }

  const answerTop = answerEl.getBoundingClientRect().top;
  const footerTop = footer.getBoundingClientRect().top;
  const available = Math.floor(footerTop - answerTop - getFooterGap());

  if (available <= 0) {
    return { offset: 72, maxHeight: 72, clamped: true };
  }

  const needsClamp = available + CLAMP_TOLERANCE_PX < fullHeight;
  const visibleHeight = needsClamp ? Math.max(72, available) : fullHeight;

  if (isLastOpen) {
    return {
      offset: visibleHeight,
      maxHeight: needsClamp ? visibleHeight : null,
      clamped: needsClamp
    };
  }

  return {
    offset: visibleHeight,
    maxHeight: needsClamp ? visibleHeight : null,
    clamped: needsClamp
  };
}

export default function FaqAccordion({ items, className = "", variant = "guide" }) {
  const [openId, setOpenId] = useState(null);
  const [answerOffset, setAnswerOffset] = useState(0);
  const [answerMaxHeight, setAnswerMaxHeight] = useState(null);
  const [isAnswerClamped, setIsAnswerClamped] = useState(false);
  const [isLastOpen, setIsLastOpen] = useState(false);
  const answerRef = useRef(null);
  const { reduceMotion, viewport, ease } = useMotionPrefs();
  const isHome = variant === "home";

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const applyMetrics = useCallback((metrics, lastOpen) => {
    const { offset, maxHeight, clamped } = metrics;
    setIsLastOpen(lastOpen);
    setAnswerOffset((prev) => (prev === offset ? prev : offset));
    setAnswerMaxHeight((prev) => (prev === maxHeight ? prev : maxHeight));
    setIsAnswerClamped((prev) => (prev === clamped ? prev : clamped));
  }, []);

  const updateMeasurements = useCallback(() => {
    const el = answerRef.current;
    if (!el || !openId) {
      setIsLastOpen(false);
      setAnswerOffset(0);
      setAnswerMaxHeight(null);
      setIsAnswerClamped(false);
      return;
    }

    const lastOpen = items.findIndex((item) => item.id === openId) === items.length - 1;
    applyMetrics(measureOpenAnswer(el, lastOpen), lastOpen);
  }, [openId, items, applyMetrics]);

  useLayoutEffect(() => {
    if (!openId) {
      setIsLastOpen(false);
      setAnswerOffset(0);
      setAnswerMaxHeight(null);
      setIsAnswerClamped(false);
      return;
    }

    updateMeasurements();
    const raf1 = requestAnimationFrame(() => {
      updateMeasurements();
      requestAnimationFrame(updateMeasurements);
    });

    const observer = new ResizeObserver(updateMeasurements);
    if (answerRef.current) {
      observer.observe(answerRef.current);
    }

    const onViewportChange = () => updateMeasurements();
    window.addEventListener("resize", onViewportChange);
    window.visualViewport?.addEventListener("resize", onViewportChange);

    return () => {
      cancelAnimationFrame(raf1);
      observer.disconnect();
      window.removeEventListener("resize", onViewportChange);
      window.visualViewport?.removeEventListener("resize", onViewportChange);
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
          const isLastItem = index === items.length - 1;
          const isLastOpenItem = isOpen && isLastItem;
          const prefix = isHome ? "faq" : "guide-accordion";
          const buttonId = `${prefix}-button-${item.id}`;
          const panelId = `${prefix}-panel-${item.id}`;
          const number = String(index + 1).padStart(2, "0");
          const question = isHome ? capitalizeHeadingText(item.question) : item.question;

          const itemClassName = [
            isHome ? "faq-item" : "guide-accordion-item",
            isOpen ? "is-open" : "",
            isLastOpenItem ? "is-open-last" : ""
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
                className={
                  (isHome ? "faq-answer-wrap" : "guide-accordion-answer-wrap") + (isOpen ? answerClampClass : "")
                }
                style={isOpen ? answerStyle : undefined}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
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
              <article key={item.id} className={itemClassName} role="listitem">
                {content}
              </article>
            );
          }

          return (
            <motion.article
              key={item.id}
              className={itemClassName}
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
