import MiniNoticeCalculator from "@/components/MiniNoticeCalculator";
import Link from "next/link";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Ihbar Tazminati Hesaplama | Tazminat Hesaplama",
  description: "Ihbar tazminati hesaplama araci: kideme gore sure ve tutar hesaplamasi.",
  path: "/ihbar-tazminati-hesaplama",
  keywords: ["ihbar tazminati hesaplama", "ihbar suresi", "bildirim suresi"]
});

export default function NoticePayPage() {
  return (
    <section className="container legal-page legal-guide">
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: "/" },
          { name: "Ihbar Tazminati Hesaplama", path: "/ihbar-tazminati-hesaplama" }
        ]}
      />
      <header className="legal-hero">
        <span className="legal-hero-tag">HESAPLAMA ARACI</span>
        <h1>Ihbar Tazminati Hesaplama</h1>
        <p>Ihbar suresini ve tahmini ihbar odemesini, girilen verilere gore otomatik hesaplayin.</p>
      </header>
      <MiniNoticeCalculator />
      <div className="legal-actions">
        <Link href="/#hesapla">Anasayfa Tam Hesaplama</Link>
        <Link href="/ihbar-sureleri">Ihbar Sureleri Tablosu</Link>
      </div>
    </section>
  );
}
