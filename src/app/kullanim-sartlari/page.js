import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Kullanim Sartlari | Tazminat Hesaplama",
  description: "Tazminat Hesaplama kullanim sartlari: hizmet kapsami, sorumluluk ve guncelleme esaslari.",
  path: "/kullanim-sartlari",
  keywords: ["kullanim sartlari", "hukuki kosullar", "tazminat hesaplama kullanimi"]
});

export default function TermsPage() {
  return (
    <section className="legal-page legal-guide container">
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: "/" },
          { name: "Kullanim Sartlari", path: "/kullanim-sartlari" }
        ]}
      />
      <header className="legal-hero">
        <span className="legal-hero-tag">KULLANIM KOSULLARI</span>
        <h1>Kullanim Sartlari</h1>
        <p>Bu arac bilgilendirme amaclidir ve hukuki danismanlik yerine gecmez.</p>
      </header>

      <div className="legal-grid">
        <article className="legal-card">
          <h2>Kullanim Kurallari</h2>
          <p>
            Siteyi kullanan herkes, sayfa iceriklerini hukuka uygun amaclarla kullanmayi, hizmete zarar
            verecek otomasyonlardan ve kotuye kullanimdan kacinmayi kabul eder.
          </p>
        </article>
        <article className="legal-card">
          <h2>Hizmet Kapsami</h2>
          <p>
            Platform, Turk Is Hukuku&apos;ndaki genel formullere dayali kidem, ihbar ve izin hesaplama araclari
            sunar. Sonuclar tahmini niteliktedir.
          </p>
        </article>
        <article className="legal-card">
          <h2>Kullanici Sorumlulugu</h2>
          <p>
            Girilen bilgilerin dogrulugundan kullanici sorumludur. Hatali veya eksik veri, hesaplama sonucunu
            dogrudan etkileyebilir.
          </p>
        </article>
        <article className="legal-card">
          <h2>Sorumluluk ve Mesuliyet Siniri</h2>
          <p>
            Site icerigine dayanilarak alinan kararlardan dogabilecek dogrudan veya dolayli zararlardan
            isletmeci sorumlu tutulamaz.
          </p>
        </article>
        <article className="legal-card">
          <h2>Kisitlamalar</h2>
          <p>
            Kod, icerik veya hizmetin izinsiz kopyalanmasi, tersine muhendislik amacli otomatik tarama ya da
            hizmeti aksatma girisimleri yasaktir.
          </p>
        </article>
        <article className="legal-card">
          <h2>Guncelleme Hakki</h2>
          <p>
            Icerik ve kullanim kosullari, mevzuat degisikliklerine paralel olarak onceden bildirim olmaksizin
            guncellenebilir.
          </p>
        </article>
      </div>
    </section>
  );
}
