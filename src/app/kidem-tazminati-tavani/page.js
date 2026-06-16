import TavanGuide from "@/components/guide/tavan/TavanGuide";
import { KIDEM_TAVANI_PAGE_SEO, KIDEM_TAVANI_PATH } from "@/config/site";
import { buildArticleSchema, buildPageMetadata, buildSpeakableSchema } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: KIDEM_TAVANI_PAGE_SEO.title,
  description: KIDEM_TAVANI_PAGE_SEO.description,
  path: KIDEM_TAVANI_PATH,
  keywords: KIDEM_TAVANI_PAGE_SEO.keywords
});

export default function TavanGuidePage() {
  const articleSchema = buildArticleSchema({
    headline: KIDEM_TAVANI_PAGE_SEO.title,
    path: KIDEM_TAVANI_PATH
  });
  const speakableSchema = buildSpeakableSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TavanGuide />
    </>
  );
}
