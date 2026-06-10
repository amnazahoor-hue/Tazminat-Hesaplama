"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/config/images";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = [
  {
    id: 1,
    className: "how-steps-card--1",
    keyword: "MAAŞ",
    text: "Yıllık maaşınızı veya haftalık ücretinizi girin.",
    image: IMAGES.home.freeCalcOffice
  },
  {
    id: 2,
    className: "how-steps-card--2",
    keyword: "SÜRE",
    text: "Şirketteki toplam hizmet sürenizi ekleyin.",
    image: IMAGES.home.employerWhyBg
  },
  {
    id: 3,
    className: "how-steps-card--3",
    keyword: "YAŞ",
    text: "Yaşa bağlı düzenlemeler uygulanıyorsa, yaşınızı girin.",
    image: IMAGES.home.featureResultsSalary
  },
  {
    id: 4,
    className: "how-steps-card--4",
    keyword: "EKLER",
    text: "Bonuslar veya kullanılmamış izinler gibi ek tazminatları ekleyin.",
    image: IMAGES.home.featureTaxCoin
  },
  {
    id: 5,
    className: "how-steps-card--5",
    keyword: "POLİTİKA",
    text: "Biliniyorsa, şirketinizin kıdem tazminatı politikasını seçin.",
    image: IMAGES.home.diffPurpleSalary
  },
  {
    id: 6,
    className: "how-steps-card--6",
    keyword: "HESAPLA",
    text: "Tahmini tutarınızı anında oluşturmak için hesapla düğmesine tıklayın.",
    image: IMAGES.home.introSeveranceBg
  }
];

const AUTO_PLAY_MS = 4000;
const ORBIT_RING_SPIN_MS = 52000;
const ORBIT_INNER_SPIN_MS = 38000;
const TOTAL_STEPS = STEPS.length;
const SWIPE_THRESHOLD_PX = 48;
const ORBIT_MIN_SIZE = 280;
const ORBIT_MAX_SIZE = 560;
const STACK_BREAKPOINT_PX = 900;

function padStepNumber(id) {
  return String(id).padStart(2, "0");
}

function getCardTitle(text) {
  const commaIndex = text.indexOf(",");
  if (commaIndex > 0) {
    return text.slice(0, commaIndex).trim();
  }

  const veyaIndex = text.indexOf(" veya ");
  if (veyaIndex > 0) {
    return text.slice(0, veyaIndex).trim();
  }

  const icinIndex = text.lastIndexOf(" için ");
  if (icinIndex > 0) {
    return text.slice(0, icinIndex + 6).trim();
  }

  return text;
}

function getNodePosition(index, centerX, centerY, radius) {
  const angleDeg = index * (360 / TOTAL_STEPS) - 90;
  const angleRad = (angleDeg * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleRad),
    y: centerY + radius * Math.sin(angleRad),
    angleDeg,
    angleRad
  };
}

function computeOrbitGeometry(containerSize) {
  const size = containerSize;
  const centerX = size / 2;
  const centerY = size / 2;
  const nodeSize = size * 0.155;
  const nodeRadius = nodeSize / 2;
  const edgePadding = size * 0.04;
  const radiusTarget = size * 0.38;
  const maxRadius = centerX - edgePadding - nodeRadius;
  const radius = Math.min(radiusTarget, maxRadius);
  const innerRing = radius * 0.58;

  const nodes = STEPS.map((step, index) => ({
    step,
    index,
    ...getNodePosition(index, centerX, centerY, radius)
  }));

  return {
    size,
    centerX,
    centerY,
    radius,
    innerRing,
    nodeSize,
    centerSize: size * 0.17,
    nodes
  };
}

const orbitVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12
    }
  }
};

const centerVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 }
  }
};

const guideVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.45 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 24 }
  }
};

const cardVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 28 : -28
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeInOut" }
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -28 : 28,
    transition: { duration: 0.35, ease: "easeInOut" }
  })
};

export default function HowStepsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [orbitSize, setOrbitSize] = useState(360);
  const [direction, setDirection] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const rootRef = useRef(null);
  const orbitRef = useRef(null);
  const detailRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const activeStep = STEPS[activeIndex];
  const cardTitle = getCardTitle(activeStep.text);

  const geometry = useMemo(() => computeOrbitGeometry(orbitSize), [orbitSize]);
  const activeNode = geometry.nodes[activeIndex];
  const shouldSpinOrbit = !prefersReducedMotion && isInView;
  const ringSpinDuration = isHovered ? ORBIT_RING_SPIN_MS * 1.6 : ORBIT_RING_SPIN_MS;
  const innerSpinDuration = isHovered ? ORBIT_INNER_SPIN_MS * 1.6 : ORBIT_INNER_SPIN_MS;

  const goToStep = useCallback((index) => {
    setActiveIndex((current) => {
      const next = ((index % TOTAL_STEPS) + TOTAL_STEPS) % TOTAL_STEPS;
      setDirection(next > current || (current === TOTAL_STEPS - 1 && next === 0) ? 1 : -1);
      return next;
    });
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % TOTAL_STEPS);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + TOTAL_STEPS) % TOTAL_STEPS);
  }, []);

  useEffect(() => {
    const orbitNode = orbitRef.current;
    const detailNode = detailRef.current;
    if (!orbitNode) return undefined;

    const updateSize = () => {
      const layoutWidth = rootRef.current?.getBoundingClientRect().width ?? orbitNode.getBoundingClientRect().width;
      const orbitWidth = orbitNode.getBoundingClientRect().width;
      const isStacked = layoutWidth < STACK_BREAKPOINT_PX;
      const inset = isStacked ? 14 : 10;
      const availableWidth = Math.max(ORBIT_MIN_SIZE, orbitWidth - inset * 2);

      let targetSize = availableWidth * (isStacked ? 0.96 : 0.98);

      if (!isStacked && detailNode) {
        const detailHeight = detailNode.getBoundingClientRect().height;
        if (detailHeight > 220) {
          targetSize = Math.min(targetSize, detailHeight * 0.94);
        }
      }

      targetSize = Math.min(ORBIT_MAX_SIZE, targetSize);
      targetSize = Math.max(ORBIT_MIN_SIZE, Math.min(targetSize, availableWidth));
      setOrbitSize(Math.round(targetSize));
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(orbitNode);
    if (detailNode) observer.observe(detailNode);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onTouchStart = useCallback((event) => {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
    touchStartY.current = event.touches[0]?.clientY ?? 0;
  }, []);

  const onTouchEnd = useCallback(
    (event) => {
      const endX = event.changedTouches[0]?.clientX ?? 0;
      const endY = event.changedTouches[0]?.clientY ?? 0;
      const deltaX = touchStartX.current - endX;
      const deltaY = Math.abs(touchStartY.current - endY);

      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) < deltaY) return;

      if (deltaX > 0) {
        goNext();
      } else {
        goPrev();
      }
    },
    [goNext, goPrev]
  );

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    },
    [goNext, goPrev]
  );

  return (
    <div
      ref={rootRef}
      className={`how-steps-orbit${prefersReducedMotion ? " is-reduced-motion" : ""}${shouldSpinOrbit ? " is-spinning" : ""}`}
      style={{
        "--how-steps-duration": `${AUTO_PLAY_MS}ms`,
        "--orbit-stage-size": `${geometry.size}px`
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Kıdem tazminatı hesaplama adımları"
    >
      <div className="how-steps-orbit-layout">
        <div
          ref={orbitRef}
          className="how-steps-orbit-navigator"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="how-steps-orbit-stage-shell">
            <motion.div
              className="how-steps-orbit-stage"
              style={{
                width: geometry.size,
                height: geometry.size,
                "--orbit-size": `${geometry.size}px`,
                "--orbit-node-size": `${Math.round(geometry.nodeSize)}px`,
                "--orbit-center-size": `${Math.round(geometry.centerSize)}px`
              }}
              variants={orbitVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
            >
              <motion.svg
                className="how-steps-orbit-svg"
                viewBox={`0 0 ${geometry.size} ${geometry.size}`}
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
                variants={guideVariants}
              >
                <motion.g
                  style={{ transformOrigin: `${geometry.centerX}px ${geometry.centerY}px` }}
                  animate={shouldSpinOrbit ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    shouldSpinOrbit
                      ? { duration: innerSpinDuration / 1000, repeat: Infinity, ease: "linear" }
                      : { duration: 0 }
                  }
                >
                  <motion.circle
                    className="how-steps-orbit-ring how-steps-orbit-ring--inner"
                    cx={geometry.centerX}
                    cy={geometry.centerY}
                    r={geometry.innerRing}
                    fill="none"
                  />
                </motion.g>
                <motion.g
                  style={{ transformOrigin: `${geometry.centerX}px ${geometry.centerY}px` }}
                  animate={shouldSpinOrbit ? { rotate: -360 } : { rotate: 0 }}
                  transition={
                    shouldSpinOrbit
                      ? { duration: ringSpinDuration / 1000, repeat: Infinity, ease: "linear" }
                      : { duration: 0 }
                  }
                >
                  <motion.circle
                    className="how-steps-orbit-ring how-steps-orbit-ring--primary"
                    cx={geometry.centerX}
                    cy={geometry.centerY}
                    r={geometry.radius}
                    fill="none"
                  />
                </motion.g>
                <motion.circle
                  className="how-steps-orbit-active-dot"
                  r={Math.max(5, geometry.size * 0.014)}
                  initial={false}
                  animate={{
                    cx: activeNode.x,
                    cy: activeNode.y,
                    opacity: 0.9
                  }}
                  transition={{
                    cx: { type: "spring", stiffness: 280, damping: 26 },
                    cy: { type: "spring", stiffness: 280, damping: 26 },
                    opacity: { duration: 0.2 }
                  }}
                />
              </motion.svg>

              <div
                className="how-steps-orbit-center-anchor"
                style={{ left: geometry.centerX, top: geometry.centerY }}
              >
                <motion.div className="how-steps-orbit-center" variants={centerVariants}>
                  <div className="how-steps-orbit-center-glow" aria-hidden="true" />
                  <Image
                    src={IMAGES.logo}
                    alt="Tazminat Hesaplama logosu"
                    width={160}
                    height={160}
                    className="how-steps-orbit-center-logo"
                    unoptimized
                  />
                </motion.div>
              </div>

              {geometry.nodes.map(({ step, index, x, y }) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={step.id}
                    className="how-steps-orbit-node-anchor"
                    style={{ left: x, top: y }}
                  >
                    <motion.div className="how-steps-orbit-node-wrap" variants={nodeVariants}>
                      <motion.button
                        type="button"
                        className={`how-steps-orbit-node${isActive ? " is-active" : ""}`}
                        aria-label={`Adım ${padStepNumber(step.id)}: ${step.text}`}
                        aria-current={isActive ? "step" : undefined}
                        onClick={() => goToStep(index)}
                        style={{ transformOrigin: "center center" }}
                        animate={{
                          scale: isActive ? 1.12 : 1,
                          boxShadow: isActive
                            ? "0 0 0 7px rgba(79, 70, 229, 0.16), 0 18px 40px rgba(79, 70, 229, 0.32)"
                            : "0 10px 24px rgba(15, 23, 42, 0.08)"
                        }}
                        transition={{
                          scale: { type: "spring", stiffness: 380, damping: 26 },
                          boxShadow: { type: "spring", stiffness: 380, damping: 26 }
                        }}
                        whileHover={
                          prefersReducedMotion || isActive
                            ? undefined
                            : { scale: 1.08, borderColor: "rgba(79, 70, 229, 0.42)" }
                        }
                      >
                        <span className="how-steps-orbit-node-num">{padStepNumber(step.id)}</span>
                        <span className="how-steps-orbit-node-keyword">{step.keyword}</span>
                      </motion.button>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="how-steps-orbit-detail" ref={detailRef}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={activeStep.id}
              className="how-steps-detail-card"
              custom={direction}
              variants={prefersReducedMotion ? undefined : cardVariants}
              initial={prefersReducedMotion ? false : "enter"}
              animate={prefersReducedMotion ? undefined : "center"}
              exit={prefersReducedMotion ? undefined : "exit"}
            >
              <div className="how-steps-detail-card-accent" aria-hidden="true" />

              <div className="how-steps-detail-media">
                <Image
                  src={activeStep.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="how-steps-detail-image"
                  unoptimized
                />
                <div className="how-steps-detail-media-overlay" aria-hidden="true" />
                <span className="how-steps-detail-pill">
                  ADIM {padStepNumber(activeStep.id)} · {activeStep.keyword}
                </span>
              </div>

              <div className="how-steps-detail-body">
                <span className="how-steps-detail-number">{padStepNumber(activeStep.id)}</span>
                {cardTitle !== activeStep.text ? (
                  <h3 className="how-steps-detail-title">{cardTitle}</h3>
                ) : null}
                <p className="how-steps-detail-text">{activeStep.text}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <div className="how-steps-orbit-controls">
        <button
          type="button"
          className="how-steps-orbit-nav how-steps-orbit-nav--prev"
          onClick={goPrev}
          aria-label="Önceki adım"
        >
          <ChevronLeft size={22} strokeWidth={2.5} aria-hidden="true" />
        </button>

        <div className="how-steps-orbit-dots" role="tablist" aria-label="Adım slaytları">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              type="button"
              role="tab"
              className={`how-steps-orbit-dot${activeIndex === index ? " is-active" : ""}`}
              aria-selected={activeIndex === index}
              aria-label={`Adım ${step.id}`}
              onClick={() => goToStep(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className="how-steps-orbit-nav how-steps-orbit-nav--next"
          onClick={goNext}
          aria-label="Sonraki adım"
        >
          <ChevronRight size={22} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
