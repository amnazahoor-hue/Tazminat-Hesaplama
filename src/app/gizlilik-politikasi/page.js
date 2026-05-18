import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Gizlilik Politikasi | Tazminat Hesaplama",
  description: "Tazminat Hesaplama gizlilik politikasi: veri kullanimi, cerezler ve kullanici haklari.",
  path: "/gizlilik-politikasi",
  keywords: ["gizlilik politikasi", "veri guvenligi", "kidem hesaplama gizlilik"]
});

export default function PrivacyPolicyPage() {
  return (
    <section className="legal-page legal-guide container">
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: "/" },
          { name: "Gizlilik Politikasi", path: "/gizlilik-politikasi" }
        ]}
      />
      <header className="legal-hero">
        <span className="legal-hero-tag">YASAL METIN</span>
        <h1>Gizlilik Politikasi</h1>
        <p>
          Bu platform hesaplamalari istemci tarafinda yapar; kullanici verileri varsayilan duzende sunucuya
          aktarilmaz ve tum islemler cihazinizda gerceklesir.
        </p>
      </header>

      <div className="legal-grid">
        <article className="legal-card">
          <h2>Toplanan Veriler</h2>
          <p>
            Temel kullanimda ad-soyad, kimlik, telefon veya e-posta gibi kisisel veriler talep edilmez.
            Hesaplama icin girilen maas ve tarih bilgileri yalnizca anlik islenir.
          </p>
        </article>
        <article className="legal-card">
          <h2>Veri Isleme Amaci</h2>
          <p>
            Girdiler kidem, ihbar ve izin hesaplamasini gostermek icin kullanilir. Sistem varsayilan olarak bu
            verileri kalici veri tabaninda saklamaz.
          </p>
        </article>
        <article className="legal-card">
          <h2>Cerez ve Teknik Kayitlar</h2>
          <p>
            Sayfa guvenligi ve performansi icin teknik cerezler kullanilabilir. Kisisel profil cikarmaya
            yonelik davranissal takip politikasi uygulanmaz.
          </p>
        </article>
        <article className="legal-card">
          <h2>Analitik ve Reklam Araclari</h2>
          <p>
            Google Analytics veya benzeri analiz/reklam servisleri etkinlestirildiginde, ilgili servisler kendi
            politikalarina gore anonim veya cihaz bazli veriler isleyebilir. Bu durumda cerez bildirimi ve
            acik riza mekanizmasi guncellenir.
          </p>
        </article>
        <article className="legal-card">
          <h2>GDPR ve CCPA Uyum Notu</h2>
          <p>
            AB ve California ziyaretcileri icin veri erisimi, silme ve isleme itiraz haklari uygulanir.
            Talepleriniz e-posta uzerinden kayda alinarak yasal sureler dahilinde cevaplanir.
          </p>
        </article>
        <article className="legal-card">
          <h2>Kullanici Haklari</h2>
          <p>
            Gizlilik talepleriniz, veri isleme sorulariniz ve politika bildirimleriniz icin
            info@tazminathesaplama.com adresine ulasabilirsiniz.
          </p>
        </article>
      </div>
    </section>
  );
}
