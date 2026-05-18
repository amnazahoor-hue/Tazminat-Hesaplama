import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Hakkimizda | Tazminat Hesaplama",
  description: "Tazminat Hesaplama platformunun amaci, kapsami ve editoryal yaklasimi.",
  path: "/about-us",
  keywords: ["hakkimizda", "tazminat hesaplama platformu", "editoryal politika"]
});

export default function AboutUsPage() {
  return (
    <section className="legal-page legal-guide container">
      <BreadcrumbSchema items={[{ name: "Anasayfa", path: "/" }, { name: "Hakkimizda", path: "/about-us" }]} />
      <header className="legal-hero">
        <span className="legal-hero-tag">KURUMSAL</span>
        <h1>Hakkimizda</h1>
        <p>
          Tazminat Hesaplama, Turk Is Hukuku kapsamindaki kidem, ihbar ve izin odemeleri icin hizli ve
          anlasilir araclar sunmak amaciyla gelistirilmistir.
        </p>
      </header>

      <div className="legal-grid">
        <article className="legal-card">
          <h2>Misyon</h2>
          <p>Kullanicilarin temel hesaplama senaryolarini kolayca anlamasina yardimci olmak.</p>
        </article>
        <article className="legal-card">
          <h2>Vizyon</h2>
          <p>Calisanlarin yasal haklara erisimini kolaylastiran guvenilir dijital referans platformu olmak.</p>
        </article>
        <article className="legal-card">
          <h2>Yayin Politikasi</h2>
          <p>Icerikler mevzuat guncellemelerine gore periyodik olarak gozden gecirilir.</p>
        </article>
        <article className="legal-card">
          <h2>Sorumluluk Alani</h2>
          <p>Platform bilgilendirme amaclidir; kesin hukuki gorus yerine gecmez.</p>
        </article>
      </div>
    </section>
  );
}
