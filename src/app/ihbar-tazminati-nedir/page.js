import IhbarTazminatGuide from "@/components/guide/ihbar/IhbarTazminatGuide";
import { IHBAR_NEDIR_PATH } from "@/config/site";
import { buildArticleSchema, buildPageMetadata, buildSpeakableSchema } from "@/utils/seo";

const PAGE_TITLE = "İhbar Tazminatı Nedir? | Hesaplama ve Çalışan Hakları";

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description:
    "İhbar tazminatı nedir, kimler hak kazanır ve nasıl hesaplanır? İhbar süreleri, örnekler, vergi kuralları ve kıdem tazminatı farkları bu rehberde açıklanır.",
  path: IHBAR_NEDIR_PATH,
  keywords: ["ihbar tazminatı nedir", "ihbar tazminatı", "ihbar süresi", "bildirim ücreti", "PILON"]
});

export default function IhbarTazminatGuidePage() {
  const articleSchema = buildArticleSchema({ headline: PAGE_TITLE, path: IHBAR_NEDIR_PATH });
  const speakableSchema = buildSpeakableSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <IhbarTazminatGuide />
    </>
  );
}
