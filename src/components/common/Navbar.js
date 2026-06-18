"use client";

import BrandLogo from "@/components/common/BrandLogo";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CalcCta from "@/components/common/CalcCta";
import { FOOTER_COMPANY_NAV, LEGAL_NAV } from "@/config/legalPages";
import {
  buildSectionHref,
  getPageNav,
  HEADER_NAV_PAGES,
  HOME_PATH,
  resolvePagePath
} from "@/config/pageNav";

const DEFAULT_CTA = { path: HOME_PATH, section: "hesapla", focusInput: "giris" };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const pagePath = resolvePagePath(pathname);
  const pageNav = useMemo(() => getPageNav(pathname), [pathname]);
  const ctaConfig = pageNav?.cta ?? DEFAULT_CTA;
  const ctaHref = buildSectionHref(ctaConfig.path, ctaConfig.section);
  const isHome = pagePath === HOME_PATH;

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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = (sectionId, focusInputId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (focusInputId) {
      window.setTimeout(() => {
        document.getElementById(focusInputId)?.focus();
      }, 550);
    }
  };

  const handleCtaClick = (event) => {
    event.preventDefault();
    setOpen(false);

    const onCtaPage = pagePath === ctaConfig.path;

    if (onCtaPage && ctaConfig.section) {
      scrollToSection(ctaConfig.section, ctaConfig.focusInput);
      return;
    }

    router.push(ctaHref);
  };

  const handleLogoClick = (event) => {
    setOpen(false);
    if (isHome) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`site-header is-home${scrolled ? " is-scrolled" : ""}${open ? " is-menu-open" : ""}`}
    >
      <div className="header-progress" aria-hidden="true">
        <span className="header-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="header-shell">
        <div className="container header-inner site-chrome-inner">
          <Link href={HOME_PATH} className="brand" aria-label="Anasayfaya dön" onClick={handleLogoClick}>
            <span className="brand-mark">
              <BrandLogo />
            </span>
            <span className="brand-text">
              <span className="brand-title">Kıdem Tazminatı</span>
            </span>
          </Link>

          <nav className="nav-pill header-page-nav" aria-label="Site sayfaları">
            <div className="nav-pill-track">
              {HEADER_NAV_PAGES.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className={`nav-pill-link${pagePath === page.path ? " active" : ""}${page.label.length > 22 ? " nav-pill-link--long" : ""}`}
                  title={page.title}
                  aria-label={page.title}
                  onClick={() => setOpen(false)}
                >
                  <span className="nav-pill-link-text nav-pill-link-text--full" aria-hidden="true">
                    {page.label}
                  </span>
                  <span className="nav-pill-link-text nav-pill-link-text--short" aria-hidden="true">
                    {page.shortLabel ?? page.label}
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="header-actions">
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

          <nav className="mobile-drawer-nav mobile-drawer-nav--pages">
            {HEADER_NAV_PAGES.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className={pagePath === page.path ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {page.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-drawer-cta-wrap">
            <CalcCta href={ctaHref} className="mobile-calc-cta" size="large" onClick={handleCtaClick}>
              Şimdi Hesapla
            </CalcCta>
          </div>

          <div className="mobile-drawer-footer">
            {FOOTER_COMPANY_NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            {LEGAL_NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
