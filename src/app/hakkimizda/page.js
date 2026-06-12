import AboutPageShell from "@/components/about/AboutPageShell";
import { HAKKIMIZDA_PATH } from "@/config/site";
import { buildPageMetadata } from "@/utils/seo";

export const metadata = buildPageMetadata({
  title: "Hakkımızda | Tazminat Hesaplama",
  description:
    "Tazminat Hesaplama platformunun misyonu, vizyonu, editoryal yaklaşımı ve kullanıcı odaklı değerleri hakkında bilgi edinin.",
  path: HAKKIMIZDA_PATH,
  keywords: [
    "hakkımızda",
    "tazminat hesaplama platformu",
    "iş hukuku hesaplama aracı",
    "kıdem ihbar hesaplama"
  ]
});

export default function HakkimizdaPage() {
  return (
    <AboutPageShell
      breadcrumb={[
        { name: "Anasayfa", path: "/" },
        { name: "Hakkımızda", path: HAKKIMIZDA_PATH }
      ]}
      tag="Kurumsal"
      title="İş hukukunu herkes için anlaşılır kılıyoruz"
      lead="Tazminat Hesaplama; kıdem, ihbar ve yıllık izin ücreti hesaplamalarını Türk İş Kanunu 4857 çerçevesinde hızlı, şeffaf ve ücretsiz sunmak için geliştirilmiş bağımsız bir dijital platformdur."
      stats={[
        {
          value: "4857",
          label: "İş Kanunu odaklı",
          detail: "Temel mevzuat referansı"
        },
        {
          value: "3+",
          label: "Hesaplama modülü",
          detail: "Kıdem, ihbar ve izin"
        },
        {
          value: "2026",
          label: "Güncel tavan verisi",
          detail: "Periyodik içerik güncellemesi"
        },
        {
          value: "%100",
          label: "Ücretsiz erişim",
          detail: "Kayıt veya ödeme gerekmez"
        }
      ]}
      intro={{
        title: "Neden bu platformu kurduk?",
        paragraphs: [
          "İşten ayrılma sürecinde çalışanların en çok ihtiyaç duyduğu konulardan biri, hak edilen tazminat tutarının ne kadar olabileceğidir. Resmi mevzuat, tavan güncellemeleri ve farklı senaryolar çoğu zaman dağınık kaynaklarda yer alır; bu da hem çalışanlar hem de işverenler için zaman kaybına ve belirsizliğe yol açar.",
          "Tazminat Hesaplama, bu bilgiyi tek bir modern arayüzde bir araya getirerek karmaşık formülleri sade adımlara indirir. Amacımız hukuki danışmanlık sunmak değil; kullanıcıların kendi verileriyle hızlıca ön hesaplama yapabilmesini, ardından gerektiğinde uzman desteğine yönlenebilmesini sağlamaktır.",
          "Platform tamamen Türkçe içerik ve yerel mevzuat odağıyla tasarlanmıştır. Her güncellemede hem hesaplama motoru hem de rehber metinler gözden geçirilir; böylece kullanıcılar güncel tavan tutarları ve bildirim süreleriyle çalışır."
        ]
      }}
      pillars={[
        {
          title: "Misyonumuz",
          body: "Türk İş Hukuku kapsamındaki temel tazminat hesaplamalarını herkesin birkaç dakika içinde anlayabileceği net, görsel ve erişilebilir bir deneyime dönüştürmek. Teknik jargonu azaltarak kullanıcıya güven veren, anlaşılır ve pratik bir referans noktası olmak."
        },
        {
          title: "Vizyonumuz",
          body: "Türkiye'de çalışan haklarına erişimi kolaylaştıran, güvenilir ve sürekli güncellenen dijital bir bilgi ekosistemi haline gelmek. İş hukuku rehberleri, hesaplama araçları ve açıklayıcı içeriklerle hem bireysel kullanıcıların hem de İK profesyonellerinin ilk başvurduğu platform olmak."
        }
      ]}
      values={[
        {
          title: "Doğruluk ve Güncellik",
          body: "Hesaplama parametreleri ve rehber içerikler mevzuat değişikliklerine göre düzenli olarak gözden geçirilir. Tavan tutarları, bildirim süreleri ve temel formüller şeffaf biçimde açıklanır."
        },
        {
          title: "Kullanıcı Odaklı Tasarım",
          body: "Mobil ve masaüstünde aynı kalitede deneyim sunulur. Adım adım rehberler, örnek tablolar ve anında sonuç ekranları sayesinde karmaşık konular sadeleştirilir."
        },
        {
          title: "Hukuki Sınırlara Saygı",
          body: "Platform bilgilendirme amaçlıdır; bağlayıcı hukuki görüş yerine geçmez. Kullanıcıları kesin değerlendirme için uzman avukata yönlendiren açık yasal uyarılar her zaman görünür kalır."
        },
        {
          title: "Gizlilik ve Güven",
          body: "Hesaplama girdileri varsayılan düzende kalıcı olarak saklanmaz. Kişisel veri talep etmeden, cihaz üzerinde hızlı hesaplama yapılmasına öncelik verilir."
        }
      ]}
      offerings={{
        title: "Platformumuzda neler bulabilirsiniz?",
        items: [
          {
            title: "Anında Tazminat Hesaplayıcı",
            body: "Brüt maaş, işe giriş-çıkış tarihleri ve isteğe bağlı ek kalemlerle kıdem, ihbar ve yıllık izin ücreti tutarlarını tek ekranda görün."
          },
          {
            title: "Kapsamlı Rehber İçerikler",
            body: "İhbar tazminatı nedir, kıdem tazminatı tavanı nasıl uygulanır ve İş Kanunu madde özetleri gibi konularda derinlemesine Türkçe kaynaklar."
          },
          {
            title: "Güncel Tavan Tabloları",
            body: "Yıllara göre kıdem tazminatı tavan tutarları, örnek senaryolar ve hesaplamaya nasıl yansıdığına dair açıklayıcı tablolar."
          },
          {
            title: "SSS ve Karşılaştırmalı Açıklamalar",
            body: "Sık sorulan sorular, farklı ayrılma senaryoları ve hesaplama adımlarını destekleyen görsel anlatımlar."
          },
          {
            title: "Yasal Şeffaflık",
            body: "Gizlilik politikası, kullanım şartları ve yasal uyarı sayfalarıyla platformun sınırları ve sorumluluk alanı açıkça belirtilir."
          }
        ]
      }}
      approach={{
        title: "İçeriklerimizi nasıl hazırlıyoruz?",
        steps: [
          {
            title: "Mevzuat takibi",
            body: "İş Kanunu 4857, ilgili yönetmelikler ve Resmî Gazete'de yayımlanan tavan güncellemeleri düzenli olarak izlenir."
          },
          {
            title: "Editoryal doğrulama",
            body: "Rehber metinler sade dil prensibiyle yazılır; teknik terimler kullanıcı dostu açıklamalarla desteklenir."
          },
          {
            title: "Hesaplama testleri",
            body: "Formül değişikliklerinden sonra örnek senaryolarla manuel ve otomatik kontroller yapılır; tutarsızlıklar giderilir."
          },
          {
            title: "İçerik iyileştirme",
            body: "Sık görülen hesaplama senaryoları ve rehber metinlerindeki boşluklar düzenli olarak taranır; SSS ve anlatım bölümleri buna göre güncellenir."
          },
          {
            title: "Periyodik yayın",
            body: "Yıl ve tavan değişimlerinde hem hesaplama motoru hem bilgilendirici içerikler eş zamanlı güncellenir."
          }
        ]
      }}
      principles={[
        {
          title: "Bağımsızlık",
          body: "Platform herhangi bir işveren, sendika veya hukuk bürosuna bağlı değildir. İçerikler tarafsız bilgilendirme amacıyla hazırlanır."
        },
        {
          title: "Erişilebilirlik",
          body: "Ücretsiz erişim ilkesi korunur. Hesaplama ve temel rehber içerikler herkes için açık tutulur."
        },
        {
          title: "Sürekli İyileştirme",
          body: "Arayüz, performans ve içerik kalitesi kullanıcı deneyimine göre düzenli olarak geliştirilir."
        }
      ]}
      closing={{
        title: "Haklarınızı anlamak için ilk adım burada",
        body: "Birkaç dakika içinde ön hesaplama yapın, rehber içeriklerimizle kavramları netleştirin ve kesin değerlendirme için uzman desteğine geçiş yapın."
      }}
    />
  );
}
