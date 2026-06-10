import LegalPageShell from "@/components/legal/LegalPageShell";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Gizlilik Politikası | Tazminat Hesaplama",
  description: "Tazminat Hesaplama gizlilik politikası: veri kullanımı, çerezler ve kullanıcı hakları.",
  path: "/gizlilik-politikasi",
  keywords: ["gizlilik politikası", "veri güvenliği", "kıdem hesaplama gizlilik"]
});

const SECTIONS = [
  {
    title: "Toplanan Veriler",
    body: (
      <p>
        Temel kullanımda ad-soyad, kimlik, telefon veya e-posta gibi kişisel veriler talep edilmez. Hesaplama
        için girilen maaş ve tarih bilgileri yalnızca anlık işlenir.
      </p>
    )
  },
  {
    title: "Veri İşleme Amacı",
    body: (
      <p>
        Girdiler kıdem, ihbar ve izin hesaplamasını göstermek için kullanılır. Sistem varsayılan olarak bu
        verileri kalıcı veri tabanında saklamaz.
      </p>
    )
  },
  {
    title: "Çerez ve Teknik Kayıtlar",
    body: (
      <p>
        Sayfa güvenliği ve performansı için teknik çerezler kullanılabilir. Kişisel profil çıkarmaya yönelik
        davranışsal takip politikası uygulanmaz.
      </p>
    )
  },
  {
    title: "Analitik ve Reklam Araçları",
    body: (
      <p>
        Google Analytics veya benzeri analiz/reklam servisleri etkinleştirildiğinde, ilgili servisler kendi
        politikalarına göre anonim veya cihaz bazlı veriler işleyebilir. Bu durumda çerez bildirimi ve açık
        rıza mekanizması güncellenir.
      </p>
    )
  },
  {
    title: "GDPR ve CCPA Uyum Notu",
    body: (
      <p>
        AB ve California ziyaretçileri için veri erişimi, silme ve işleme itiraz hakları uygulanır. Talepleriniz
        e-posta üzerinden kayda alınarak yasal süreler dahilinde cevaplanır.
      </p>
    )
  },
  {
    title: "Kullanıcı Hakları",
    body: (
      <p>
        Gizlilik talepleriniz, veri işleme sorularınız ve politika bildirimleriniz için{" "}
        <a href="mailto:info@tazminathesaplama.com">info@tazminathesaplama.com</a> adresine ulaşabilirsiniz.
      </p>
    )
  }
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      path="/gizlilik-politikasi"
      breadcrumb={[
        { name: "Anasayfa", path: "/" },
        { name: "Gizlilik Politikası", path: "/gizlilik-politikasi" }
      ]}
      tag="Yasal Metin"
      title="Gizlilik Politikası"
      lead="Bu platform hesaplamaları istemci tarafında yapar; kullanıcı verileri varsayılan düzende sunucuya aktarılmaz ve tüm işlemler cihazınızda gerçekleşir."
      sections={SECTIONS}
    />
  );
}
