import { buildBreadcrumbSchema } from "@/utils/seo";

export default function BreadcrumbSchema({ items }) {
  const schema = buildBreadcrumbSchema(items);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
