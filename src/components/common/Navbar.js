"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { id: "hesapla", label: "Hesapla" },
  { id: "nasil-hesaplanir", label: "Nasıl Hesaplanır?" },
  { id: "tazminat-turleri", label: "Tazminat Türleri" },
  { id: "sss", label: "SSS" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hesapla");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/" || pathname === "/kidem-tazminati-hesaplamasi";

  const navItems = useMemo(() => NAV_ITEMS, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return undefined;
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  const navigateTo = (event, href, sectionId) => {
    if (isHome && sectionId) {
      handleNavClick(event, sectionId);
      return;
    }
    event.preventDefault();
    setOpen(false);
    router.push(href);
  };

  const handleCalcClick = (event) => {
    if (isHome) {
      handleCtaClick(event);
      return;
    }
    event.preventDefault();
    router.push("/kidem-tazminati-hesaplamasi#hesapla");
  };

  return (
    <header
      className={`site-header${isHome ? " is-home" : ""}${scrolled ? " is-scrolled" : ""}${open ? " is-menu-open" : ""}`}
    >
      <div className="header-progress" aria-hidden="true">
        <span className="header-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="header-shell">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Anasayfa" onClick={handleLogoClick}>
            <span className="brand-mark">
              <Image src="/logo.png" alt="" width={88} height={88} priority />
            </span>
            <span className="brand-text">
              <span className="brand-title">Tazminat Hesaplama</span>
              <span className="brand-sub">
                <span className="brand-dot" aria-hidden="true" />
                İş Kanunu 4857
              </span>
            </span>
          </Link>

          <nav className="nav-pill" aria-label="Sayfa bölümleri">
            <div className="nav-pill-track">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/kidem-tazminati-hesaplamasi#${item.id}`}
                  onClick={(event) => handleNavClick(event, item.id)}
                  className={`nav-pill-link${isHome && activeSection === item.id ? " active" : ""}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="header-actions">
            {isHome ? (
              <a
                href="/kidem-tazminati-hesaplamasi#hesapla"
                className="header-calc-btn header-calc-btn--nav"
                onClick={handleCalcClick}
              >
                Şimdi Hesapla
                <span className="header-calc-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : (
              <>
                <span className="header-trust-badge">
                  <span className="header-trust-dot" aria-hidden="true" />
                  Ücretsiz
                </span>
                <a
                  href="/kidem-tazminati-hesaplamasi#hesapla"
                  className="header-calc-btn"
                  onClick={handleCalcClick}
                >
                  Hesapla
                  <span className="header-calc-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </>
            )}
            <button
              type="button"
              className={`menu-btn${open ? " is-open" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-drawer${open ? " is-open" : ""}`} aria-hidden={!open}>
        <button type="button" className="mobile-drawer-backdrop" aria-label="Menüyü kapat" onClick={() => setOpen(false)} />
        <div className="mobile-drawer-panel" role="dialog" aria-modal="true" aria-label="Navigasyon menüsü">
          <div className="mobile-drawer-head">
            <span className="mobile-drawer-title">Menü</span>
            <button type="button" className="mobile-drawer-close" aria-label="Kapat" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <nav className="mobile-drawer-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/kidem-tazminati-hesaplamasi#${item.id}`}
                className={isHome && activeSection === item.id ? "active" : ""}
                onClick={(event) => navigateTo(event, `/kidem-tazminati-hesaplamasi#${item.id}`, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/kidem-tazminati-hesaplamasi#hesapla"
            className="mobile-cta"
            onClick={(event) => {
              if (isHome) handleCtaClick(event);
              else navigateTo(event, "/kidem-tazminati-hesaplamasi#hesapla", null);
            }}
          >
            Tazminatı Hesapla
          </a>
          <div className="mobile-drawer-footer">
            <Link href="/gizlilik-politikasi" onClick={() => setOpen(false)}>
              Gizlilik
            </Link>
            <Link href="/kullanim-sartlari" onClick={() => setOpen(false)}>
              Şartlar
            </Link>
            <Link href="/yasal-uyari" onClick={() => setOpen(false)}>
              Yasal Uyarı
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
