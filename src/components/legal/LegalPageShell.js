import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { HOME_PATH } from "@/config/site";
import { capitalizeHeadingText } from "@/utils/capitalizeHeading";
import { LEGAL_NAV } from "@/config/legalPages";

/**
 * @param {{
 *   path: string,
 *   breadcrumb: { name: string, path: string }[],
 *   tag: string,
 *   title: string,
 *   lead: string,
 *   sections: { id?: string, title: string, body: React.ReactNode }[],
 *   highlights?: { label: string, value: string, detail?: string }[]
 * }} props
 */
export default function LegalPageShell({ path, breadcrumb, tag, title, lead, sections, highlights }) {
  return (
    <div className="legal-shell">
      <BreadcrumbSchema items={breadcrumb} />

      <header className="legal-shell-hero">
        <span className="legal-shell-hero-bg" aria-hidden="true" />
        <span className="legal-shell-hero-overlay" aria-hidden="true" />
        <div className="container legal-shell-hero-inner">
          <nav className="legal-breadcrumb" aria-label="Breadcrumb">
            {breadcrumb.map((item, index) => (
              <span key={item.path} className="legal-breadcrumb-item">
                {index > 0 ? <ChevronRight size={14} aria-hidden="true" /> : null}
                {index === breadcrumb.length - 1 ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </span>
            ))}
          </nav>
          <span className="legal-shell-tag">{tag}</span>
          <h1>{capitalizeHeadingText(title)}</h1>
          <p className="legal-shell-lead">{lead}</p>
        </div>
      </header>

      <div className="container legal-shell-body">
        <aside className="legal-shell-sidebar">
          <p className="legal-sidebar-title">Yasal Sayfalar</p>
          <nav className="legal-sidebar-nav" aria-label="Yasal sayfalar">
            {LEGAL_NAV.map((item) => {
              const isActive = item.href === path;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`legal-sidebar-link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <Link href={HOME_PATH} className="legal-sidebar-home">
            Ana Hesaplayıcı
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </aside>

        <div className="legal-shell-main">
          {highlights?.length ? (
            <div className="legal-contact-highlights">
              {highlights.map((item) => (
                <article key={item.label} className="legal-contact-highlight">
                  <span className="legal-contact-highlight-label">{item.label}</span>
                  <strong className="legal-contact-highlight-value">{item.value}</strong>
                  {item.detail ? <p className="legal-contact-highlight-detail">{item.detail}</p> : null}
                </article>
              ))}
            </div>
          ) : null}
          <div className="legal-section-grid">
            {sections.map((section, index) => (
              <article key={section.id ?? section.title} id={section.id} className="legal-section-card">
                <span className="legal-section-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="legal-section-copy">
                  <h2>{capitalizeHeadingText(section.title)}</h2>
                  <div className="legal-section-body">{section.body}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
