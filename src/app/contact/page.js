import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Iletisim | Tazminat Hesaplama",
  description: "Tazminat Hesaplama ile iletisime gecin: soru, geri bildirim ve teknik destek talepleri.",
  path: "/contact",
  keywords: ["iletisim", "destek", "tazminat hesaplama yardim"]
});

export default function ContactPage() {
  return (
    <section className="legal-page legal-guide container">
      <BreadcrumbSchema items={[{ name: "Anasayfa", path: "/" }, { name: "Iletisim", path: "/contact" }]} />
      <header className="legal-hero">
        <span className="legal-hero-tag">ILETISIM</span>
        <h1>Iletisim</h1>
        <p>
          Soru, onerileriniz ve teknik destek talepleriniz icin bize ulasabilirsiniz. Iletisim sayfasi
          AdSense uyumlulugu icin dogrudan erisilebilir e-posta bilgisini icerir.
        </p>
      </header>

      <div className="legal-grid">
        <article className="legal-card" id="iletisim">
          <h2>E-posta</h2>
          <p>info@tazminathesaplama.com</p>
          <p>Alternatif: support@tazminathesaplama.com</p>
        </article>
        <article className="legal-card">
          <h2>Calisma Saatleri</h2>
          <p>Hafta ici 09:00 - 18:00 (TSI)</p>
        </article>
        <article className="legal-card" id="destek">
          <h2>Destek Kapsami</h2>
          <p>Genel kullanim, hesaplama girdileri ve sayfa yonlendirmeleri konusunda destek saglanir.</p>
        </article>
        <article className="legal-card">
          <h2>Yanit Suresi</h2>
          <p>Talepleriniz genellikle 1-2 is gunu icinde degerlendirilir ve geri donus yapilir.</p>
        </article>
        <article className="legal-card">
          <h2>Iletisim Formu</h2>
          <p>
            E-posta konu satirinda "Tazminat Hesaplama Destek" ifadesini kullanarak ad-soyad, talep konusu ve
            detayli aciklama iletebilirsiniz.
          </p>
        </article>
      </div>
    </section>
  );
}
