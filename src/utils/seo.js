import { FOOTER_SOCIAL_LINKS } from "@/config/footer";
import { SITE_URL, siteUrl, toUnicodeSiteUrl } from "@/config/site";

export { SITE_URL };

/** Recursively normalize any Punycode site URLs inside JSON-LD objects. */
export function normalizeSchemaUrls(value) {
  if (typeof value === "string") {
    return toUnicodeSiteUrl(value);
  }

  if (Array.isArray(value)) {
    return value.map(normalizeSchemaUrls);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, normalizeSchemaUrls(entry)]));
  }

  return value;
}

/** JSON-LD output with Unicode site domain preserved (avoids xn-- Punycode). */
export function serializeStructuredData(schema) {
  return JSON.stringify(normalizeSchemaUrls(schema));
}

/** Legal & author pages — noindex, follow links */
export const ROBOTS_NOINDEX_FOLLOW = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true
  }
};

export function buildPageMetadata({ title, description, path, keywords = [], robots }) {
  const url = siteUrl(path);
  const keywordString = Array.isArray(keywords) ? keywords.join(", ") : keywords;
  return {
    title,
    description,
    keywords: keywordString,
    ...(robots ? { robots } : {}),
    openGraph: {
      type: "website",
      locale: "tr_TR",
      title,
      description,
      url,
      siteName: "Tazminat Hesaplama"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    ...buildBreadcrumbListSchema(items)
  };
}

export function buildBreadcrumbListSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: buildBreadcrumbListElements(items)
  };
}

function buildBreadcrumbListElements(items) {
  return items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: siteUrl(item.path)
  }));
}

/** WebPage node — use standalone or inside @graph via buildPageSchemaGraph */
export function buildWebPageSchema({ name, description, path, type = "WebPage" }) {
  return {
    "@type": type,
    name,
    description,
    url: siteUrl(path),
    inLanguage: "tr",
    isPartOf: {
      "@type": "WebSite",
      name: "Tazminat Hesaplama",
      url: SITE_URL
    }
  };
}

function stripSchemaContext(schema) {
  if (!schema || typeof schema !== "object") return schema;
  const { "@context": _context, ...rest } = schema;
  return rest;
}

function toSchemaNodes(schema) {
  const stripped = stripSchemaContext(schema);
  if (stripped?.["@graph"]) return stripped["@graph"];
  return [stripped];
}

/** Merge multiple schema nodes into one JSON-LD document for SEO tools. */
export function buildSchemaGraph(...schemas) {
  const nodes = schemas.filter(Boolean).flatMap(toSchemaNodes);

  if (nodes.length === 0) return null;
  if (nodes.length === 1) {
    return {
      "@context": "https://schema.org",
      ...nodes[0]
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": nodes
  };
}

export function buildFaqPageSchema(items, { includeFormula = false, transformQuestion } = {}) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: transformQuestion ? transformQuestion(faq.question) : faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: includeFormula && faq.formula ? `${faq.answer} ${faq.formula}` : faq.answer
      }
    }))
  };
}

export function buildPageSchemaGraph({ name, description, path, breadcrumb, type = "WebPage" }) {
  return buildSchemaGraph(
    buildWebPageSchema({ name, description, path, type }),
    breadcrumb?.length ? buildBreadcrumbListSchema(breadcrumb) : null
  );
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tazminat Hesaplama",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    sameAs: FOOTER_SOCIAL_LINKS.map((item) => item.href)
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

export function buildAuthorPageSchema({ author, path }) {
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
    }
  };
}
