import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Is Kanunu Ozeti | Tazminat Hesaplama",
  description: "Is Kanunu temel maddeleri: kidem, ihbar, hakli fesih ve yillik izin ozetleri.",
  path: "/is-kanunu",
  keywords: ["is kanunu", "madde 17 ihbar", "madde 24 hakli fesih", "madde 53 izin"]
});

export default function LaborLawPage() {
  return (
    <section className="legal-page legal-guide container">
      <BreadcrumbSchema items={[{ name: "Anasayfa", path: "/" }, { name: "Is Kanunu Ozeti", path: "/is-kanunu" }]} />
      <header className="legal-hero">
        <span className="legal-hero-tag">MEVZUAT OZETI</span>
        <h1>Is Kanunu Ozeti</h1>
        <p>Onemli maddelerin sade dille ozetlenmis hali:</p>
      </header>

      <div className="legal-grid" id="mevzuat">
        <article className="legal-card">
          <h2>Madde 14 (1475 Sayili Kanun)</h2>
          <p>Kidem tazminatinin temel dayanak maddesidir ve hak kazanma kosullarini cerceveler.</p>
        </article>
        <article className="legal-card">
          <h2>Madde 17 (Ihbar)</h2>
          <p>Bildirim suresi ve ihbar tazminati esaslarini duzenler.</p>
        </article>
        <article className="legal-card">
          <h2>Madde 24 (Hakli Nedenle Fesih)</h2>
          <p>Isci tarafindan hakli nedenle derhal fesih hallerini belirtir.</p>
        </article>
        <article className="legal-card">
          <h2>Madde 53 (Yillik Izin)</h2>
          <p>Kidem bazli asgari yillik ucretli izin haklarini duzenler.</p>
        </article>
        <article className="legal-card">
          <h2>Madde 59 (Izin Ucreti)</h2>
          <p>Sozlesme sona erdiginde kullanilmayan izin gunlerinin ucrete donusmesini duzenler.</p>
        </article>
        <article className="legal-card">
          <h2>Onemli Not</h2>
          <p>
            Bu sayfa sadece bilgilendirme amaclidir. Guncel resmi metin icin Resmi Gazete ve resmi kurum
            yayimlarini esas aliniz.
          </p>
        </article>
      </div>
    </section>
  );
}
