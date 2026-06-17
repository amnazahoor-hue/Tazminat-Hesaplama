import { SITE_URL, siteUrl } from "@/config/site";

export { SITE_URL };

/** Legal, corporate & author pages — noindex, follow links */
export const ROBOTS_NOINDEX_FOLLOW = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true
  }
};

const OG_IMAGE = {
  url: "/images/og-image.webp",
  width: 1200,
  height: 630,
  alt: "Tazminat Hesaplama"
};

function withTrailingSlash(path) {
  if (!path || path === "/") return path;
  return path.endsWith("/") ? path : `${path}/`;
}

export function buildPageMetadata({ title, description, path, keywords = [], robots }) {
  const canonicalPath = withTrailingSlash(path);
  const url = siteUrl(path);
  const keywordString = Array.isArray(keywords) ? keywords.join(", ") : keywords;
  return {
    title,
    description,
    keywords: keywordString,
    ...(robots ? { robots } : {}),
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      title,
      description,
      url,
      siteName: "Tazminat Hesaplama",
      images: [OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url]
    }
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path)
    }))
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tazminat Hesaplama",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`
  };
}

export function buildWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kıdem Tazminatı Hesaplayıcısı",
    description:
      "Türk İş Kanunu 4857 kapsamında kıdem, ihbar ve yıllık izin tazminatı hesaplaması yapan ücretsiz çevrimiçi araç.",
    url: SITE_URL,
    inLanguage: "tr",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY"
    },
    publisher: {
      "@type": "Organization",
      name: "Tazminat Hesaplama",
      url: SITE_URL
    }
  };
}

export function buildArticleSchema({ headline, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    inLanguage: "tr",
    mainEntityOfPage: siteUrl(path),
    publisher: {
      "@type": "Organization",
      name: "Tazminat Hesaplama"
    }
  };
}

/** CSS selectors for Google SpeakableSpecification — must match live DOM classes */
export const SPEAKABLE_SELECTORS = {
  tool: [
    ".hero-copy",
    ".intro-showcase-copy p",
    ".faq-question-text",
    ".faq-content-inner p"
  ],
  guide: [
    ".hero-copy",
    ".ihbar-guide-hero-copy p",
    ".tavan-guide-hero-lead p",
    ".guide-intro-copy p",
    ".guide-accordion-question",
    ".guide-accordion-panel-inner p"
  ],
  author: [".author-shell-lead", ".author-shell-tagline", ".author-speakable p"],
  legal: [".legal-shell-lead", ".legal-section-body p"]
};

export function buildSpeakableSchema({
  name,
  url,
  cssSelector = SPEAKABLE_SELECTORS.tool
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    ...(name ? { name } : {}),
    ...(url ? { url } : {}),
    inLanguage: "tr",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector
    }
  };
}

export function buildPersonSchema({ name, jobTitle, description, url, image, knowsAbout = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url,
    ...(image ? { image } : {}),
    knowsAbout,
    worksFor: {
      "@type": "Organization",
      name: "Tazminat Hesaplama",
      url: SITE_URL
    },
    nationality: {
      "@type": "Country",
      name: "Türkiye"
    }
  };
}

export function buildAuthorPageSchema({ author, path, cssSelector = SPEAKABLE_SELECTORS.author }) {
  const url = siteUrl(path);
  const imageUrl = author.image ? `${SITE_URL}${author.image}` : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${author.name} — Yazar Profili`,
    url,
    inLanguage: "tr",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.title,
      description: author.tagline,
      url,
      ...(imageUrl ? { image: imageUrl } : {}),
      knowsAbout: author.expertise,
      worksFor: {
        "@type": "Organization",
        name: "Tazminat Hesaplama",
        url: SITE_URL
      },
      nationality: {
        "@type": "Country",
        name: "Türkiye"
      }
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector
    }
  };
}
