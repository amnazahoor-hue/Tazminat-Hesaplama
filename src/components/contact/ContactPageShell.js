import Link from "next/link";
import { ChevronRight, Mail, MessageCircle, ShieldQuestion } from "lucide-react";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { FOOTER_COMPANY_NAV } from "@/config/legalPages";
import { HOME_PATH } from "@/config/site";
import { capitalizeHeadingText } from "@/utils/capitalizeHeading";

/**
 * @param {{
 *   breadcrumb: { name: string, path: string }[],
 *   path: string,
 *   tag: string,
 *   title: string,
 *   lead: string,
 *   channels: { label: string, email: string, detail: string }[],
 *   sections: { title: string, body: React.ReactNode }[],
 *   notice: string
 * }} props
 */
export default function ContactPageShell({ breadcrumb, path, tag, title, lead, channels, sections, notice }) {
  return (
    <div className="contact-shell">
      <BreadcrumbSchema items={breadcrumb} />

      <header className="contact-shell-hero">
        <span className="contact-shell-hero-bg" aria-hidden="true" />
        <span className="contact-shell-hero-glow" aria-hidden="true" />
        <div className="container contact-shell-hero-inner">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb">
            {breadcrumb.map((item, index) => (
              <span key={item.path} className="contact-breadcrumb-item">
                {index > 0 ? <ChevronRight size={14} aria-hidden="true" /> : null}
                {index === breadcrumb.length - 1 ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </span>
            ))}
          </nav>
          <span className="contact-shell-tag">{tag}</span>
          <h1>{capitalizeHeadingText(title)}</h1>
          <p className="contact-shell-lead">{lead}</p>
        </div>
      </header>

      <div className="container contact-shell-body">
        <aside className="contact-shell-sidebar">
          <p className="contact-sidebar-title">Kurumsal</p>
          <nav className="contact-sidebar-nav" aria-label="Kurumsal sayfalar">
            {FOOTER_COMPANY_NAV.map((item) => {
              const isActive = item.href === path;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`contact-sidebar-link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <Link href={HOME_PATH} className="contact-sidebar-home">
            Ana Hesaplayıcı
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </aside>

        <div className="contact-shell-main">
          <div className="contact-channel-grid">
            {channels.map((channel) => (
              <article key={channel.email} className="contact-channel-card">
                <span className="contact-channel-icon" aria-hidden="true">
                  <Mail size={20} />
                </span>
                <span className="contact-channel-label">{channel.label}</span>
                <a className="contact-channel-mail" href={`mailto:${channel.email}`}>
                  {channel.email}
                </a>
                <p>{channel.detail}</p>
              </article>
            ))}
          </div>

          <div className="contact-section-grid">
            {sections.map((section, index) => (
              <article key={section.title} className="contact-section-card">
                <span className="contact-section-icon" aria-hidden="true">
                  {index === 0 ? <MessageCircle size={18} /> : <ShieldQuestion size={18} />}
                </span>
                <div>
                  <h2>{capitalizeHeadingText(section.title)}</h2>
                  <div className="contact-section-body">{section.body}</div>
                </div>
              </article>
            ))}
          </div>

          <aside className="contact-notice-card">
            <p>{notice}</p>
            <Link href="/yasal-uyari">Yasal uyarıyı okuyun</Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
