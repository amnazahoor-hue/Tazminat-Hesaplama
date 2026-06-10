"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CalcCta from "@/components/common/CalcCta";
import { buildSectionHref, getPageNav, HOME_PATH, resolvePagePath } from "@/config/pageNav";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const pagePath = resolvePagePath(pathname);
  const pageNav = useMemo(() => getPageNav(pathname), [pathname]);
  const navItems = pageNav?.items ?? [];
  const hasSectionNav = navItems.length > 0;
  const isHome = pagePath === HOME_PATH;
  const ctaTarget = pageNav?.cta ?? { path: HOME_PATH, section: "hesapla", focusInput: "giris" };
  const ctaHref = buildSectionHref(ctaTarget.path, ctaTarget.section);

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
  }, [pagePath]);

  useEffect(() => {
    setActiveSection(navItems[0]?.id ?? "");
  }, [navItems]);

  useEffect(() => {
    if (!hasSectionNav) return undefined;

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
  }, [hasSectionNav, navItems, pagePath]);

  useEffect(() => {
    if (!hasSectionNav) return undefined;

    const hash = window.location.hash.replace("#", "");
    if (!hash) return undefined;

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(hash, false);
      setActiveSection(hash);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hasSectionNav, pagePath]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = (sectionId, shouldFocusStartDate = false, focusInputId = ctaTarget.focusInput) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (shouldFocusStartDate && focusInputId) {
      window.setTimeout(() => {
        const input = document.getElementById(focusInputId);
        if (input) input.focus();
      }, 550);
    }
  };

  const goToSection = (sectionId, options = {}) => {
    const { focusCalc = false } = options;
    const onCurrentPage = pagePath === resolvePagePath(window.location.pathname);

    if (onCurrentPage && hasSectionNav) {
      setActiveSection(sectionId);
      scrollToSection(sectionId, focusCalc, focusCalc ? ctaTarget.focusInput : undefined);
      return;
    }

    router.push(buildSectionHref(pagePath, sectionId));
  };

  const handleNavClick = (event, sectionId) => {
    if (!hasSectionNav) return;
    event.preventDefault();
    setOpen(false);
    goToSection(sectionId);
  };

  const handleCtaClick = (event) => {
    event.preventDefault();
    setOpen(false);

    if (pagePath === ctaTarget.path && ctaTarget.section) {
      goToSection(ctaTarget.section, { focusCalc: Boolean(ctaTarget.focusInput) });
      return;
    }

    router.push(ctaHref);
  };

  const handleLogoClick = (event) => {
    setOpen(false);
    if (isHome) {
      event.preventDefault();
      setActiveSection(navItems[0]?.id ?? "hesapla");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  };

  const navigateTo = (event, href, sectionId) => {
    event.preventDefault();
    setOpen(false);

    if (pagePath === resolvePagePath(href.split("#")[0]) && sectionId) {
      goToSection(sectionId);
      return;
    }

    router.push(href);
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
          <Link href={HOME_PATH} className="brand" aria-label="Anasayfaya dön" onClick={handleLogoClick}>
            <span className="brand-mark">
              <Image src="/logo.png" alt="Tazminat Hesaplama logosu" width={88} height={88} priority />
            </span>
            <span className="brand-text">
              <span className="brand-title">Tazminat Hesaplama</span>
              <span className="brand-sub">
                <span className="brand-dot" aria-hidden="true" />
                İş Kanunu 4857
              </span>
            </span>
          </Link>

          {hasSectionNav ? (
            <nav className="nav-pill" aria-label="Sayfa bölümleri">
              <div className="nav-pill-track">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={buildSectionHref(pagePath, item.id)}
                    onClick={(event) => handleNavClick(event, item.id)}
                    className={`nav-pill-link${item.long ? " nav-pill-link--long" : ""}${activeSection === item.id ? " active" : ""}`}
                    title={item.long ? item.label : undefined}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          ) : null}

          <div className="header-actions">
            {!isHome && (
              <span className="header-trust-badge">
                <span className="header-trust-dot" aria-hidden="true" />
                Ücretsiz
              </span>
            )}
            <CalcCta href={ctaHref} className="header-calc-cta" onClick={handleCtaClick}>
              Şimdi Hesapla
            </CalcCta>
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
          {hasSectionNav ? (
            <nav className="mobile-drawer-nav">
              {navItems.map((item) => {
                const href = buildSectionHref(pagePath, item.id);
                return (
                  <a
                    key={item.id}
                    href={href}
                    className={activeSection === item.id ? "active" : ""}
                    onClick={(event) => navigateTo(event, href, item.id)}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          ) : null}
          <CalcCta href={ctaHref} className="mobile-calc-cta" onClick={handleCtaClick}>
            Şimdi Hesapla
          </CalcCta>
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
