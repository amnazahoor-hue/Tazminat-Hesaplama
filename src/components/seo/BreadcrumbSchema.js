import { buildBreadcrumbSchema } from "@/utils/seo";

/** @deprecated Use PageSchema for WebPage + BreadcrumbList together */
export default function BreadcrumbSchema({ items }) {
  const schema = buildBreadcrumbSchema(items);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
