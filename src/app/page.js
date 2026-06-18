import CompensationCalculator from "@/components/CompensationCalculator";
import StructuredDataScript from "@/components/seo/StructuredDataScript";
import { HOME_FAQ_ITEMS } from "@/data/homeFaqItems";
import { HOME_PAGE_SEO, HOME_PATH } from "@/config/site";
import { capitalizeHeadingText } from "@/utils/capitalizeHeading";
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildOrganizationSchema,
  buildPageMetadata,
  buildSchemaGraph,
  buildWebApplicationSchema,
  buildWebPageSchema
} from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: HOME_PAGE_SEO.title,
  description: HOME_PAGE_SEO.description,
  path: HOME_PATH,
  keywords: HOME_PAGE_SEO.keywords
});

const homeBreadcrumb = [{ name: "Anasayfa", path: HOME_PATH }];

const homeStructuredData = buildSchemaGraph(
  buildWebPageSchema({
    name: HOME_PAGE_SEO.title,
    description: HOME_PAGE_SEO.description,
    path: HOME_PATH
  }),
  buildBreadcrumbListSchema(homeBreadcrumb),
  buildOrganizationSchema(),
  buildWebApplicationSchema(),
  buildFaqPageSchema(HOME_FAQ_ITEMS, { transformQuestion: capitalizeHeadingText })
);

export default function HomePage() {
  return (
    <>
      <StructuredDataScript schema={homeStructuredData} />
      <CompensationCalculator />
    </>
  );
}
