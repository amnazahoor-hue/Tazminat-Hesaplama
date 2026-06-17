import LegalPageShell from "@/components/legal/LegalPageShell";
import { buildPageMetadata, ROBOTS_NOINDEX_FOLLOW } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Yasal Uyarı | Tazminat Hesaplama Sorumluluk Bildirimi",
  description:
    "Yasal uyarı: hesaplama sonuçları bilgilendirme amaçlıdır, bağlayıcı değildir. Hukuki farklılıklar ve profesyonel danışmanlık almanız gereken durumlar açıklanır.",
  path: "/yasal-uyari",
  keywords: ["yasal uyarı", "disclaimer", "tazminat hesaplama sınırları"],
  robots: ROBOTS_NOINDEX_FOLLOW
});

const SECTIONS = [
  {
    title: "Hesaplama Esasları",
    body: (
      <p>
        Tavan tutarı, bildirim süreleri ve temel kıdem/ihbar katsayıları güncel mevzuata göre düzenli olarak
        gözden geçirilir.
      </p>
    )
  },
  {
    title: "Sonuç Doğruluğu ve Sınırlar",
    body: (
      <p>
        Araç tahmini sonuç üretir. Özel sözleşme maddeleri, ek menfaatler ve emsal yargı kararlarına bağlı kalemler
        nihai hesapta farklılık oluşturabilir.
      </p>
    )
  },
  {
    title: "Nihai Tutar Farklılıkları",
    body: (
      <p>
        Toplu iş sözleşmeleri, sendikal düzenlemeler, özel sözleşme maddeleri veya mahkeme kararları nihai tutarı
        değiştirebilir.
      </p>
    )
  },
  {
    title: "Dahil Olmayan Kalemler",
    body: (
      <p>
        Prim, ikramiye, yol, yemek, fazla mesai ve sözleşmesel ek menfaatler hesaplama modeline her zaman tam olarak
        yansımayabilir.
      </p>
    )
  },
  {
    title: "Üçüncü Taraf Bağlantılar",
    body: (
      <p>
        Sitede yer alabilecek dış bağlantılar yalnızca bilgilendirme amacıyla verilir. Üçüncü taraf içeriklerin
        güncelliği ve doğruluğu ilgili yayıncı sorumluluğundadır.
      </p>
    )
  },
  {
    title: "Profesyonel Danışmanlık",
    body: <p>Kesin değerlendirme için iş hukuku alanında uzman bir avukata başvurunuz.</p>
  }
];

export default function LegalDisclaimerPage() {
  return (
    <LegalPageShell
      path="/yasal-uyari"
      breadcrumb={[
        { name: "Anasayfa", path: "/" },
        { name: "Yasal Uyarı", path: "/yasal-uyari" }
      ]}
      tag="Yasal Uyarı"
      title="Yasal Uyarı"
      lead="Hesaplamalarda standart İş Kanunu formülleri esas alınmıştır; buna rağmen sonuçlar bağlayıcı hukuki mütalaa yerine geçmez."
      sections={SECTIONS}
    />
  );
}
