import TotalCompensationGuide from "@/components/guide/TotalCompensationGuide";
import { TAZMINAT_HESAPLAMA_PATH, TAZMINAT_PAGE_SEO } from "@/config/site";
import { buildArticleSchema, buildPageMetadata, buildSpeakableSchema } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: TAZMINAT_PAGE_SEO.title,
  description: TAZMINAT_PAGE_SEO.description,
  path: TAZMINAT_HESAPLAMA_PATH,
  keywords: TAZMINAT_PAGE_SEO.keywords
});

export default function TotalCompensationGuidePage() {
  const articleSchema = buildArticleSchema({
    headline: TAZMINAT_PAGE_SEO.title,
    path: TAZMINAT_HESAPLAMA_PATH
  });
  const speakableSchema = buildSpeakableSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TotalCompensationGuide />
    </>
  );
}
