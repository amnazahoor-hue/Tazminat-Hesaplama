import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/layouts/Footer";
import CanonicalLink from "@/components/seo/CanonicalLink";
import ClientEnhancements from "@/components/common/ClientEnhancements";
import { Inter } from "next/font/google";
import { HOME_PAGE_SEO, HOME_PATH, SITE_URL } from "@/config/site";
import { buildPageMetadata } from "@/utils/seo";
import { IMAGES } from "@/config/images";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildPageMetadata({
    title: HOME_PAGE_SEO.title,
    description: HOME_PAGE_SEO.description,
    path: HOME_PATH,
    keywords: HOME_PAGE_SEO.keywords
  }),
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" }
    ],
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/images/logo.webp" as="image" type="image/webp" />
        <link
          rel="preload"
          href={IMAGES.home.heroCarouselLira}
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        <CanonicalLink />
        <ClientEnhancements />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
