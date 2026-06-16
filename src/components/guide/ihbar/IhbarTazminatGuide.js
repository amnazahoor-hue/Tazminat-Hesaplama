"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { HOME_PATH, IHBAR_NEDIR_PATH, KIDEM_TAVANI_PATH, siteUrl } from "@/config/site";
import { getRelatedToolLinks } from "@/config/internalLinks";
import { linkInternalTerms } from "@/utils/linkInternalTerms";
import {
  COMPARISON_ROWS,
  IHBAR_IMAGES,
  NOT_ELIGIBLE_ITEMS,
  NOTICE_EXAMPLES,
  NOTICE_EXCEPTIONS,
  NOTICE_TIERS,
  PILON_CONS,
  PILON_FACTORS,
  PILON_PROS,
  RIGHTS_CARDS
} from "@/data/ihbarGuideContent";
import GuideFaqSection from "../GuideFaqSection";
import { IHBAR_FAQ_ITEMS } from "@/data/ihbarGuideContent";
import GuidePageFooter from "../GuidePageFooter";
import TableOfContents from "../TableOfContents";
import {
  EligibilityCards,
  IHBAR_TOC_ITEMS,
  InsolvencyCallout,
  NoticeComparisonTable,
  NoticeHero,
  NoticeScenarioCards,
  NoticeTierCards,
  NoticeWarningCallout,
  PilonCallout,
  ProsConsGrid,
  RightsSectionLayout,
  TaxCallout,
  TwoColumnImageBlock
} from "./IhbarGuideBlocks";
import { GuideSection } from "../motion/Reveal";
import SectionHeading from "../motion/SectionHeading";
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

export default function IhbarTazminatGuide() {
  return (
    <GuidePageShell>
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: HOME_PATH },
          { name: "İhbar Tazminatı Nedir?", path: IHBAR_NEDIR_PATH }
        ]}
      />

      <NoticeHero image={IHBAR_IMAGES.hero} />

      <section className="guide-pre-tool guide-pre-tool--after-hero">
        <div className="container guide-pre-tool-inner">
          <TableOfContents items={IHBAR_TOC_ITEMS} />
        </div>
      </section>

      <GuideSection id="ihbar-kidem" alt>
        <TwoColumnImageBlock image={IHBAR_IMAGES.kidem}>
          <SectionHeading>
            <Link href={HOME_PATH} className="text-internal-link">
              Kıdem Tazminatı Nedir
            </Link>
          </SectionHeading>
          <p>
            {linkInternalTerms(
              "İşten ayrılma tazminatı, belirli yasal veya sözleşmesel koşullar altında iş ilişkisinin sona ermesi durumunda işveren tarafından çalışana ödenen mali tazminattır. Birçok ülkede, işten ayrılma tazminatının hesaplanması iş kanunları, iş sözleşmeleri, toplu iş sözleşmeleri ve şirket politikaları ile düzenlenir."
            )}
          </p>
        </TwoColumnImageBlock>
      </GuideSection>

      <GuideSection id="ihbar-sure">
        <SectionHeading id="ihbar-suresi">İhbar Süresi Nedir?</SectionHeading>
        <p>
          İhbar süresi, işten çıkarma bildiriminin verilmesi ile iş ilişkisinin fiilen sona ermesi arasında yasal olarak
          zorunlu olan süredir. Amacı, çalışanlara yeni iş aramak ve işverenlere yerlerine yeni eleman bulmak için makul
          bir süre sağlamaktır.
        </p>
        <NoticeTierCards tiers={NOTICE_TIERS} />
        <p>
          Bunlar, bildirim süreleriyle birlikte zaman dilimleridir. Bildirim sürelerinin geçerli olmadığı bazı durumlar
          vardır:
        </p>
        <NoticeWarningCallout items={NOTICE_EXCEPTIONS} />
      </GuideSection>

      <GuideSection id="ihbar-ornekler" alt>
        <SectionHeading id="ornekler">İhbar Ödeme Örnekleri</SectionHeading>
        <p>{linkInternalTerms("Aşağıdaki örnekler, ihbar tazminatının pratikte nasıl işlediğini göstermektedir.")}</p>
        <NoticeScenarioCards examples={NOTICE_EXAMPLES} accentImage={IHBAR_IMAGES.examples} />
      </GuideSection>

      <GuideSection id="ihbar-fark">
        <SectionHeading id="nasil-hesaplanir">İhbar Süresi ve İhbar Ücreti Arasındaki Fark</SectionHeading>
        <p>
          {linkInternalTerms(
            "Aşağıda, ihbar süresi ve ihbar tazminatı arasındaki bazı temel farklar yer almaktadır; bu iki kavramı daha iyi anlamanıza yardımcı olacaktır."
          )}
        </p>
        <NoticeComparisonTable rows={COMPARISON_ROWS} />
      </GuideSection>

      <GuideSection id="ihbar-uygunluk" alt>
        <SectionHeading>Bildirim Ücreti Uygunluğu</SectionHeading>
        <p>
          {linkInternalTerms(
            "Herkes ihbar tazminatına hak kazanmaz, bu nedenle kimlerin bu tazminatı alabileceğini bilmek önemlidir. İhbar tazminatı alma hakkı, iş sözleşmesine, fesih nedenine ve çalışanın performans raporuna bağlıdır."
          )}
        </p>
        <EligibilityCards notEligibleItems={NOT_ELIGIBLE_ITEMS} />
      </GuideSection>

      <GuideSection id="ihbar-haklar">
        <SectionHeading>Bildirim Süresi Boyunca Sahip Olunan Haklar</SectionHeading>
        <p>
          İşten ayrılma bildirim süresini doğru bilmek, sorunsuz ve verimli bir iş akışı için çok önemlidir. Haklarınızın
          farkında olarak, görevinizi en iyi şekilde yerine getirebilirsiniz. Günlük görevlerinizi hiçbir yük veya baskı
          hissetmeden, mutlulukla gerçekleştirebilirsiniz.
        </p>
        <RightsSectionLayout cards={RIGHTS_CARDS} accentImage={IHBAR_IMAGES.rights} />
        <p className="ihbar-rights-closing">
          İşten ayrılma izninde olan çalışanlar, genellikle ihbar süresi boyunca sözleşmede belirtilen tüm haklarından
          yararlanmaya devam ederler.
        </p>
      </GuideSection>

      <GuideSection id="ihbar-pilon" alt>
        <SectionHeading>İhbar Süresi Yerine Ödeme</SectionHeading>
        <PilonCallout factors={PILON_FACTORS} />
      </GuideSection>

      <GuideSection id="ihbar-pilon-pros">
        <SectionHeading>PILON&apos;un Avantajları ve Dezavantajları</SectionHeading>
        <ProsConsGrid pros={PILON_PROS} cons={PILON_CONS} />
      </GuideSection>

      <GuideSection id="ihbar-vergi" alt>
        <SectionHeading>Bildirim Ödeme ve Vergiler</SectionHeading>
        <p>Tahmini nihai tutarı belirlemeden önce, vergilerin ve ödemelerin nasıl hesaplandığını anlayın.</p>
        <TaxCallout />
      </GuideSection>

      <GuideSection id="ihbar-iflas">
        <SectionHeading>İşverenin İflas Etmesi Durumunda Bildirim Ücreti</SectionHeading>
        <InsolvencyCallout />
      </GuideSection>

      <GuideFaqSection id="ihbar-sss" items={IHBAR_FAQ_ITEMS} includeFormula />

      <GuidePageFooter
        relatedLinks={getRelatedToolLinks(IHBAR_NEDIR_PATH)}
        shareUrl={siteUrl(IHBAR_NEDIR_PATH)}
        shareTitle="İhbar Tazminatı Nedir ve Nasıl Hesaplanır?"
      />
    </GuidePageShell>
  );
}
