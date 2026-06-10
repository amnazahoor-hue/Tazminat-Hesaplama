import IhbarTazminatGuide from "@/components/guide/ihbar/IhbarTazminatGuide";
import { IHBAR_NEDIR_PATH } from "@/config/site";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "İhbar Tazminatı Nedir? Anlamı, Uygunluk Şartları, Hesaplaması ve Çalışan Hakları",
  description:
    "İş hukuku kapsamında ihbar tazminatının ne olduğunu, kimlerin hak kazandığını, nasıl hesaplandığını, ihbar sürelerini, PILON'u (İşten Çıkarma Tazminatı Programı), vergileri ve ihbar tazminatı ile kıdem tazminatı arasındaki farkı öğrenin.",
  path: IHBAR_NEDIR_PATH,
  keywords: ["ihbar tazminatı nedir", "ihbar tazminatı", "ihbar süresi", "bildirim ücreti", "PILON"]
});

export default function IhbarTazminatGuidePage() {
  return <IhbarTazminatGuide />;
}
