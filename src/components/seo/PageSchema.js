import StructuredDataScript from "@/components/seo/StructuredDataScript";
import { buildPageSchemaGraph } from "@/utils/seo";

/**
 * WebPage + optional BreadcrumbList JSON-LD for a route.
 * @param {{
 *   name: string,
 *   description: string,
 *   path: string,
 *   breadcrumb?: { name: string, path: string }[],
 *   type?: string
 * }} props
 */
export default function PageSchema({ name, description, path, breadcrumb, type = "WebPage" }) {
  const schema = buildPageSchemaGraph({ name, description, path, breadcrumb, type });

  return <StructuredDataScript schema={schema} />;
}
