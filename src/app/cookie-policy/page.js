import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Cerez Politikasi | Tazminat Hesaplama",
  description: "Tazminat Hesaplama cerez politikasi: kullanilan cerez turleri ve tercih yonetimi.",
  path: "/cookie-policy",
  keywords: ["cerez politikasi", "cookies", "teknik cerezler"]
});

export default function CookiePolicyPage() {
  return (
    <section className="legal-page legal-guide container">
      <BreadcrumbSchema items={[{ name: "Anasayfa", path: "/" }, { name: "Cerez Politikasi", path: "/cookie-policy" }]} />
      <header className="legal-hero">
        <span className="legal-hero-tag">YASAL BILGI</span>
        <h1>Cerez Politikasi</h1>
        <p>Bu sayfa, sitede kullanilan cerez turlerini ve kullanici tercih haklarini aciklar.</p>
      </header>

      <div className="legal-grid">
        <article className="legal-card">
          <h2>Zorunlu Cerezler</h2>
          <p>Sayfa islevlerinin duzgun calismasi icin gerekli teknik cerezlerdir.</p>
        </article>
        <article className="legal-card">
          <h2>Performans Cerezleri</h2>
          <p>Site performansini iyilestirmek ve hata takibini kolaylastirmak amaciyla kullanilabilir.</p>
        </article>
        <article className="legal-card">
          <h2>Tercih Yonetimi</h2>
          <p>Tarayici ayarlarinizdan cerezleri sinirlayabilir veya silebilirsiniz.</p>
        </article>
        <article className="legal-card">
          <h2>Ek Bilgi</h2>
          <p>Cerez politikasi, gizlilik politikasi ile birlikte degerlendirilmelidir.</p>
        </article>
      </div>
    </section>
  );
}
