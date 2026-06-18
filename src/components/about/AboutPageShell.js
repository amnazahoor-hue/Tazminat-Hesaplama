import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users
} from "lucide-react";
import AboutOfferingsIllustration from "@/components/about/AboutOfferingsIllustration";
import CalcCta from "@/components/common/CalcCta";
import { H1, H2, H3 } from "@/components/common/Heading";
import PageSchema from "@/components/seo/PageSchema";
import { HOME_PATH } from "@/config/site";

const VALUE_ICONS = [ShieldCheck, Sparkles, Scale, HeartHandshake];

/**
 * @param {{
 *   breadcrumb: { name: string, path: string }[],
 *   tag: string,
 *   title: string,
 *   lead: string,
 *   stats: { value: string, label: string, detail?: string }[],
 *   intro: { title: string, paragraphs: string[] },
 *   pillars: { title: string, body: string }[],
 *   values: { title: string, body: string }[],
 *   offerings: { title: string, items: { title: string, body: string }[] },
 *   approach: { title: string, steps: { title: string, body: string }[] },
 *   principles: { title: string, body: string }[],
 *   closing: { title: string, body: string }
 * }} props
 */
export default function AboutPageShell({
  breadcrumb,
  tag,
  title,
  lead,
  stats,
  intro,
  pillars,
  values,
  offerings,
  approach,
  principles,
  closing
}) {
  return (
    <div className="about-shell">
      <PageSchema
        name={title}
        description={lead}
        path={breadcrumb[breadcrumb.length - 1].path}
        breadcrumb={breadcrumb}
        type="AboutPage"
      />

      <header className="about-shell-hero">
        <span className="about-shell-hero-bg" aria-hidden="true" />
        <span className="about-shell-hero-glow about-shell-hero-glow--lime" aria-hidden="true" />
        <span className="about-shell-hero-glow about-shell-hero-glow--white" aria-hidden="true" />
        <div className="container about-shell-hero-inner legal-shell-hero-inner--boxed">
          <nav className="about-breadcrumb" aria-label="Breadcrumb">
            {breadcrumb.map((item, index) => (
              <span key={item.path} className="about-breadcrumb-item">
                {index > 0 ? <ChevronRight size={14} aria-hidden="true" /> : null}
                {index === breadcrumb.length - 1 ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </span>
            ))}
          </nav>
          <span className="about-shell-tag">{tag}</span>
          <H1>{title}</H1>
          <p className="about-shell-lead">{lead}</p>
          <div className="about-stats-row">
            {stats.map((item) => (
              <article key={item.label} className="about-stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                {item.detail ? <p>{item.detail}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </header>

      <section className="about-intro-band">
        <div className="container legal-page-container--boxed about-intro-grid">
          <div className="about-intro-copy">
            <span className="about-section-eyebrow">Platform Hikâyesi</span>
            <H2>{intro.title}</H2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <div className="about-intro-visual" aria-hidden="true">
            <span className="about-intro-visual-ring" />
            <span className="about-intro-visual-core">
              <BookOpen size={34} strokeWidth={1.8} />
            </span>
            <span className="about-intro-visual-badge about-intro-visual-badge--top">4857</span>
            <span className="about-intro-visual-badge about-intro-visual-badge--bottom">2026</span>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container legal-page-container--boxed">
          <div className="about-section-head">
            <span className="about-section-eyebrow">Temel İlkeler</span>
            <H2>Misyon &amp; Vizyon</H2>
            <p>
              Karmaşık iş hukuku konularını herkes için anlaşılır, hızlı ve güvenilir bir deneyime dönüştürmek
              için çalışıyoruz.
            </p>
          </div>
          <div className="about-pillar-grid">
            {pillars.map((pillar, index) => (
              <article key={pillar.title} className={`about-pillar-card about-pillar-card--${index + 1}`}>
                <span className="about-pillar-icon" aria-hidden="true">
                  {index === 0 ? <Target size={22} /> : <Users size={22} />}
                </span>
                <H3>{pillar.title}</H3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--tint">
        <div className="container legal-page-container--boxed">
          <div className="about-section-head">
            <span className="about-section-eyebrow">Değerlerimiz</span>
            <H2>Güven, Şeffaflık ve Erişilebilirlik</H2>
          </div>
          <div className="about-values-grid">
            {values.map((value, index) => {
              const Icon = VALUE_ICONS[index] ?? Sparkles;
              return (
                <article key={value.title} className="about-value-card">
                  <span className="about-value-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <H3>{value.title}</H3>
                  <p>{value.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container legal-page-container--boxed">
          <div className="about-offerings-panel">
            <div className="about-offerings-copy">
              <span className="about-section-eyebrow">Neler Sunuyoruz?</span>
              <H2>{offerings.title}</H2>
              <AboutOfferingsIllustration />
            </div>
            <div className="about-offerings-list">
              {offerings.items.map((item, index) => (
                <article key={item.title} className="about-offering-item">
                  <span className="about-offering-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <H3>{item.title}</H3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-section--tint">
        <div className="container legal-page-container--boxed">
          <div className="about-section-head">
            <span className="about-section-eyebrow">Editoryal Yaklaşım</span>
            <H2>{approach.title}</H2>
          </div>
          <div className="about-timeline">
            {approach.steps.map((step, index) => (
              <article key={step.title} className="about-timeline-step">
                <span className="about-timeline-marker">{index + 1}</span>
                <div className="about-timeline-copy">
                  <H3>{step.title}</H3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container legal-page-container--boxed">
          <div className="about-principles-grid">
            {principles.map((item) => (
              <article key={item.title} className="about-principle-card">
                <H3>{item.title}</H3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-closing-band">
        <div className="container legal-page-container--boxed about-closing-inner">
          <div className="about-closing-copy">
            <H2>{closing.title}</H2>
            <p>{closing.body}</p>
          </div>
          <CalcCta href={HOME_PATH} className="about-closing-cta" size="large">
            Hemen Hesapla
          </CalcCta>
          <Link href="/yasal-uyari" className="about-closing-link">
            Yasal uyarıyı oku
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
