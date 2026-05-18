import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Yasal Uyari | Tazminat Hesaplama",
  description: "Yasal uyari: hesaplama sinirlari, hukuki farkliliklar ve profesyonel danismanlik notlari.",
  path: "/yasal-uyari",
  keywords: ["yasal uyari", "disclaimer", "tazminat hesaplama sinirlari"]
});

export default function LegalDisclaimerPage() {
  return (
    <section className="legal-page legal-guide container">
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: "/" },
          { name: "Yasal Uyari", path: "/yasal-uyari" }
        ]}
      />
      <header className="legal-hero">
        <span className="legal-hero-tag">YASAL UYARI</span>
        <h1>Yasal Uyari</h1>
        <p>
          Hesaplamalarda standart Is Kanunu formulleri esas alinmistir; buna ragmen sonuclar baglayici hukuki
          mutalaa yerine gecmez.
        </p>
      </header>

      <div className="legal-grid">
        <article className="legal-card">
          <h2>Hesaplama Esaslari</h2>
          <p>
            Tavan tutari, bildirim sureleri ve temel kidem/ihbar katsayilari guncel mevzuata gore duzenli
            olarak gozden gecirilir.
          </p>
        </article>
        <article className="legal-card">
          <h2>Sonuc Dogrulugu ve Sinirlar</h2>
          <p>
            Arac tahmini sonuc uretir. Ozel sozlesme maddeleri, ek menfaatler ve emsal yargi kararlarina bagli
            kalemler nihai hesapta farklilik olusturabilir.
          </p>
        </article>
        <article className="legal-card">
          <h2>Nihai Tutar Farkliliklari</h2>
          <p>
            Toplu is sozlesmeleri, sendikal duzenlemeler, ozel sozlesme maddeleri veya mahkeme kararlari nihai
            tutari degistirebilir.
          </p>
        </article>
        <article className="legal-card">
          <h2>Dahil Olmayan Kalemler</h2>
          <p>
            Prim, ikramiye, yol, yemek, fazla mesai ve sozlesmesel ek menfaatler hesaplama modeline her zaman
            tam olarak yansimayabilir.
          </p>
        </article>
        <article className="legal-card">
          <h2>Ucuncu Taraf Baglantilar</h2>
          <p>
            Sitede yer alabilecek dis baglantilar yalnizca bilgilendirme amaciyla verilir. Ucuncu taraf
            iceriklerin guncelligi ve dogrulugu ilgili yayinci sorumlulugundadir.
          </p>
        </article>
        <article className="legal-card">
          <h2>Profesyonel Danismanlik</h2>
          <p>Kesin degerlendirme icin is hukuku alaninda uzman bir avukata basvurunuz.</p>
        </article>
      </div>
    </section>
  );
}
