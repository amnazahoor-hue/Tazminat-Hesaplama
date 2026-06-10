"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { IMAGES } from "@/config/images";
import { LEGAL_NAV } from "@/config/legalPages";
import { HOME_PATH } from "@/config/site";
import {
  MAIN_HEADER_PAGES,
  buildSectionHref,
  getMainPageMeta,
  getMainPageSections,
  resolvePagePath
} from "@/config/pageNav";

function FooterLinkList({ title, children }) {
  return (
    <section className="footer-panel">
      <h4 className="footer-panel-title">{title}</h4>
      <ul className="footer-panel-list">{children}</ul>
    </section>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const pagePath = resolvePagePath(pathname);
  const pageMeta = getMainPageMeta(pathname);
  const sectionItems = getMainPageSections(pathname);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer site-footer--streamlined">
      <span className="footer-bg-glow footer-bg-glow--left" aria-hidden="true" />
      <span className="footer-bg-glow footer-bg-glow--right" aria-hidden="true" />
      <span className="footer-bg-mesh" aria-hidden="true" />

      <div className="footer-shell">
        <div className="container footer-inner site-chrome-inner">
        <div className="footer-brand-row">
          <Link href={HOME_PATH} className="footer-logo" aria-label="Anasayfaya dön">
            <span className="footer-logo-mark">
              <Image src={IMAGES.logo} alt="" width={40} height={40} />
            </span>
            <span className="footer-logo-text">
              <strong>Tazminat Hesaplama</strong>
              <small>İş Kanunu 4857 · Ücretsiz araç</small>
            </span>
          </Link>
        </div>

        <div className={`footer-grid${sectionItems ? " footer-grid--sections" : ""}`}>
          <FooterLinkList title="Sayfalar">
            {MAIN_HEADER_PAGES.map((page) => {
              const isActive = page.path === pagePath;
              return (
                <li key={page.path}>
                  <Link href={page.path} className={`footer-link${isActive ? " is-active" : ""}`} aria-current={isActive ? "page" : undefined}>
                    <ChevronRight size={14} aria-hidden="true" />
                    <span>{page.title}</span>
                  </Link>
                </li>
              );
            })}
          </FooterLinkList>

          {sectionItems ? (
            <FooterLinkList title={pageMeta?.label ?? "Bu Sayfa"}>
              {sectionItems.map((item) => (
                <li key={item.id}>
                  <a href={buildSectionHref(pagePath, item.id)} className="footer-link">
                    <ChevronRight size={14} aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </FooterLinkList>
          ) : null}

          <FooterLinkList title="Yasal">
            {LEGAL_NAV.map((item) => {
              const isActive = resolvePagePath(item.href) === resolvePagePath(pathname);
              return (
              <li key={item.href}>
                <Link href={item.href} className={`footer-link${isActive ? " is-active" : ""}`} aria-current={isActive ? "page" : undefined}>
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
            })}
          </FooterLinkList>
        </div>
        </div>
      </div>

      <div className="footer-shell footer-shell--bar">
        <div className="container footer-inner site-chrome-inner footer-bar">
        <span className="footer-bar-line" aria-hidden="true" />
        <span className="footer-bar-copy">© {year} Tazminat Hesaplama. Tüm hakları saklıdır.</span>
        </div>
      </div>
    </footer>
  );
}
