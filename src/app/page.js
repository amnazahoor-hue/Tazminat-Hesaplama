import CompensationCalculator from "@/components/CompensationCalculator";
import { HOME_PATH } from "@/config/site";
import {
  buildOrganizationSchema,
  buildPageMetadata,
  buildSpeakableSchema,
  buildWebApplicationSchema
} from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Kıdem Tazminatı Hesaplaması | Ücretsiz Online Hesaplayıcı",
  description:
    "İş Kanunu 4857 kapsamında kıdem, ihbar ve izin ücreti hesaplamasını ücretsiz yapın. Güncel tavan tutarları, formüller ve örneklerle anında sonuç alın.",
  path: HOME_PATH,
  keywords: ["kıdem tazminatı hesaplaması"]
});

export default function HomePage() {
  const organizationSchema = buildOrganizationSchema();
  const webApplicationSchema = buildWebApplicationSchema();
  const speakableSchema = buildSpeakableSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CompensationCalculator />
    </>
  );
}
