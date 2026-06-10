import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Preloader from "@/components/common/Preloader";
import ScrollRevealInit from "@/components/common/ScrollRevealInit";
import Footer from "@/components/layouts/Footer";
import { Inter } from "next/font/google";
import { buildPageMetadata } from "@/utils/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata = {
  ...buildPageMetadata({
    title: "Tazminat Hesaplama",
    description: "Kıdem tazminatı, ihbar tazminatı ve yıllık izin ücreti hesaplama araçları.",
    path: "/",
    keywords: ["tazminat hesaplama", "kıdem tazminatı hesaplaması"]
  }),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png"
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
