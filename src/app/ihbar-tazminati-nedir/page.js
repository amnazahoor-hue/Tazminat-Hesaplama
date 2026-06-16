import IhbarTazminatGuide from "@/components/guide/ihbar/IhbarTazminatGuide";
import { IHBAR_NEDIR_PATH, IHBAR_PAGE_SEO } from "@/config/site";
import { buildArticleSchema, buildPageMetadata, buildSpeakableSchema } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: IHBAR_PAGE_SEO.title,
  description: IHBAR_PAGE_SEO.description,
  path: IHBAR_NEDIR_PATH,
  keywords: IHBAR_PAGE_SEO.keywords
});

export default function IhbarTazminatGuidePage() {
  const articleSchema = buildArticleSchema({
    headline: IHBAR_PAGE_SEO.title,
    path: IHBAR_NEDIR_PATH
  });
  const speakableSchema = buildSpeakableSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <IhbarTazminatGuide />
    </>
  );
}
