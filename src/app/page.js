import CompensationCalculator from "@/components/CompensationCalculator";
import { HOME_PATH } from "@/config/site";
import { buildOrganizationSchema, buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Kıdem Tazminatı Hesaplaması | Formül, Örnekler ve Ücretsiz Hesaplayıcı",
  description:
    "İşten ayrılma tazminatı hesaplamasını adım adım formül, eyalet kuralları ve örneklerle öğrenin. Tam ödemenizi anında tahmin etmek için ücretsiz işten ayrılma tazminatı hesaplama aracımızı kullanın.",
  path: HOME_PATH,
  keywords: ["kıdem tazminatı hesaplaması"]
});

export default function HomePage() {
  const organizationSchema = buildOrganizationSchema();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <CompensationCalculator />
    </>
  );
}
