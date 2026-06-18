import AuthorPageShell from "@/components/author/AuthorPageShell";
import StructuredDataScript from "@/components/seo/StructuredDataScript";
import { SITE_AUTHOR } from "@/config/author";
import { AUTHOR_PATH, HOME_PATH } from "@/config/site";
import {
  buildAuthorPageSchema,
  buildBreadcrumbListSchema,
  buildPageMetadata,
  buildSchemaGraph,
  buildWebPageSchema,
  ROBOTS_NOINDEX_FOLLOW
} from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Yazar | Doç. Dr. Evren Mazı — İş Hukuku Uzmanı",
  description:
    "Tazminat Hesaplama platformu yazar profili: Doç. Dr. Evren Mazı'nın iş hukuku, kıdem tazminatı ve tazminat hesaplamaları alanındaki editoryal uzmanlığı hakkında bilgi edinin.",
  path: AUTHOR_PATH,
  keywords: ["iş hukuku uzmanı", "evren mazı", "kıdem tazminatı uzmanı", "yazar"],
  robots: ROBOTS_NOINDEX_FOLLOW
});

const authorBreadcrumb = [
  { name: "Anasayfa", path: HOME_PATH },
  { name: "Yazar", path: AUTHOR_PATH }
];

const authorStructuredData = buildSchemaGraph(
  buildWebPageSchema({
    name: "Yazar | Doç. Dr. Evren Mazı — İş Hukuku Uzmanı",
    description: SITE_AUTHOR.tagline,
    path: AUTHOR_PATH
  }),
  buildBreadcrumbListSchema(authorBreadcrumb),
  buildAuthorPageSchema({
    author: SITE_AUTHOR,
    path: AUTHOR_PATH
  })
);

export default function AuthorPage() {
  return (
    <>
      <StructuredDataScript schema={authorStructuredData} />
      <AuthorPageShell
        breadcrumb={authorBreadcrumb}
        name={SITE_AUTHOR.name}
        title={SITE_AUTHOR.title}
        tagline={SITE_AUTHOR.tagline}
        image={SITE_AUTHOR.image}
        imageAlt={SITE_AUTHOR.imageAlt}
        expertise={SITE_AUTHOR.expertise}
        bio={SITE_AUTHOR.bio}
        disclaimer={SITE_AUTHOR.disclaimer}
        credentials={SITE_AUTHOR.credentials}
      />
    </>
  );
}
