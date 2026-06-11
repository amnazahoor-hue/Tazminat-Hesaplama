import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Preloader from "@/components/common/Preloader";
import ScrollRevealInit from "@/components/common/ScrollRevealInit";
import Footer from "@/components/layouts/Footer";
import { Inter } from "next/font/google";
import { SITE_URL } from "@/config/site";
import { IMAGES } from "@/config/images";
import { buildPageMetadata } from "@/utils/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildPageMetadata({
    title: "Tazminat Hesaplama",
    description: "Kıdem tazminatı, ihbar tazminatı ve yıllık izin ücreti hesaplama araçları.",
    path: "/",
    keywords: ["tazminat hesaplama", "kıdem tazminatı hesaplaması"]
  }),
  icons: {
    icon: IMAGES.icon,
    apple: IMAGES.icon
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <Preloader />
        <Navbar />
        <ScrollRevealInit />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
