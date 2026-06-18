import "@/styles/static-pages.css";
import Link from "next/link";
import { ChevronRight, Mail, MessageCircle, ShieldQuestion } from "lucide-react";
import { H1, H2 } from "@/components/common/Heading";
import PageSchema from "@/components/seo/PageSchema";
import { FOOTER_COMPANY_NAV } from "@/config/legalPages";
import { HOME_PATH } from "@/config/site";

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
    <div className="legal-shell contact-shell">
      <PageSchema
        name={title}
        description={lead}
        path={path}
        breadcrumb={breadcrumb}
        type="ContactPage"
      />

      <header className="legal-shell-hero">
        <span className="legal-shell-hero-bg" aria-hidden="true" />
        <span className="legal-shell-hero-overlay" aria-hidden="true" />
        <div className="container legal-shell-hero-inner legal-shell-hero-inner--boxed">
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
          <H1>{title}</H1>
          <p className="legal-shell-lead">{lead}</p>
        </div>
      </header>

      <div className="legal-shell-outer">
        <div className="container legal-shell-body legal-shell-body--boxed">
          <aside className="legal-shell-sidebar">
            <p className="legal-sidebar-title">Kurumsal</p>
            <nav className="legal-sidebar-nav" aria-label="Kurumsal sayfalar">
              {FOOTER_COMPANY_NAV.map((item) => {
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
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </aside>

          <div className="legal-shell-main contact-shell-main">
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
                    <H2>{section.title}</H2>
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
    </div>
  );
}
