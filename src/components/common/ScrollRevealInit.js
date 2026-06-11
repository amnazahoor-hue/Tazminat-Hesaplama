"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR =
  ".scroll-reveal:not(.scroll-reveal--instant), [data-scroll-reveal], .scroll-reveal-stagger";

function revealElement(element) {
  element.classList.add("is-scroll-visible");
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewHeight * 0.94 && rect.bottom > -24;
}

function collectRevealTargets() {
  return Array.from(document.querySelectorAll(REVEAL_SELECTOR)).filter(
    (element) => !element.classList.contains("is-scroll-visible")
  );
}

export default function ScrollRevealInit() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll(".scroll-reveal--instant, .scroll-reveal--instant [data-scroll-reveal]").forEach(revealElement);

    const targets = collectRevealTargets();

    if (reducedMotion) {
      targets.forEach(revealElement);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealElement(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px 4% 0px" }
    );

    const observed = new WeakSet();

    const observeTargets = () => {
      collectRevealTargets().forEach((element) => {
        if (observed.has(element)) return;

        if (isInViewport(element)) {
          revealElement(element);
          return;
        }

        observed.add(element);
        observer.observe(element);
      });
    };

    observeTargets();

    const timer = window.setTimeout(observeTargets, 0);

    let mutationTimer;
    const mutationObserver = new MutationObserver(() => {
      window.clearTimeout(mutationTimer);
      mutationTimer = window.setTimeout(observeTargets, 48);
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(mutationTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
