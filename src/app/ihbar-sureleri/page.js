import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "Ihbar Sureleri | Tazminat Hesaplama",
  description: "Ihbar sureleri tablosu: kideme gore 2, 4, 6 ve 8 haftalik yasal bildirim sureleri.",
  path: "/ihbar-sureleri",
  keywords: ["ihbar sureleri", "ihbar tazminati sure", "is kanunu 17"]
});

export default function NoticePeriodsPage() {
  return (
    <section className="legal-page legal-guide container">
      <BreadcrumbSchema items={[{ name: "Anasayfa", path: "/" }, { name: "Ihbar Sureleri", path: "/ihbar-sureleri" }]} />
      <header className="legal-hero">
        <span className="legal-hero-tag">REFERANS TABLO</span>
        <h1>Ihbar Sureleri</h1>
        <p>4857 sayili Is Kanunu Md. 17 kapsaminda kideme gore uygulanacak ihbar sureleri asagidadir.</p>
      </header>

      <table className="mini-table" id="tablo">
        <thead>
          <tr>
            <th>Hizmet Suresi</th>
            <th>Ihbar Suresi</th>
            <th>Gun Karsiligi</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>0-6 ay</td><td>2 hafta</td><td>14 gun</td></tr>
          <tr><td>6-18 ay</td><td>4 hafta</td><td>28 gun</td></tr>
          <tr><td>18-36 ay</td><td>6 hafta</td><td>42 gun</td></tr>
          <tr><td>36 ay ve uzeri</td><td>8 hafta</td><td>56 gun</td></tr>
        </tbody>
      </table>

      <div className="legal-actions">
        <Link href="/ihbar-tazminati-nedir/">İhbar Tazminatı Rehberi</Link>
        <Link href="/#hesapla">Ana Hesaplayiciyi Ac</Link>
      </div>
    </section>
  );
}
