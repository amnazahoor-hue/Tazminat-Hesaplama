"use client";

import AppImage from "@/components/common/AppImage";
import { getImageMeta } from "@/config/images";

export default function HeroDesktopVisual({ carouselImages, activeHeroSlide }) {
  return (
    <div className="hero-visual-stage hero-visual-stage--desktop">
                  <div className="hero-visual-bg" aria-hidden="true">
                    <span className="hero-visual-bg-mesh" />
                    <svg className="hero-visual-bg-art hero-visual-bg-art--base" viewBox="0 0 520 520" fill="none" aria-hidden="true">
                      <defs>
                        <radialGradient id="hero-bg-glow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#c6f24e" stopOpacity="0.28" />
                          <stop offset="42%" stopColor="#7c3aed" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="hero-bg-arc" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#c6f24e" stopOpacity="0.85" />
                          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="hero-bg-panel" x1="72" y1="88" x2="188" y2="204" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ffffff" stopOpacity="0.2" />
                          <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
                        </linearGradient>
                        <filter id="hero-bg-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="6" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <circle cx="260" cy="260" r="236" fill="url(#hero-bg-glow)" />
                      <circle cx="260" cy="260" r="214" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="5 11" />
                      <circle cx="260" cy="260" r="182" stroke="rgba(198,242,78,0.24)" strokeWidth="1.5" strokeDasharray="9 15" />
                      <circle cx="260" cy="260" r="148" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
                      <path d="M96 338 C168 246, 352 246, 424 338" stroke="url(#hero-bg-arc)" strokeWidth="2.5" strokeLinecap="round" opacity="0.62" />
                      <path d="M124 182 C206 108, 314 108, 396 182" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M148 404 C204 360, 316 360, 372 404" stroke="rgba(198,242,78,0.28)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 8" />
                      <g filter="url(#hero-bg-soft-glow)">
                        <rect x="72" y="88" width="116" height="132" rx="18" fill="url(#hero-bg-panel)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                        <rect x="88" y="104" width="84" height="28" rx="8" fill="rgba(255,255,255,0.14)" />
                        <rect x="96" y="144" width="18" height="44" rx="5" fill="rgba(198,242,78,0.55)" />
                        <rect x="120" y="156" width="18" height="32" rx="5" fill="rgba(255,255,255,0.28)" />
                        <rect x="144" y="136" width="18" height="52" rx="5" fill="rgba(124,58,237,0.45)" />
                        <rect x="168" y="148" width="18" height="40" rx="5" fill="rgba(255,255,255,0.22)" />
                        <path d="M92 196h76" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
                      </g>
                      <g filter="url(#hero-bg-soft-glow)">
                        <rect x="344" y="108" width="108" height="124" rx="18" fill="url(#hero-bg-panel)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                        <rect x="360" y="124" width="76" height="22" rx="7" fill="rgba(79,70,229,0.35)" />
                        <rect x="360" y="156" width="56" height="7" rx="3.5" fill="rgba(255,255,255,0.24)" />
                        <rect x="360" y="170" width="68" height="7" rx="3.5" fill="rgba(255,255,255,0.18)" />
                        <rect x="360" y="184" width="44" height="7" rx="3.5" fill="rgba(255,255,255,0.14)" />
                        <circle cx="384" cy="206" r="10" fill="rgba(198,242,78,0.75)" />
                        <path d="M380 206l3 3 7-7" stroke="#1a2e05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <g className="hero-bg-float-card">
                        <rect x="356" y="332" width="92" height="92" rx="20" fill="rgba(79,70,229,0.28)" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
                        <rect x="374" y="352" width="56" height="40" rx="10" fill="rgba(255,255,255,0.12)" />
                        <path d="M382 378h18M382 368h40" stroke="rgba(255,255,255,0.42)" strokeWidth="2" strokeLinecap="round" />
                        <text x="402" y="386" textAnchor="middle" fill="#c6f24e" fontSize="16" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                          ₺
                        </text>
                      </g>
                      <circle cx="108" cy="372" r="6" fill="#c6f24e" opacity="0.85" />
                      <circle cx="418" cy="78" r="5" fill="#c6f24e" opacity="0.7" />
                      <circle cx="458" cy="278" r="4" fill="#ffffff" opacity="0.5" />
                      <circle cx="62" cy="242" r="3.5" fill="#ffffff" opacity="0.4" />
                    </svg>
                    <svg className="hero-visual-bg-art hero-visual-bg-art--orbit" viewBox="0 0 520 520" fill="none" aria-hidden="true">
                      <g className="hero-bg-orbit hero-bg-orbit--outer">
                        <circle cx="260" cy="260" r="198" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 12" />
                        <g className="hero-bg-orbit-item hero-bg-orbit-item--1">
                          <circle cx="260" cy="62" r="18" fill="rgba(255,255,255,0.1)" stroke="rgba(198,242,78,0.35)" strokeWidth="1.5" />
                          <text x="260" y="67" textAnchor="middle" fill="#c6f24e" fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                            ₺
                          </text>
                        </g>
                        <g className="hero-bg-orbit-item hero-bg-orbit-item--2">
                          <rect x="442" y="246" width="36" height="36" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                          <path d="M452 260h16M452 268h10" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
                        </g>
                        <g className="hero-bg-orbit-item hero-bg-orbit-item--3">
                          <circle cx="78" cy="260" r="18" fill="rgba(124,58,237,0.28)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
                          <path d="M72 260h12M78 254v12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                        </g>
                      </g>
                      <g className="hero-bg-orbit hero-bg-orbit--inner">
                        <circle cx="260" cy="260" r="156" stroke="rgba(198,242,78,0.14)" strokeWidth="1" strokeDasharray="6 10" />
                        <g className="hero-bg-orbit-item hero-bg-orbit-item--4">
                          <rect x="246" y="418" width="28" height="28" rx="8" fill="rgba(198,242,78,0.22)" stroke="rgba(198,242,78,0.45)" strokeWidth="1.5" />
                          <path d="M254 432l4 4 8-9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <g className="hero-bg-orbit-item hero-bg-orbit-item--5">
                          <circle cx="104" cy="104" r="16" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                          <text x="104" y="109" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
                            4857
                          </text>
                        </g>
                      </g>
                      <path
                        className="hero-bg-flow-line"
                        d="M130 130 C210 180, 310 120, 390 170 S430 300, 360 380"
                        stroke="rgba(198,242,78,0.35)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="6 10"
                      />
                    </svg>
                    <span className="hero-visual-bg-ring hero-visual-bg-ring--1" />
                    <span className="hero-visual-bg-ring hero-visual-bg-ring--2" />
                    <span className="hero-visual-bg-ring hero-visual-bg-ring--3" />
                  </div>
                  <span className="hero-deco hero-deco--halo" aria-hidden="true" />
                  <span className="hero-deco hero-deco--orbit" aria-hidden="true" />
                  <span className="hero-deco hero-deco--orbit hero-deco--orbit-2" aria-hidden="true" />
                  <span className="hero-deco hero-deco--spark hero-deco--spark-1" aria-hidden="true" />
                  <span className="hero-deco hero-deco--spark hero-deco--spark-2" aria-hidden="true" />
                  <span className="hero-deco hero-deco--spark hero-deco--spark-3" aria-hidden="true" />
                  <span className="hero-deco hero-deco--badge" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      <rect x="8" y="10" width="32" height="28" rx="6" stroke="#4f46e5" strokeWidth="2.5" />
                      <path d="M16 20h16M16 26h10" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="34" cy="30" r="6" fill="#c6f24e" stroke="#9acd32" strokeWidth="1.5" />
                    </svg>
                  </span>

                  <svg className="hero-deco hero-deco--arrow" viewBox="0 0 160 320" aria-hidden="true">
                    <defs>
                      <linearGradient id="hero-deco-arrow-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#c6f24e" />
                        <stop offset="55%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                      <filter id="hero-deco-arrow-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M42 286 C 108 228, 126 128, 72 42"
                      fill="none"
                      stroke="url(#hero-deco-arrow-grad)"
                      strokeWidth="11"
                      strokeLinecap="round"
                      filter="url(#hero-deco-arrow-glow)"
                    />
                    <path
                      d="M72 42 L58 66 M72 42 L90 50"
                      fill="none"
                      stroke="url(#hero-deco-arrow-grad)"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                    <text
                      x="112"
                      y="178"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="800"
                      letterSpacing="3"
                      transform="rotate(90 112 178)"
                    >
                      TAZMİNAT
                    </text>
                  </svg>

                  <div className="hero-deco hero-deco--grid" aria-hidden="true">
                    <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
                      <rect x="10" y="10" width="22" height="22" rx="5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                      <rect x="40" y="10" width="22" height="22" rx="5" fill="rgba(238,242,255,0.9)" stroke="rgba(79,70,229,0.35)" strokeWidth="2.5" />
                      <rect x="10" y="40" width="22" height="22" rx="5" fill="rgba(238,242,255,0.9)" stroke="rgba(79,70,229,0.35)" strokeWidth="2.5" />
                      <rect x="40" y="40" width="22" height="22" rx="5" fill="#c6f24e" stroke="#9acd32" strokeWidth="2.5" />
                    </svg>
                  </div>

                  <div className="hero-deco hero-deco--chip" aria-hidden="true">
                    <span className="hero-deco-chip-ring" />
                    <span className="hero-deco-chip-mark">₺</span>
                    <span className="hero-deco-chip-text">Hesaplama</span>
                  </div>

                  <div className="hero-carousel-unit">
                    <div className="hero-carousel-frame">
                      <div className="hero-carousel-ring">
                        <div className="hero-carousel">
                          {carouselImages.map((src, index) => (
                            <div
                              key={src}
                              className={`hero-carousel-slide${activeHeroSlide === index ? " is-active" : ""}`}
                            >
                                <AppImage
                                  src={src}
                                  alt={getImageMeta(src)?.alt}
                                  title={getImageMeta(src)?.title}
                                fill
                                sizes="(max-width: 900px) 84vw, 480px"
                                priority={index === 0}
                                loading="eager"
                                className="hero-carousel-img"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hero-slider-dots" aria-hidden="true">
                      {carouselImages.map((src, index) => (
                        <span key={src} className={activeHeroSlide === index ? "is-active" : ""} />
                      ))}
                    </div>
                  </div>
    </div>
  );
}
