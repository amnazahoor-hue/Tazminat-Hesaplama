"use client";

import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/config/images";
import { HOME_PATH, IHBAR_NEDIR_PATH, TAZMINAT_HESAPLAMA_PATH } from "@/config/site";
import { motion, useScroll, useTransform } from "framer-motion";
import GuidePageEnd from "./GuidePageEnd";
import {
  AlertCircle,
  Award,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Car,
  Gift,
  HeartHandshake,
  Info,
  Clock3,
  Coins,
  Scale,
  Shield,
  TrendingUp,
  Users,
  Wallet
} from "lucide-react";
import CalcCta from "@/components/common/CalcCta";
import TotalCompensationCalculatorPanel from "@/components/TotalCompensationCalculatorPanel";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import GuideFaq from "./GuideFaq";
import {
  ChecklistTable,
  EquationPillsBlock,
  ExampleBlock,
  FeaturedPanel,
  FormulaBlock,
  ImportanceCards,
  InfoCalloutBlock,
  IntroBlock,
  Reveal,
  RevealItem,
  RevealStagger,
  SectionHeading,
  StepsShowcase,
  FactorsShowcase,
  TiltCard
} from "./GuideBlocks";
import GuideStepsIllustration from "./GuideStepsIllustration";
import Scene3D from "./three/Scene3D";
import { GuideSection } from "./motion/Reveal";
import { useMotionPrefs } from "./motion/useMotionPrefs";

const EXAMPLE_INPUTS = [
  "Maaş 30.000 TL",
  "İyi performans için 5.000 TL bonus",
  "Aylık 2.000 TL yemek yardımı",
  "Seyahatlerden elde edilen seyahat ödeneği aylık 1.000 TL",
  "Hizmet süresi 5 yıldır"
];

const EXAMPLE_ROWS = [
  { label: "Maaş", amount: "360,000" },
  { label: "Bonuslar", amount: "15,000" },
  { label: "Yemek Harcırahı", amount: "24,000" },
  { label: "Ulaşım Ödeneği", amount: "12,000" },
  { label: "Kıdem tazminatı", amount: "150,000" },
  { label: "Toplam Tazminat Değeri", amount: "561,000", highlight: true }
];

const COMPONENT_ITEMS = [
  {
    icon: Wallet,
    title: "Maaş",
    body: "Çalışanın brüt aylık veya yıllık maaşı, çoğu ücret hesaplamasının temelini oluşturur."
  },
  {
    icon: Gift,
    title: "Bonuslar ve Teşvikler",
    body: "Düzenli performans primleri ve teşvik ödemeleri, ücret hesaplamasına dahil edilir."
  },
  {
    icon: HeartHandshake,
    title: "Çalışanlara Sağlanan Faydalar",
    body: "Yemek yardımı, ulaşım yardımı ve sigorta primleri gibi yan haklar, ücret miktarlarını önemli ölçüde etkileyebilir."
  },
  {
    icon: Award,
    title: "Kıdem tazminatı",
    body: "Çalışanlar, hizmet sürelerine ve performanslarına bağlı olarak kıdem tazminatı alabilirler."
  },
  {
    icon: Bell,
    title: "Bildirim Ödemesi",
    body: "İşveren tarafından iş akdinin önceden haber verilmeksizin feshedilmesi durumunda ihbar tazminatı uygulanabilir."
  },
  {
    icon: CalendarDays,
    title: "Kullanılmamış Yıllık İzin",
    body: "Bu izin günleri genellikle işten ayrılma durumunda çalışanlara ücretli olarak ödenir."
  }
];

const INCLUDED_ROWS = [
  "Brüt Maaş",
  "Bonuslar",
  "Satış Komisyonları",
  "Fazla Mesai Ödemeleri",
  "Yemek Harcırahı",
  "Ulaşım Ödeneği",
  "Emeklilik ödemeleri",
  "Kullanılmamış Yıllık İzin Ücreti",
  "Kıdem tazminatı",
  "İhbar Tazminatı"
];

const STEPS = [
  {
    title: "Adım 1: Brüt Maaş Hesaplaması",
    body: "Öncelikle çalışanın sabit ödenekler dahil brüt maaşını bulun."
  },
  {
    title: "Adım 2: Hizmet Süresini Kontrol Edin",
    body: "Aynı işverenle geçirilen toplam çalışma süresini hesaplayın."
  },
  {
    title: "3. Adım: Fesih Formülünü Uygulayın",
    formula: "Kıdem Tazminatı = Brüt Aylık Maaş × Hizmet Süresi (Yıl)",
    body: "Eğer maaş yasal tavanın üzerindeyse, tavan tutarı onun yerine kullanılır."
  },
  {
    title: "Adım 4: İhbar Tazminatını Hesaplayın (varsa)",
    formula: "Bildirim Ödemesi = Günlük Brüt Ücret × İhbar Süresi (Gün)"
  },
  {
    title: "Adım 5: Her ikisini de ekleyin (uygunsa)",
    body: "Nihai tazminat, uygunluk şartlarına bağlı olarak hem kıdem tazminatını hem de ihbar tazminatını içerebilir."
  }
];

const FACTOR_ITEMS = [
  {
    icon: Clock3,
    title: "Hizmet Süresi",
    body: "Daha uzun çalışma süresi, ücret miktarını artırır."
  },
  {
    icon: Coins,
    title: "Brüt Maaş",
    body: "Ücret hesaplamaları net maaş yerine brüt kazanç üzerinden yapılır."
  },
  {
    icon: TrendingUp,
    title: "Bonuslar ve Teşvikler",
    body: "Düzenli primler ve tekrarlayan ödemeler, ücret hesaplamalarına dahil edilebilir."
  },
  {
    icon: Briefcase,
    title: "Çalışanlara Sağlanan Faydalar",
    body: "Bu yardımlar arasında yemek ve seyahat ödenekleri ile yaşam alanınızın kirası veya daire ödemeniz yer almaktadır."
  },
  {
    icon: AlertCircle,
    title: "Fesih Nedeni",
    body: "İşten çıkarılma nedenine bağlı olarak kıdem tazminatı alabilirsiniz."
  }
];

const GUIDE_2026_ITEMS = [
  {
    icon: Scale,
    title: "Brüt Maaş Esası",
    body: "Tüm kıdem tazminatı ve ihbar tazminatı hesaplamaları net maaş değil, brüt maaş üzerinden yapılır. Vergi kesintilerinden önce, ihbar ve kıdem tazminatı hesaplamaları bu brüt maaş üzerinden yapılır."
  },
  {
    icon: Shield,
    title: "1 Yıllık Şart",
    body: "Çalışanların en az 1 yıllık iş tecrübesine sahip olmaları şarttır. Bir yıldan az çalışanlar genellikle kıdem tazminatına hak kazanmazlar."
  },
  {
    icon: BookOpen,
    title: "İş Hukuku Referansı",
    body: "Tazminat hakları, özellikle iş sözleşmesinin feshiyle ilgili hakları düzenleyen 4857 sayılı Türk İş Kanunu'nda yer almaktadır."
  }
];

const TYPE_ITEMS = [
  {
    icon: Award,
    title: "Kıdem tazminatı",
    body: "Bu haktan yalnızca gerekli iş tecrübesine ve brüt maaşa sahip çalışanlar yararlanabilir."
  },
  {
    icon: Bell,
    title: "İhbar Tazminatı",
    body: "İşten çıkarılmadan önce çalışanlara ihbar süresi verilmediğinde ödenen ücret."
  },
  {
    icon: CalendarDays,
    title: "Kullanılmayan İzin Tazminatı",
    body: "Çalışanlar, işten ayrılmaları durumunda genellikle izin günlerinin ücretini alma hakkına sahiptir."
  },
  {
    icon: Gift,
    title: "Bonuslar ve Teşvikler",
    body: "Bazı primler ve terfiler, genel ücretlendirme paketinin bir parçası olabilir."
  },
  {
    icon: Car,
    title: "Ödenekler",
    body: "Yemek, ulaşım ve diğer konut yardımları gibi avantajlar da buna dahildir."
  }
];

function IconCard({ icon: Icon, title, body, badgeClass = "guide-icon-card-badge" }) {
  const { reduceMotion } = useMotionPrefs();

  return (
    <TiltCard className="guide-icon-card-wrap" tiltMax={8} scale={1.03}>
      <article className="guide-icon-card">
        <motion.span
          className={badgeClass}
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
        </motion.span>
        <h3>{title}</h3>
        <p>{body}</p>
      </article>
    </TiltCard>
  );
}

function GuidePageShell({ children }) {
  const { reduceMotion } = useMotionPrefs();
  const { scrollYProgress } = useScroll();
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -120]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);

  return (
    <div className="guide-page">
      <motion.span className="guide-page-parallax-shape guide-page-parallax-shape--1" style={{ y: blobY1 }} aria-hidden="true" />
      <motion.span className="guide-page-parallax-shape guide-page-parallax-shape--2" style={{ y: blobY2 }} aria-hidden="true" />
      {children}
    </div>
  );
}

export default function TotalCompensationGuide() {
  return (
    <GuidePageShell>
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: HOME_PATH },
          { name: "Toplam Tazminat Hesaplama Kılavuzu", path: TAZMINAT_HESAPLAMA_PATH }
        ]}
      />

      <header className="guide-page-hero">
        <span className="guide-page-hero-bg" aria-hidden="true">
          <Image
            src={IMAGES.tazminatHesaplama.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="guide-page-hero-bg-image"
          />
        </span>
        <span className="guide-page-hero-overlay" aria-hidden="true" />
        <div className="container guide-page-hero-content">
          <Reveal>
            <h1>2026 Yılı İçin Ücret Hesaplaması</h1>
            <div className="guide-page-hero-actions">
              <CalcCta
                href="#hesapla"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById("hesapla")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Şimdi Hesapla
              </CalcCta>
              <Link href={`${HOME_PATH}#hesapla`} className="guide-page-secondary-link">
                Kıdem Tazminatı Hesaplayıcısı
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      <TotalCompensationCalculatorPanel />

      <GuideSection id="guide-tanim">
        <IntroBlock>
          <SectionHeading>Tazminat Hesaplaması Nedir?</SectionHeading>
          <p>
            Tazminat hesaplaması, bir çalışanın Türk İş Hukuku kapsamında hak kazandığı toplam ödemelerin
            belirlenmesi sürecidir. Bu ödemeler; kıdem tazminatı, ihbar tazminatı, kullanılmamış yıllık izin
            ücretleri, primler (bonuslar) ve diğer yan hakları kapsar.
          </p>
          <p>
            Ücret hesaplaması, aylık maaş, ikramiyeler, fazla mesai ücretleri, yıllık izin ücreti, kıdem
            tazminatı, ihbar tazminatı, seyahat ve yemek ödenekleri ile hisse senedi opsiyonları veya ek yan
            hakları içerebilir.
          </p>
        </IntroBlock>
      </GuideSection>

      <TotalCompensationCalculatorPanel />

      <GuideSection id="guide-formul" alt>
        <SectionHeading>Tazminat Hesaplama Formülü</SectionHeading>
        <Reveal>
          <p>Türkiye&apos;de tazminat hesaplamaları, tazminat türüne göre değişiklik göstermektedir.</p>
        </Reveal>
        <FormulaBlock />
      </GuideSection>

      <GuideSection id="guide-temel">
        <SectionHeading>Temel Tazminat</SectionHeading>
        <Reveal>
          <p className="guide-formula-inline">Ücretlendirme = Maaş + Bonuslar + Ödenekler</p>
        </Reveal>
        <EquationPillsBlock />
      </GuideSection>

      <GuideSection id="guide-ornek" alt className="guide-section--example">
        <SectionHeading>Örnek</SectionHeading>
        <Reveal>
          <p>İşte daha iyi anlaşılması için basit ve kolay bir örnek. Bir çalışan şu kadar kazanıyor:</p>
        </Reveal>
        <ExampleBlock inputs={EXAMPLE_INPUTS} rows={EXAMPLE_ROWS} />
      </GuideSection>

      <GuideSection id="guide-bilesenler">
        <SectionHeading>Tazminat Hesaplamasının Bileşenleri</SectionHeading>
        <Reveal>
          <p>
            Ücret hesaplamaları maaş, ikramiye ve kıdem tazminatını içerebilir ve nihai ücret buna bağlı olarak
            değişir.
          </p>
        </Reveal>
        <RevealStagger className="guide-card-grid guide-card-grid--3">
          {COMPONENT_ITEMS.map((item) => (
            <RevealItem key={item.title}>
              <IconCard {...item} />
            </RevealItem>
          ))}
        </RevealStagger>
      </GuideSection>

      <GuideSection id="guide-dahil" alt>
        <SectionHeading>Hesaplamalara Dahil Edilen Tazminat Bileşenleri</SectionHeading>
        <Reveal>
          <p>
            Tazminat miktarının belirlenmesinde hangi bileşenlerin dikkate alındığını anlamak için hızlı ve kolay bir
            tablo.
          </p>
        </Reveal>
        <ChecklistTable rows={INCLUDED_ROWS} />
      </GuideSection>

      <GuideSection id="guide-adimlar">
        <SectionHeading>Tazminat Nasıl Hesaplanır?</SectionHeading>
        <StepsShowcase
          illustration={<GuideStepsIllustration />}
          intro={
            <p>
              Türkiye&apos;de tazminat, işveren tarafından sağlanan tüm mali haklar (ödenekler, kıdem tazminatı ve ihbar
              tazminatı gibi) dahil edilerek hesaplanır. Birkaç kolay adımla tazminatınızı hızlıca bulabilirsiniz:
            </p>
          }
          steps={STEPS}
        />
      </GuideSection>

      <GuideSection id="guide-faktorler" alt parallax>
        <SectionHeading>Tazminat Hesaplamasını Etkileyen Faktörler</SectionHeading>
        <FactorsShowcase
          illustration={<Scene3D variant="factors" className="guide-factors-scene" />}
          intro={<p>Tazminat miktarını değiştiren bazı faktörler aşağıda açıklanmıştır:</p>}
        >
          <RevealStagger className="guide-factor-list">
            {FACTOR_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <RevealItem key={item.title}>
                  <TiltCard className="guide-factor-card-wrap" tiltMax={6} scale={1.015}>
                    <article className="guide-factor-card">
                      <span className="guide-factor-icon">
                        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </div>
                    </article>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </FactorsShowcase>
      </GuideSection>

      <GuideSection id="guide-ihbar">
        <SectionHeading>İhbar Süresi</SectionHeading>
        <Reveal>
          <p>İhbar tazminatı, çalışanın hizmet süresine göre değişiklik gösterir.</p>
        </Reveal>
        <InfoCalloutBlock>
          <span className="guide-info-callout-icon">
            <Info size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <h3>Kıdem Tazminatı Tavanı</h3>
            <p>Türk hukukunda kıdem tazminatlarının hesaplanmasında azami bir üst sınır uygulanmaktadır</p>
          </div>
        </InfoCalloutBlock>
      </GuideSection>

      <GuideSection id="guide-2026" className="guide-section--featured">
        <FeaturedPanel
          cards={GUIDE_2026_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.title}>
                <TiltCard className="guide-featured-card-wrap" tiltMax={5} scale={1.02}>
                  <article className="guide-featured-card">
                    <span className="guide-featured-card-icon">
                      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </TiltCard>
              </RevealItem>
            );
          })}
        >
          <SectionHeading light>2026 Yılı Tazminat Hesaplama Kılavuzu</SectionHeading>
          <p>
            Tazminat hesaplamaları, 2026 yılında Turkish Labour Law No. 4857 kapsamında belirlenen özel yasal
            koşullara göre yapılmaktadır. Bu kurallar, çalışan ve işveren haklarının korunmasını sağlamak amacıyla
            uygulanmaktadır.
          </p>
        </FeaturedPanel>
      </GuideSection>

      <GuideSection id="guide-onem" alt>
        <SectionHeading>Çalışanlar ve İşletmeler İçin Tazminat Hesaplaması Önemi</SectionHeading>
        <ImportanceCards
          left={
            <>
              <span className="guide-importance-icon">
                <Users size={24} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p>
                Ücret hesaplaması, herhangi bir işte çalışırken ihtiyaç duyabileceğiniz en önemli şeylerden biridir.
                Doğru ve sorunsuz hesaplamalar, haklarınızı elde etmenize ve başkalarının haklarını korumanıza yardımcı
                olur. Çalışanlar için ise doğru hesaplamalar kıdem tazminatı, izin ücreti, ikramiye ve teşviklerin
                doğru miktarda alınmasını sağlar.
              </p>
            </>
          }
          right={
            <>
              <span className="guide-importance-icon guide-importance-icon--business">
                <Building2 size={24} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p>
                İşletmeler için doğru ücret hesaplamaları yasal riskleri azaltır. Bu, her çalışanın doğru şekilde
                ücretlendirilmesini ve işletme bütçelerinin ve maliyet planlarının buna göre yapılmasını sağlar.
              </p>
            </>
          }
        />
      </GuideSection>

      <GuideSection id="guide-turler">
        <SectionHeading>Türkiye&apos;deki Tazminat Türleri</SectionHeading>
        <Reveal>
          <p>Tazminat türlerinden bazıları şunlardır:</p>
        </Reveal>
        <RevealStagger className="guide-type-grid">
          {TYPE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.title}>
                <TiltCard className="guide-type-card-wrap" tiltMax={7} scale={1.025}>
                  <article className="guide-type-card guide-type-card--elevated">
                    <span className="guide-type-icon">
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </GuideSection>

      <GuideFaq />
      <GuidePageEnd
        href={IHBAR_NEDIR_PATH}
        title="İhbar Tazminatı Nedir?"
        description="İhbar süreleri, örnekler, çalışan hakları ve SSS ile kapsamlı iş hukuku rehberi."
        linkLabel="İhbar Tazminatı Rehberi"
      />
    </GuidePageShell>
  );
}
