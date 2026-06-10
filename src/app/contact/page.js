import Link from "next/link";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "İletişim | Tazminat Hesaplama",
  description: "Tazminat Hesaplama ile iletişime geçin: soru, geri bildirim ve teknik destek talepleri.",
  path: "/contact",
  keywords: ["iletişim", "destek", "tazminat hesaplama yardım"]
});

const SECTIONS = [
  {
    id: "iletisim",
    title: "E-posta",
    body: (
      <>
        <p>
          <a className="legal-contact-mail" href="mailto:info@tazminathesaplama.com">
            info@tazminathesaplama.com
          </a>
        </p>
        <p>
          Alternatif:{" "}
          <a className="legal-contact-mail" href="mailto:support@tazminathesaplama.com">
            support@tazminathesaplama.com
          </a>
        </p>
      </>
    )
  },
  {
    title: "Çalışma Saatleri",
    body: <p>Hafta içi 09:00 – 18:00 (TSİ)</p>
  },
  {
    id: "destek",
    title: "Destek Kapsamı",
    body: <p>Genel kullanım, hesaplama girdileri ve sayfa yönlendirmeleri konusunda destek sağlanır.</p>
  },
  {
    title: "Yanıt Süresi",
    body: <p>Talepleriniz genellikle 1–2 iş günü içinde değerlendirilir ve geri dönüş yapılır.</p>
  },
  {
    title: "İletişim Formu",
    body: (
      <p>
        E-posta konu satırında &quot;Tazminat Hesaplama Destek&quot; ifadesini kullanarak ad-soyad, talep konusu ve
        detaylı açıklama iletebilirsiniz. Hızlı yanıt için{" "}
        <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link> sayfasındaki veri işleme notlarını da
        inceleyebilirsiniz.
      </p>
    )
  }
];

export default function ContactPage() {
  return (
    <LegalPageShell
      path="/contact"
      breadcrumb={[
        { name: "Anasayfa", path: "/" },
        { name: "İletişim", path: "/contact" }
      ]}
      tag="İletişim"
      title="Bize Ulaşın"
      lead="Soru, önerileriniz ve teknik destek talepleriniz için doğrudan e-posta ile ulaşabilirsiniz."
      sections={SECTIONS}
    />
  );
}
