"use client";

import { H3 } from "@/components/common/Heading";
import { motion, useScroll, useTransform } from "framer-motion";
import { HOME_PATH, KIDEM_TAVANI_PATH } from "@/config/site";
import { linkInternalTerms } from "@/utils/linkInternalTerms";
import {
  ABOVE_CEILING_ITEMS,
  AFFECTED_GROUPS,
  BELOW_CEILING_ITEMS,
  ELIGIBILITY_SCENARIOS,
  EMPLOYER_MISTAKES_ROWS,
  EXAMPLE_CALCULATIONS,
  GROSS_INCLUDES,
  HISTORY_ROWS,
  LEGAL_BASIS_ROWS,
  OFFICIAL_TAVAN_ROW,
  TAVAN_DEFINITION_POINTS,
  TAVAN_HERO_STAT,
  TAVAN_IMAGES,
  YEARLY_COMPARISON_ROWS
} from "@/data/tavanGuideContent";
import GuideFaqSection from "../GuideFaqSection";
import { TAVAN_FAQ_ITEMS } from "@/data/tavanGuideContent";
import {
  AffectedGroupChips,
  CeilingMechanismCards,
  DefinitionPointCards,
  EligibilityScenarioGrid,
  ExampleCalculationCards,
  FormulaCallout,
  GrossIncludesList,
  HistoryTable,
  LegalBasisCards,
  MistakesTable,
  OfficialTavanStat,
  SectionHeading,
  TaxInfoNote,
  TavanBarChart,
  TavanHero,
} from "./TavanGuideBlocks";
import { GuideSection } from "../motion/Reveal";
import { useMotionPrefs } from "../motion/useMotionPrefs";

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

export default function TavanGuide() {
  return (
    <GuidePageShell>
      <TavanHero stat={TAVAN_HERO_STAT} image={TAVAN_IMAGES.hero} />

      <GuideSection id="tavan-nedir" alt>
        <SectionHeading>Türkiye&apos;de Kıdem Tazminatı Tavanı Nasıl İşliyor?</SectionHeading>
        <p>
          İşten çıkarma tazminatı tavanı, bir çalışanın işten çıkarma tazminatının hesaplanmasında önemli bir rol
          oynayan maksimum gelir olarak tanımlanır. İşte dikkate almanız gereken 2 nokta:
        </p>
        <DefinitionPointCards points={TAVAN_DEFINITION_POINTS} />
        <p>Bu durum, tazminat tavanını işten çıkarma hesaplamalarında kritik bir faktör haline getiriyor.</p>
      </GuideSection>

      <GuideSection id="tavan-yasal">
        <SectionHeading>Türk İş Kanunu Kapsamındaki Yasal Dayanak</SectionHeading>
        <p>Kıdem üst sınırına ilişkin yasal çerçeve şunlardan türetilmiştir:</p>
        <LegalBasisCards rows={LEGAL_BASIS_ROWS} />
        <p>Tazminat tavan ücreti, hükümet katsayılarındaki değişikliklere bağlı olarak güncellenmektedir.</p>
      </GuideSection>

      <GuideSection id="tavan-2026" alt>
        <SectionHeading>2026 İlk Dönem Kıdem Tazminatı Tavanı</SectionHeading>
        <p>Yılın ilk yarısı için 2026 yılı kıdem tazminatı tavanı resmen açıklandı.</p>

        <H3>2026 Yılı İçin Resmi Tavan Tutarı</H3>
        <OfficialTavanStat row={OFFICIAL_TAVAN_ROW} />

        <H3>Yeni Tavan Sınırlamasından Kimler Etkileniyor?</H3>
        <p>Yeni tavan kıdem tazminatı tutarı esas olarak aşağıdaki alanları etkiliyor:</p>
        <AffectedGroupChips items={AFFECTED_GROUPS} />

        <H3>Yıllık Karşılaştırma</H3>
        <p>Aşağıda, mevcut ve önceki yıllara ait tavan tutarları karşılaştırmalı olarak verilmiştir.</p>
        <TavanBarChart rows={YEARLY_COMPARISON_ROWS} />

        <H3>Kıdem Tazminatı Tavan Oranları (2022–2026)</H3>
        <p>
          Çatışmaları önlemek için değişen tavan oranlarına dikkat etmek önemlidir. Aşağıda geçmiş yıllara ait tavan
          oranları yer almaktadır.
        </p>
      </GuideSection>

      <GuideSection id="tavan-gecmis">
        <SectionHeading id="tavan-tablosu">Karşılaştırma Tablosu: Kıdem Tazminatı Tavanı Geçmişi</SectionHeading>
        <p>İşte dönemleri ve üst limitlerini içeren kısa bir rehber.</p>
        <HistoryTable rows={HISTORY_ROWS} />
      </GuideSection>

      <GuideSection id="tavan-hesaplama" alt>
        <SectionHeading>Türkiye&apos;de Kıdem Tazminatı Nasıl Hesaplanır?</SectionHeading>
        <p>
          İşten çıkarma tazminatı tavanının nasıl hesaplandığını anlamak hem işverenler hem de çalışanlar için çok
          önemlidir.
        </p>

        <H3>Kıdem Tazminatı Formülü</H3>
        <p>Temel formül şöyledir:</p>
        <FormulaCallout />

        <H3>Brüt Maaş vs. Düzeltilmiş Brüt Maaş</H3>
        <p>Brüt maaş esas olarak hesaplamalarda kullanılır.</p>
        <p>Bu şunları içerir:</p>
        <GrossIncludesList items={GROSS_INCLUDES} />
        <p>{linkInternalTerms("Brüt maaş, kıdem tazminatı hesaplamaları için gerçek temeli oluşturur.")}</p>

        <H3>Hesaplamaya Dahil Edilen Faydalar</H3>
        <p>
          İyi tarafı şu ki, temel maaş, yemek ödeneği, düzenli ikramiyeler ve ulaşım ödeneği dahil edilmiştir. Tüm bu
          değerleri hesaplamalarınıza eklediğinizde, nihai tutar önemli ölçüde artar.
        </p>

        <H3>Kıdem Tazminatı Tavanının Etkisi</H3>
        <p>{linkInternalTerms("İşten çıkarma tazminatı tavanı, tazminatı doğrudan sınırlandırır.")}</p>

        <CeilingMechanismCards belowItems={BELOW_CEILING_ITEMS} aboveItems={ABOVE_CEILING_ITEMS} />
        <p>{linkInternalTerms("İşte kıdem tazminatı tavanı hesaplama mekanizmasının işleyiş şekli.")}</p>
      </GuideSection>

      <GuideSection id="tavan-ornekler">
        <SectionHeading>Örnek Kıdem Tazminatı Hesaplamaları</SectionHeading>
        <ExampleCalculationCards examples={EXAMPLE_CALCULATIONS} />
      </GuideSection>

      <GuideSection id="tavan-uygunluk" alt>
        <SectionHeading>Kıdem Tazminatına Kimler Hak Kazanır?</SectionHeading>
        <p>
          {linkInternalTerms(
            "Türk hukukuna göre, her çalışan kıdem tazminatı almaya hak kazanmaz. Sadece en az bir yıl hizmet süresi olan veya gerekli şartları sağlayan çalışanlar tazminat alabilir."
          )}
        </p>
        <p>
          {linkInternalTerms(
            "Uygunluk koşullarını anlamak önemlidir çünkü nihai olarak ödenecek tutar, iş ilişkisinin sona erdiği tarihte yürürlükte olan geçerli kıdem tazminatı tavanı, tazminat tavanı veya kıdem tavanı  etkilenir."
          )}
        </p>
        <EligibilityScenarioGrid scenarios={ELIGIBILITY_SCENARIOS} />
      </GuideSection>

      <GuideSection id="tavan-vergi">
        <SectionHeading>2026 Yılında Kıdem Tazminatının Vergi Uygulaması</SectionHeading>
        <p>
          {linkInternalTerms(
            "Kıdem tazminatı haklarını değerlendirirken vergi kuralları da önemli bir husustur. Kıdem tazminatı belirli vergi avantajlarına sahip olsa da, ek vergi yükümlülüklerinin ortaya çıkabileceği durumlar da vardır."
          )}
        </p>
        <TaxInfoNote>
          <p>
            Genel olarak, yasal kıdem tazminatı tavanı dahilinde yapılan kıdem tazminatları gelir vergisinden
            muaftır ve bu da uygun çalışanlar için önemli bir vergi avantajı sağlar. Kıdem tazminatı genellikle yasal
            sınıra kadar gelir vergisinden muaf olsa da, damga vergisi indirimi yine de uygulanabilir.
          </p>
        </TaxInfoNote>

        <H3>Çalışanların Sık Yaptığı Hatalar</H3>
        <p>
          İşverenler, yabancı işçiler için kıdem tazminatı hesaplarken zaman zaman hatalar yapmaktadır. Sık yapılan
          hatalardan bazıları şunlardır:
        </p>
        <MistakesTable rows={EMPLOYER_MISTAKES_ROWS} />
      </GuideSection>

      <GuideFaqSection id="tavan-sss" items={TAVAN_FAQ_ITEMS} />
    </GuidePageShell>
  );
}
