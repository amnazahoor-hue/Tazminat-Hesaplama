import Link from "next/link";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Kidem Tazminati Nedir? | Tazminat Hesaplama",
  description: "Kidem tazminati rehberi: tanim, hukuki dayanak, formul, tavan ve vergi aciklamalari.",
  path: "/kidem-tazminati-nedir",
  keywords: ["kidem tazminati nedir", "kidem hesabi", "is kanunu 14"]
});

export default function SeveranceGuidePage() {
  return (
    <section className="legal-page legal-guide container">
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: "/" },
          { name: "Kidem Tazminati Nedir?", path: "/kidem-tazminati-nedir" }
        ]}
      />
      <header className="legal-hero">
        <span className="legal-hero-tag">BILGI REHBERI</span>
        <h1>Kidem Tazminati Nedir?</h1>
        <p>
          Kidem tazminati, belirli kosullarla isten ayrilan isciye her tam hizmet yili icin odenen tazminat
          tutaridir.
        </p>
      </header>

      <div className="legal-grid">
        <article className="legal-card">
          <h2>Tanim</h2>
          <p>Isciye gecen hizmet suresi karsiliginda taninan yasal bir haktir.</p>
        </article>

        <article className="legal-card">
          <h2>Hukuki Dayanak (Is Kanunu Md. 14)</h2>
          <p>Kidem tazminatinin temel dayagi 1475 sayili Kanun&apos;un 14. maddesidir.</p>
        </article>

        <article className="legal-card">
          <h2>Hak Kazanma Kosullari</h2>
          <p>Genel kural olarak en az 1 yil kidem ve uygun fesih nedeni aranir.</p>
        </article>

        <article className="legal-card">
          <h2>Hesaplama Formulu</h2>
          <p>Brut Ucret x Hizmet Yili (kidem tavani uygulanarak).</p>
        </article>

        <article className="legal-card">
          <h2>Tavan Uygulamasi</h2>
          <p>Kidem tutari, donemsel olarak aciklanan kidem tazminati tavanini asamaz.</p>
        </article>

        <article className="legal-card">
          <h2>Vergi Durumu</h2>
          <p>Kidem tazminatinda gelir vergisi uygulanmaz; damga vergisi uygulamasi doneme gore degisebilir.</p>
        </article>

        <article className="legal-card">
          <h2>Diger Tazminat Turleriyle Fark</h2>
          <p>Ihbar tazminati bildirim suresine, izin ucreti ise kullanilmamis izin gunlerine dayanir.</p>
        </article>

        <article className="legal-card">
          <h2>Tarihsel Arka Plan</h2>
          <p>Kidem tazminati uzun yillardir Turk Is Hukuku&apos;nda isciyi koruyan temel mekanizmalardan biridir.</p>
        </article>
      </div>

      <div className="legal-actions">
        <Link href="/#hesapla">Hesaplayiciya Git</Link>
        <Link href="/ihbar-sureleri">Ihbar Surelerini Incele</Link>
        <Link href="/tazminat-tavani-2024">Guncel Tavan Tutarlari</Link>
      </div>
    </section>
  );
}
