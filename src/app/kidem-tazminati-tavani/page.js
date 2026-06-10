import TavanGuide from "@/components/guide/tavan/TavanGuide";
import { KIDEM_TAVANI_PATH } from "@/config/site";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Türkiye'de 2026 Yılına Kadar Geçerli Kıdem Tazminatı Tavanı: Güncellenmiş Oranlar ve Hesaplama Kılavuzu",
  description:
    "Türkiye'de 2026 yılı için kıdem tazminatı tavanı, tarihsel tavan oranları, hesaplama yöntemleri, vergi kuralları ve uygunluk şartları. En son resmi rakamlarla güncellenmiştir.",
  path: KIDEM_TAVANI_PATH,
  keywords: ["Kıdem Tazminatı Tavanı", "kıdem tazminatı tavanı 2026", "tazminat tavanı", "64.948,77"]
});

export default function TavanGuidePage() {
  return <TavanGuide />;
}
