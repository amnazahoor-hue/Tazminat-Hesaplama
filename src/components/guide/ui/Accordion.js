"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMotionPrefs } from "../motion/useMotionPrefs";

export default function Accordion({ items, className = "" }) {
  const [openId, setOpenId] = useState("");
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <div className={`guide-accordion ${className}`.trim()} role="list">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const buttonId = `guide-accordion-${item.id}`;
        const panelId = `guide-accordion-panel-${item.id}`;

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
            <h3>
              <button
                id={buttonId}
                type="button"
                className="guide-accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId((prev) => (prev === item.id ? "" : item.id))}
              >
                <span className="guide-accordion-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="guide-accordion-question">{item.question}</span>
                <motion.span
                  className="guide-accordion-chevron"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25 }}
                  aria-hidden="true"
                >
                  <ChevronDown size={18} strokeWidth={2.5} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  className="guide-accordion-panel"
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, ease }}
                >
                  <div className="guide-accordion-panel-inner">
                    <p>{item.answer}</p>
                    {item.formula ? (
                      <p className="guide-accordion-formula">
                        <span className="guide-equation-pill guide-formula-chip">{item.formula}</span>
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
