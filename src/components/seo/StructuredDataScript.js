import { serializeStructuredData } from "@/utils/seo";

export default function StructuredDataScript({ schema }) {
  if (!schema) return null;

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(schema) }} />
  );
}
