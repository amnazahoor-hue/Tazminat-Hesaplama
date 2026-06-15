import TavanGuide from "@/components/guide/tavan/TavanGuide";
import { KIDEM_TAVANI_PATH } from "@/config/site";
import { buildArticleSchema, buildPageMetadata, buildSpeakableSchema } from "@/utils/seo";

const PAGE_TITLE = "Kıdem Tazminatı Tavanı 2026 | Türkiye Oranları Rehberi";

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description:
    "2026 kıdem tazminatı tavanı, tarihsel oranlar, hesaplama yöntemi ve vergi kuralları. Türkiye için güncel resmi tavan tutarları ve uygunluk şartları.",
  path: KIDEM_TAVANI_PATH,
  keywords: ["Kıdem Tazminatı Tavanı", "kıdem tazminatı tavanı 2026", "tazminat tavanı", "64.948,77"]
});

export default function TavanGuidePage() {
  const articleSchema = buildArticleSchema({ headline: PAGE_TITLE, path: KIDEM_TAVANI_PATH });
  const speakableSchema = buildSpeakableSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TavanGuide />
    </>
  );
}
