import CompensationCalculator from "@/components/CompensationCalculator";
import { buildOrganizationSchema } from "@/utils/seo";

export default function HomePage() {
  const organizationSchema = buildOrganizationSchema();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <CompensationCalculator />
    </>
  );
}
