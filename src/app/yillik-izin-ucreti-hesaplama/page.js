import MiniLeaveCalculator from "@/components/MiniLeaveCalculator";
import Link from "next/link";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Yillik Izin Ucreti Hesaplama | Tazminat Hesaplama",
  description: "Kullanilmamis yillik izin ucreti hesaplama araci ve kideme gore asgari izin tablosu.",
  path: "/yillik-izin-ucreti-hesaplama",
  keywords: ["yillik izin ucreti hesaplama", "kullanilmamis izin alacagi", "is kanunu 59"]
});

export default function LeavePayPage() {
  return (
    <section className="container legal-page legal-guide">
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: "/" },
          { name: "Yillik Izin Ucreti Hesaplama", path: "/yillik-izin-ucreti-hesaplama" }
        ]}
      />
      <header className="legal-hero">
        <span className="legal-hero-tag">HESAPLAMA ARACI</span>
        <h1>Yillik Izin Ucreti Hesaplama</h1>
        <p>Kullanilmayan izin gunlerinizi ve brut maas bilgilerinizi girerek tahmini izin alacagini bulun.</p>
      </header>
      <div id="hesapla">
        <MiniLeaveCalculator />
      </div>
      <div className="legal-actions">
        <Link href="/#hesapla">Anasayfa Tam Hesaplama</Link>
        <Link href="/is-kanunu">Is Kanunu Ozeti</Link>
      </div>
    </section>
  );
}
