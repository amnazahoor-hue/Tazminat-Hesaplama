import "@/styles/guide-pages.css";
import IhbarTazminatGuide from "@/components/guide/ihbar/IhbarTazminatGuide";
import StructuredDataScript from "@/components/seo/StructuredDataScript";
import { IHBAR_FAQ_ITEMS } from "@/data/ihbarGuideContent";
import { HOME_PATH, IHBAR_NEDIR_PATH, IHBAR_PAGE_SEO } from "@/config/site";
import {
  buildArticleSchema,
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildPageMetadata,
  buildSchemaGraph,
  buildWebPageSchema
} from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: IHBAR_PAGE_SEO.title,
  description: IHBAR_PAGE_SEO.description,
  path: IHBAR_NEDIR_PATH,
  keywords: IHBAR_PAGE_SEO.keywords
});

const guideBreadcrumb = [
  { name: "Anasayfa", path: HOME_PATH },
  { name: "İhbar Tazminatı Nedir?", path: IHBAR_NEDIR_PATH }
];

const guideStructuredData = buildSchemaGraph(
  buildWebPageSchema({
    name: IHBAR_PAGE_SEO.title,
    description: IHBAR_PAGE_SEO.description,
    path: IHBAR_NEDIR_PATH
  }),
  buildBreadcrumbListSchema(guideBreadcrumb),
  buildArticleSchema({
    headline: IHBAR_PAGE_SEO.title,
    path: IHBAR_NEDIR_PATH
  }),
  buildFaqPageSchema(IHBAR_FAQ_ITEMS, { includeFormula: true })
);

export default function IhbarTazminatGuidePage() {
  return (
    <>
      <StructuredDataScript schema={guideStructuredData} />
      <IhbarTazminatGuide />
    </>
  );
}
