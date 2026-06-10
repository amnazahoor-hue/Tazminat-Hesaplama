import TotalCompensationGuide from "@/components/guide/TotalCompensationGuide";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "2026 Yılı İçin Ücret Hesaplaması | Kıdem Tazminatı, Maaş ve Toplam Ücret Rehberi",
  description:
    "2026 yılında işten ayrılma tazminatı, ihbar tazminatı, ikramiyeler, fazla mesai, yıllık izin ve brüt maaş hesaplamaları da dahil olmak üzere tazminat hesaplamalarının nasıl yapılacağını keşfedin.",
  path: "/toplam-tazminat-hesaplama-kilavuzu",
  keywords: ["tazminat hesaplaması", "toplam tazminat", "ücret hesaplaması", "kıdem tazminatı"]
});

export default function TotalCompensationGuidePage() {
  return <TotalCompensationGuide />;
}
