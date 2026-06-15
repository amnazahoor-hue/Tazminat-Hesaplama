import TotalCompensationGuide from "@/components/guide/TotalCompensationGuide";
import { TAZMINAT_HESAPLAMA_PATH } from "@/config/site";
import { buildArticleSchema, buildPageMetadata, buildSpeakableSchema } from "@/utils/seo";

const PAGE_TITLE = "Tazminat Hesaplama | 2026 Kıdem ve Toplam Ücret Rehberi";

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description:
    "Tazminat hesaplaması: kıdem, ihbar, izin, prim ve brüt maaş dahil toplam ücret rehberi. 2026 güncel formüller ve ücretsiz hesaplayıcı ile adım adım öğrenin.",
  path: TAZMINAT_HESAPLAMA_PATH,
  keywords: ["tazminat hesaplaması", "toplam tazminat", "ücret hesaplaması", "kıdem tazminatı"]
});

export default function TotalCompensationGuidePage() {
  const articleSchema = buildArticleSchema({ headline: PAGE_TITLE, path: TAZMINAT_HESAPLAMA_PATH });
  const speakableSchema = buildSpeakableSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TotalCompensationGuide />
    </>
  );
}
