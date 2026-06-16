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
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { HOME_PATH } from "@/config/site";
import { capitalizeHeadingText } from "@/utils/capitalizeHeading";

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
      <BreadcrumbSchema items={breadcrumb} />

      <header className="about-shell-hero">
        <span className="about-shell-hero-bg" aria-hidden="true" />
        <span className="about-shell-hero-glow about-shell-hero-glow--lime" aria-hidden="true" />
        <span className="about-shell-hero-glow about-shell-hero-glow--white" aria-hidden="true" />
        <div className="container about-shell-hero-inner">
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
          <h1>{capitalizeHeadingText(title)}</h1>
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
        <div className="container about-intro-grid">
          <div className="about-intro-copy">
            <span className="about-section-eyebrow">Platform Hikâyesi</span>
            <h2>{capitalizeHeadingText(intro.title)}</h2>
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
        <div className="container">
          <div className="about-section-head">
            <span className="about-section-eyebrow">Temel İlkeler</span>
            <h2>Misyon &amp; Vizyon</h2>
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
                <h3>{capitalizeHeadingText(pillar.title)}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--tint">
        <div className="container">
          <div className="about-section-head">
            <span className="about-section-eyebrow">Değerlerimiz</span>
            <h2>Güven, Şeffaflık ve Erişilebilirlik</h2>
          </div>
          <div className="about-values-grid">
            {values.map((value, index) => {
              const Icon = VALUE_ICONS[index] ?? Sparkles;
              return (
                <article key={value.title} className="about-value-card">
                  <span className="about-value-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3>{capitalizeHeadingText(value.title)}</h3>
                  <p>{value.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-offerings-panel">
            <div className="about-offerings-copy">
              <span className="about-section-eyebrow">Neler Sunuyoruz?</span>
              <h2>{capitalizeHeadingText(offerings.title)}</h2>
              <AboutOfferingsIllustration />
            </div>
            <div className="about-offerings-list">
              {offerings.items.map((item, index) => (
                <article key={item.title} className="about-offering-item">
                  <span className="about-offering-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{capitalizeHeadingText(item.title)}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-section--tint">
        <div className="container">
          <div className="about-section-head">
            <span className="about-section-eyebrow">Editoryal Yaklaşım</span>
            <h2>{capitalizeHeadingText(approach.title)}</h2>
          </div>
          <div className="about-timeline">
            {approach.steps.map((step, index) => (
              <article key={step.title} className="about-timeline-step">
                <span className="about-timeline-marker">{index + 1}</span>
                <div className="about-timeline-copy">
                  <h3>{capitalizeHeadingText(step.title)}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-principles-grid">
            {principles.map((item) => (
              <article key={item.title} className="about-principle-card">
                <h3>{capitalizeHeadingText(item.title)}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-closing-band">
        <div className="container about-closing-inner">
          <div className="about-closing-copy">
            <h2>{capitalizeHeadingText(closing.title)}</h2>
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
