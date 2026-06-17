import CompensationCalculator from "@/components/CompensationCalculator";
import { HOME_PAGE_SEO, HOME_PATH, siteUrl } from "@/config/site";
import {
  buildOrganizationSchema,
  buildPageMetadata,
  buildSpeakableSchema,
  buildWebApplicationSchema,
  SPEAKABLE_SELECTORS
} from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: HOME_PAGE_SEO.title,
  description: HOME_PAGE_SEO.description,
  path: HOME_PATH,
  keywords: HOME_PAGE_SEO.keywords
});

export default function HomePage() {
  const organizationSchema = buildOrganizationSchema();
  const webApplicationSchema = buildWebApplicationSchema();
  const speakableSchema = buildSpeakableSchema({
    name: HOME_PAGE_SEO.title,
    url: siteUrl(HOME_PATH),
    cssSelector: SPEAKABLE_SELECTORS.tool
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CompensationCalculator />
    </>
  );
}
