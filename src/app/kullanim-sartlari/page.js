import LegalPageShell from "@/components/legal/LegalPageShell";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Kullanım Şartları | Tazminat Hesaplama",
  description: "Tazminat Hesaplama kullanım şartları: hizmet kapsamı, sorumluluk ve güncelleme esasları.",
  path: "/kullanim-sartlari",
  keywords: ["kullanım şartları", "hukuki koşullar", "tazminat hesaplama kullanımı"]
});

const SECTIONS = [
  {
    title: "Kullanım Kuralları",
    body: (
      <p>
        Siteyi kullanan herkes, sayfa içeriklerini hukuka uygun amaçlarla kullanmayı, hizmete zarar verecek
        otomasyonlardan ve kötüye kullanımdan kaçınmayı kabul eder.
      </p>
    )
  },
  {
    title: "Hizmet Kapsamı",
    body: (
      <p>
        Platform, Türk İş Hukuku&apos;ndaki genel formüllere dayalı kıdem, ihbar ve izin hesaplama araçları sunar.
        Sonuçlar tahmini niteliktedir.
      </p>
    )
  },
  {
    title: "Kullanıcı Sorumluluğu",
    body: (
      <p>
        Girilen bilgilerin doğruluğundan kullanıcı sorumludur. Hatalı veya eksik veri, hesaplama sonucunu doğrudan
        etkileyebilir.
      </p>
    )
  },
  {
    title: "Sorumluluk ve Mesuliyet Sınırı",
    body: (
      <p>
        Site içeriğine dayanılarak alınan kararlardan doğabilecek doğrudan veya dolaylı zararlardan işletmeci
        sorumlu tutulamaz.
      </p>
    )
  },
  {
    title: "Kısıtlamalar",
    body: (
      <p>
        Kod, içerik veya hizmetin izinsiz kopyalanması, tersine mühendislik amaçlı otomatik tarama ya da hizmeti
        aksatma girişimleri yasaktır.
      </p>
    )
  },
  {
    title: "Güncelleme Hakkı",
    body: (
      <p>
        İçerik ve kullanım koşulları, mevzuat değişikliklerine paralel olarak önceden bildirim olmaksızın
        güncellenebilir.
      </p>
    )
  }
];

export default function TermsPage() {
  return (
    <LegalPageShell
      path="/kullanim-sartlari"
      breadcrumb={[
        { name: "Anasayfa", path: "/" },
        { name: "Kullanım Şartları", path: "/kullanim-sartlari" }
      ]}
      tag="Kullanım Koşulları"
      title="Kullanım Şartları"
      lead="Bu araç bilgilendirme amaçlıdır ve hukuki danışmanlık yerine geçmez."
      sections={SECTIONS}
    />
  );
}
