import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/layouts/Footer";
import { Inter } from "next/font/google";
import { buildPageMetadata } from "@/utils/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata = buildPageMetadata({
  title: "Kidem Tazminati Hesaplama 2024 | Ucretsiz Ihbar ve Kidem Hesaplama",
  description:
    "Ucretsiz kidem tazminati ve ihbar tazminati hesaplama araci. 4857 sayili Is Kanunu'na gore guncel tavan ile hesaplayin.",
  path: "/",
  keywords: [
    "kidem tazminati hesaplama",
    "ihbar tazminati hesaplama",
    "tazminat hesaplama",
    "kidem tazminati tavani 2024"
  ]
});

export default function RootLayout({ children }) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body className={inter.variable}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
