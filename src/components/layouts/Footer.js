"use client";

import AppImage from "@/components/common/AppImage";
import { H4 } from "@/components/common/Heading";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { IMAGES, LOGO_INTRINSIC } from "@/config/images";
import { FOOTER_BRAND_COPY, FOOTER_SOCIAL_LINKS } from "@/config/footer";
import { FOOTER_COMPANY_NAV, LEGAL_NAV } from "@/config/legalPages";
import { HOME_PATH } from "@/config/site";
import { MAIN_HEADER_PAGES, resolvePagePath } from "@/config/pageNav";
import { FOOTER_SOCIAL_ICON_MAP } from "@/components/layouts/FooterSocialIcon";

function FooterLinkList({ title, children, panelClass = "", lead = "" }) {
  return (
    <section className={`footer-panel${panelClass ? ` ${panelClass}` : ""}`}>
      <H4 className="footer-panel-title">{title}</H4>
      {lead ? <p className="footer-panel-lead">{lead}</p> : null}
      <ul className="footer-panel-list">{children}</ul>
    </section>
  );
}

function FooterNavLinks({ items, pathname }) {
  return items.map((item) => {
    const isActive = resolvePagePath(item.href) === resolvePagePath(pathname);
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          className={`footer-link${isActive ? " is-active" : ""}`}
          aria-current={isActive ? "page" : undefined}
        >
          <ChevronRight size={14} aria-hidden="true" />
          <span>{item.label}</span>
        </Link>
      </li>
    );
  });
}

function FooterBrandColumn() {
  return (
    <section className="footer-panel footer-panel--brand">
      <Link href={HOME_PATH} className="brand footer-brand" aria-label="Anasayfaya dön">
        <span className="brand-mark">
          <AppImage
            src={IMAGES.logo}
            alt="Kıdem Tazminatı logosu"
            width={LOGO_INTRINSIC.width}
            height={LOGO_INTRINSIC.height}
            unoptimized
            style={{ width: "100%", height: "auto" }}
          />
        </span>
        <span className="brand-text">
          <span className="brand-title">Kıdem Tazminatı</span>
        </span>
      </Link>

      <div className="footer-brand-meta">
        <div className="footer-brand-copy">
          {FOOTER_BRAND_COPY.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="footer-social-block">
          <p className="footer-social-label">Bizi takip edin</p>
          <div className="footer-social">
            {FOOTER_SOCIAL_LINKS.map((item) => {
              const Icon = FOOTER_SOCIAL_ICON_MAP[item.className];
              return (
                <a
                  key={item.className}
                  href={item.href}
                  className={item.className}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  {Icon ? <Icon size={15} /> : null}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const pagePath = resolvePagePath(pathname);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer site-footer--streamlined">
      <span className="footer-bg-glow footer-bg-glow--left" aria-hidden="true" />
      <span className="footer-bg-glow footer-bg-glow--right" aria-hidden="true" />
      <span className="footer-bg-mesh" aria-hidden="true" />

      <div className="footer-shell">
        <div className="container footer-inner site-chrome-inner">
          <div className="footer-grid footer-grid--brand">
            <FooterBrandColumn />

            <FooterLinkList title="Sayfalar">
              {MAIN_HEADER_PAGES.map((page) => {
                const isActive = page.path === pagePath;
                return (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className={`footer-link${isActive ? " is-active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <ChevronRight size={14} aria-hidden="true" />
                      <span>{page.title}</span>
                    </Link>
                  </li>
                );
              })}
            </FooterLinkList>

            <FooterLinkList title="Yasal Sayfalar" panelClass="footer-panel--legal">
              <FooterNavLinks items={LEGAL_NAV} pathname={pathname} />
            </FooterLinkList>

            <FooterLinkList title="Kurumsal" panelClass="footer-panel--company">
              <FooterNavLinks items={FOOTER_COMPANY_NAV} pathname={pathname} />
            </FooterLinkList>
          </div>
        </div>
      </div>

      <div className="footer-shell footer-shell--bar">
        <div className="container footer-inner site-chrome-inner footer-bar">
          <span className="footer-bar-line" aria-hidden="true" />
          <Link href={HOME_PATH} className="footer-bar-copy" aria-label="Anasayfaya dön">
            © {year} Tazminat Hesaplama. Tüm hakları saklıdır.
          </Link>
        </div>
      </div>
    </footer>
  );
}
