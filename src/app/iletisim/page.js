import ContactPageShell from "@/components/contact/ContactPageShell";
import { ILETISIM_PATH } from "@/config/site";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "İletişim | Tazminat Hesaplama Destek ve Bilgi Merkezi",
  description:
    "Tazminat Hesaplama iletişim: genel bilgi, teknik destek, içerik önerileri ve gizlilik talepleri için e-posta kanalları ve yanıt süreçleri hakkında bilgi.",
  path: ILETISIM_PATH,
  keywords: ["iletişim", "destek", "tazminat hesaplama iletişim", "e-posta"]
});

export default function IletisimPage() {
  return (
    <ContactPageShell
      breadcrumb={[
        { name: "Anasayfa", path: "/" },
        { name: "İletişim", path: ILETISIM_PATH }
      ]}
      path={ILETISIM_PATH}
      tag="İletişim"
      title="Size nasıl yardımcı olabiliriz?"
      lead="Platform, hesaplama aracı ve rehber içeriklerle ilgili sorularınız için aşağıdaki e-posta kanallarını kullanabilirsiniz. Hukuki danışmanlık hizmeti sunulmaz."
      channels={[
        {
          label: "Genel Bilgi",
          email: "info@tazminathesaplama.com",
          detail: "Platform hakkında genel sorular, iş birliği ve basın talepleri için."
        },
        {
          label: "Teknik Destek",
          email: "support@tazminathesaplama.com",
          detail: "Hesaplama aracı, sayfa hataları ve teknik sorun bildirimleri için."
        }
      ]}
      sections={[
        {
          title: "Hangi konularda yazabilirsiniz?",
          body: (
            <>
              <p>
                Hesaplayıcı sonuçları, rehber içerikler, tavan tabloları veya site kullanımıyla ilgili geri
                bildirimlerinizi memnuniyetle alırız. Mesajınızda mümkünse ekran görüntüsü, kullandığınız tarayıcı
                ve karşılaştığınız sayfa adresini belirtmeniz çözümü hızlandırır.
              </p>
              <p>
                Kişisel dava dosyası, iş sözleşmesi incelemesi veya bireysel hukuki strateji talepleri platform
                kapsamı dışındadır; bu tür konularda lütfen bir iş hukuku avukatına başvurun.
              </p>
            </>
          )
        },
        {
          title: "Gizlilik ve veri talepleri",
          body: (
            <>
              <p>
                Gizlilik politikası, veri işleme veya çerez kullanımıyla ilgili taleplerinizi{" "}
                <a href="mailto:info@tazminathesaplama.com">info@tazminathesaplama.com</a> adresine iletebilirsiniz.
                Ayrıntılar için{" "}
                <a href="/gizlilik-politikasi">Gizlilik Politikası</a> sayfasını inceleyebilirsiniz.
              </p>
              <p>
                Hesaplama sırasında girilen maaş ve tarih bilgileri varsayılan düzende sunucuda kalıcı olarak
                saklanmaz; bu nedenle geçmiş hesaplama verisi talepleri genellikle karşılanamaz.
              </p>
            </>
          )
        },
        {
          title: "İçerik önerileri",
          body: (
            <p>
              Eksik gördüğünüz rehber konuları, güncellenmesi gereken tavan bilgileri veya sıkça sorulan sorular önerilerinizi
              paylaşabilirsiniz. Editör ekibimiz mevzuat uygunluğunu kontrol ettikten sonra uygun içerikleri
              planlı güncellemelere dahil eder.
            </p>
          )
        },
        {
          title: "Çalışma saatleri",
          body: (
            <p>
              E-posta mesajları hafta içi mesai saatlerinde değerlendirilir. Acil hukuki durumlar için platform
              yerine doğrudan yetkili bir avukata veya resmi kurumlara başvurmanız gerekir.
            </p>
          )
        }
      ]}
      notice="Tazminat Hesaplama bilgilendirme amaçlı bir dijital araçtır. E-posta yanıtları hukuki danışmanlık veya avukatlık hizmeti niteliği taşımaz."
    />
  );
}
