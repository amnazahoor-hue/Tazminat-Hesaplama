import "@/styles/static-pages.css";
import AppImage from "@/components/common/AppImage";
import { H1, H2 } from "@/components/common/Heading";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight, Scale } from "lucide-react";
import { IMAGES } from "@/config/images";
import { HOME_PATH } from "@/config/site";

/**
 * @param {{
 *   breadcrumb: { name: string, path: string }[],
 *   name: string,
 *   title: string,
 *   tagline: string,
 *   image?: string,
 *   imageAlt?: string,
 *   expertise: string[],
 *   bio: string[],
 *   disclaimer: string,
 *   credentials: { label: string, value: string }[]
 * }} props
 */
export default function AuthorPageShell({
  breadcrumb,
  name,
  title,
  tagline,
  image,
  imageAlt,
  expertise,
  bio,
  disclaimer,
  credentials
}) {
  const portraitSrc = image ?? IMAGES.author.portrait;

  return (
    <div className="author-shell legal-shell">
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
          <span className="legal-shell-tag">Yazar</span>
          <H1>{name}</H1>
          <p className="legal-shell-lead author-shell-lead">{title}</p>
          <p className="author-shell-tagline">{tagline}</p>
        </div>
      </header>

      <div className="legal-shell-outer">
        <div className="legal-shell-body legal-shell-body--boxed author-shell-body">
          <aside className="author-shell-aside">
            <div className="author-profile-card">
              {portraitSrc ? (
                <div className="author-profile-photo">
                  <AppImage
                    src={portraitSrc}
                    alt={imageAlt ?? name}
                    width={240}
                    height={240}
                    sizes="120px"
                    className="author-profile-photo__img"
                    unoptimized
                    priority
                  />
                </div>
              ) : null}
              <H2>{name}</H2>
              <p>{title}</p>
              <ul className="author-expertise-list">
                {expertise.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="author-credentials">
              {credentials.map((item) => (
                <article key={item.label} className="author-credential-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>

            <Link href={HOME_PATH} className="legal-sidebar-home">
              Ana Hesaplayıcı
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>

          <div className="legal-shell-main author-shell-main">
            <div className="author-bio-grid">
              {bio.map((paragraph) => (
                <article key={paragraph} className="legal-section-card author-bio-card">
                  <span className="legal-section-index" aria-hidden="true">
                    <BookOpen size={16} strokeWidth={2} />
                  </span>
                  <div className="legal-section-copy">
                    <div className="legal-section-body author-speakable">
                      <p>{paragraph}</p>
                    </div>
                  </div>
                </article>
              ))}

              <article className="legal-section-card author-disclaimer-card">
                <span className="legal-section-index" aria-hidden="true">
                  <Scale size={16} strokeWidth={2} />
                </span>
                <div className="legal-section-copy">
                  <H2>Yasal Not</H2>
                  <div className="legal-section-body author-speakable">
                    <p>{disclaimer}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
