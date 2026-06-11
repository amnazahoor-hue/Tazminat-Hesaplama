import LegalPageShell from "@/components/legal/LegalPageShell";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "İletişim | Tazminat Hesaplama",
  description:
    "Tazminat Hesaplama ile iletişime geçin: soru, geri bildirim ve teknik destek talepleri için e-posta kanallarımız.",
  path: "/iletisim",
  keywords: ["iletişim", "destek", "tazminat hesaplama yardım", "bize ulaşın"]
});

const HIGHLIGHTS = [
  {
    label: "E-posta",
    value: "info@tazminathesaplama.com",
    detail: "Genel sorular ve geri bildirimler"
  },
  {
    label: "Çalışma Saatleri",
    value: "Hafta içi 09:00 – 18:00",
    detail: "Türkiye saati (TSİ)"
  },
  {
    label: "Yanıt Süresi",
    value: "1–2 iş günü",
    detail: "Talepler sırayla değerlendirilir"
  }
];

const SECTIONS = [
  {
    id: "iletisim",
    title: "E-posta Kanalları",
    body: (
      <>
        <p>
          Hesaplama aracı, içerik önerileri ve genel bilgi talepleri için aşağıdaki adresi kullanabilirsiniz:
        </p>
        <p>
          <a className="legal-contact-mail" href="mailto:info@tazminathesaplama.com">
            info@tazminathesaplama.com
          </a>
        </p>
        <p>
          Teknik sorunlar ve hesaplama girdileriyle ilgili destek için alternatif adres:
        </p>
        <p>
          <a className="legal-contact-mail" href="mailto:support@tazminathesaplama.com">
            support@tazminathesaplama.com
          </a>
        </p>
      </>
    )
  },
  {
    title: "Destek Kapsamı",
    body: (
      <p>
        Kıdem tazminatı, ihbar tazminatı ve toplam tazminat hesaplayıcılarının kullanımı, sayfa yönlendirmeleri,
        sonuçların yorumlanması ve genel mevzuat bilgilendirmesi konularında yardımcı oluruz. Kişiye özel hukuki
        danışmanlık veya resmi temsil hizmeti sunulmaz.
      </p>
    )
  },
  {
    id: "destek",
    title: "Talep Gönderirken",
    body: (
      <p>
        E-posta konu satırına &quot;Tazminat Hesaplama Destek&quot; yazmanız yanıt sürecini hızlandırır. Mesajınızda
        ad-soyad, talep konusu ve mümkünse ekran görüntüsü paylaşmanız önerilir.
      </p>
    )
  },
  {
    title: "Geri Bildirim",
    body: (
      <p>
        Arayüz, hesaplama sonuçları veya rehber içerikleri hakkındaki önerileriniz platformu geliştirmemize yardımcı
        olur. Yapıcı geri bildirimlerinizi memnuniyetle değerlendiririz.
      </p>
    )
  }
];

export default function ContactPage() {
  return (
    <LegalPageShell
      path="/iletisim"
      breadcrumb={[
        { name: "Anasayfa", path: "/" },
        { name: "İletişim", path: "/iletisim" }
      ]}
      tag="Destek"
      title="Bize Ulaşın"
      lead="Soru, öneri ve teknik destek talepleriniz için e-posta kanallarımız üzerinden doğrudan iletişime geçebilirsiniz."
      highlights={HIGHLIGHTS}
      sections={SECTIONS}
    />
  );
}
