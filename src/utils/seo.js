import { SITE_URL, siteUrl } from "@/config/site";

export { SITE_URL };

function withTrailingSlash(path) {
  if (!path || path === "/") return path;
  return path.endsWith("/") ? path : `${path}/`;
}

export function buildPageMetadata({ title, description, path, keywords = [] }) {
  const canonicalPath = withTrailingSlash(path);
  const url = siteUrl(path);
  const keywordString = Array.isArray(keywords) ? keywords.join(", ") : keywords;
  return {
    title,
    description,
    keywords: keywordString,
    alternates: {
      canonical: canonicalPath
    },
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
    sameAs: [
      "https://www.linkedin.com",
      "https://www.facebook.com",
      "https://www.youtube.com",
      "https://www.instagram.com",
      "https://twitter.com"
    ]
  };
}
