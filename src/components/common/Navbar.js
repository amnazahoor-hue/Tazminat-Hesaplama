"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { id: "hesapla", label: "Hesapla" },
  { id: "nasil-hesaplanir", label: "Nasıl Hesaplanır" },
  { id: "tazminat-turleri", label: "Tazminat Türleri" },
  { id: "ornekler", label: "Örnekler" },
  { id: "sss", label: "SSS" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hesapla");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const navItems = useMemo(() => NAV_ITEMS, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return undefined;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.2, 0.5, 0.8] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, navItems]);

  const scrollToSection = (sectionId, shouldFocusStartDate = false) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (shouldFocusStartDate) {
      window.setTimeout(() => {
        const input = document.getElementById("giris");
        if (input) input.focus();
      }, 550);
    }
  };

  const handleNavClick = (event, sectionId) => {
    if (!isHome) return;
    event.preventDefault();
    setOpen(false);
    setActiveSection(sectionId);
    scrollToSection(sectionId, false);
  };

  const handleCtaClick = (event) => {
    if (!isHome) return;
    event.preventDefault();
    setOpen(false);
    scrollToSection("hesapla", true);
  };

  const handleLogoClick = (event) => {
    setOpen(false);
    if (!isHome) return;
    event.preventDefault();
    setActiveSection("hesapla");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Anasayfa" onClick={handleLogoClick}>
          <span className="brand-mark">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M7 8h10M5 11.5c2.1 0 3.5-1.4 5-3.5 1.5 2.1 2.9 3.5 5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M5.5 11.5c0 2 1.6 3.5 3.5 3.5s3.5-1.5 3.5-3.5M12.5 11.5c0 2 1.6 3.5 3.5 3.5s3.5-1.5 3.5-3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-title">Tazminat Hesaplama</span>
            <span className="brand-sub">İŞ KANUNU 4857</span>
          </span>
        </Link>
        <nav className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(event) => handleNavClick(event, item.id)}
              className={isHome && activeSection === item.id ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={isHome ? "/#hesapla" : "/#hesapla"}
          className="header-calc-btn"
          onClick={(event) => {
            if (isHome) {
              handleCtaClick(event);
              return;
            }
            event.preventDefault();
            router.push("/#hesapla");
          }}
        >
          Hesapla <span aria-hidden="true">→</span>
        </a>
        <button className={`menu-btn${open ? " is-open" : ""}`} onClick={() => setOpen((v) => !v)} aria-label="Menü">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      {open && (
        <div className="mobile-menu container">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(event) => {
                if (isHome) handleNavClick(event, item.id);
                else {
                  event.preventDefault();
                  setOpen(false);
                  router.push(`/#${item.id}`);
                }
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#hesapla"
            className="mobile-cta"
            onClick={(event) => {
              if (isHome) handleCtaClick(event);
              else {
                event.preventDefault();
                setOpen(false);
                router.push("/#hesapla");
              }
            }}
          >
            Hesapla
          </a>
          <Link href="/gizlilik-politikasi" onClick={() => setOpen(false)}>
            Gizlilik
          </Link>
          <Link href="/kullanim-sartlari" onClick={() => setOpen(false)}>
            Sartlar
          </Link>
          <Link href="/yasal-uyari" onClick={() => setOpen(false)}>
            Yasal Uyari
          </Link>
        </div>
      )}
    </header>
  );
}
