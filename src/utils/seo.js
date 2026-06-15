import { FOOTER_SOCIAL_LINKS } from "@/config/footer";
import { SITE_URL, siteUrl } from "@/config/site";

export { SITE_URL };

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
    logo: `${SITE_URL}/images/logo.webp`,
    sameAs: FOOTER_SOCIAL_LINKS.map((item) => item.href)
  };
}

export function buildWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kıdem Tazminatı Hesaplayıcısı",
    url: SITE_URL,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY"
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

export function buildSpeakableSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".answer-block", ".faq-answer"]
    }
  };
}
