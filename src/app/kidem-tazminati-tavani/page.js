import "@/styles/guide-pages.css";
import TavanGuide from "@/components/guide/tavan/TavanGuide";
import StructuredDataScript from "@/components/seo/StructuredDataScript";
import { TAVAN_FAQ_ITEMS } from "@/data/tavanGuideContent";
import { HOME_PATH, KIDEM_TAVANI_PAGE_SEO, KIDEM_TAVANI_PATH } from "@/config/site";
import {
  buildArticleSchema,
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildPageMetadata,
  buildSchemaGraph,
  buildWebPageSchema
} from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: KIDEM_TAVANI_PAGE_SEO.title,
  description: KIDEM_TAVANI_PAGE_SEO.description,
  path: KIDEM_TAVANI_PATH,
  keywords: KIDEM_TAVANI_PAGE_SEO.keywords
});

const guideBreadcrumb = [
  { name: "Anasayfa", path: HOME_PATH },
  { name: "Kıdem Tazminatı Tavanı 2026", path: KIDEM_TAVANI_PATH }
];

const guideStructuredData = buildSchemaGraph(
  buildWebPageSchema({
    name: KIDEM_TAVANI_PAGE_SEO.title,
    description: KIDEM_TAVANI_PAGE_SEO.description,
    path: KIDEM_TAVANI_PATH
  }),
  buildBreadcrumbListSchema(guideBreadcrumb),
  buildArticleSchema({
    headline: KIDEM_TAVANI_PAGE_SEO.title,
    path: KIDEM_TAVANI_PATH
  }),
  buildFaqPageSchema(TAVAN_FAQ_ITEMS)
);

export default function TavanGuidePage() {
  return (
    <>
      <StructuredDataScript schema={guideStructuredData} />
      <TavanGuide />
    </>
  );
}
