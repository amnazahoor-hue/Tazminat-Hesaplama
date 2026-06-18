import "@/styles/guide-pages.css";
import TotalCompensationGuide from "@/components/guide/TotalCompensationGuide";
import StructuredDataScript from "@/components/seo/StructuredDataScript";
import { TAZMINAT_GUIDE_FAQ_ITEMS } from "@/data/tazminatGuideFaqItems";
import { HOME_PATH, TAZMINAT_HESAPLAMA_PATH, TAZMINAT_PAGE_SEO } from "@/config/site";
import {
  buildArticleSchema,
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildPageMetadata,
  buildSchemaGraph,
  buildWebPageSchema
} from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: TAZMINAT_PAGE_SEO.title,
  description: TAZMINAT_PAGE_SEO.description,
  path: TAZMINAT_HESAPLAMA_PATH,
  keywords: TAZMINAT_PAGE_SEO.keywords
});

const guideBreadcrumb = [
  { name: "Anasayfa", path: HOME_PATH },
  { name: "Tazminat Hesaplama", path: TAZMINAT_HESAPLAMA_PATH }
];

const guideStructuredData = buildSchemaGraph(
  buildWebPageSchema({
    name: TAZMINAT_PAGE_SEO.title,
    description: TAZMINAT_PAGE_SEO.description,
    path: TAZMINAT_HESAPLAMA_PATH
  }),
  buildBreadcrumbListSchema(guideBreadcrumb),
  buildArticleSchema({
    headline: TAZMINAT_PAGE_SEO.title,
    path: TAZMINAT_HESAPLAMA_PATH
  }),
  buildFaqPageSchema(TAZMINAT_GUIDE_FAQ_ITEMS)
);

export default function TotalCompensationGuidePage() {
  return (
    <>
      <StructuredDataScript schema={guideStructuredData} />
      <TotalCompensationGuide />
    </>
  );
}
