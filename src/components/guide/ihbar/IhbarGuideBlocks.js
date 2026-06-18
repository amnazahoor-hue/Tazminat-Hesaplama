"use client";

import AppImage from "@/components/common/AppImage";
import { H1, H3, H4 } from "@/components/common/Heading";
import { motion } from "framer-motion";
import CalcCta from "@/components/common/CalcCta";
import { HOME_PATH } from "@/config/site";
import { linkInternalTerms } from "@/utils/linkInternalTerms";
import {
  AlertTriangle,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Coins,
  FileText,
  Info,
  MinusCircle,
  Receipt,
  Scale,
  ShieldAlert,
  ThumbsDown,
  ThumbsUp,
  UserMinus,
  UserX,
  Wallet,
  XCircle
} from "lucide-react";
import TiltCard from "../ui/TiltCard";
import { Reveal, RevealItem, RevealStagger } from "../motion/Reveal";
import { useMotionPrefs } from "../motion/useMotionPrefs";

export function GuideImage({ src, alt, title, priority = false, className = "" }) {
  return (
    <div className={`ihbar-guide-image${className ? ` ${className}` : ""}`}>
      <AppImage src={src} alt={alt} title={title} fill sizes="(max-width: 768px) 100vw, 50vw" priority={priority} />
      <span className="ihbar-guide-image-overlay" aria-hidden="true" />
    </div>
  );
}

export function NoticeHero({ image }) {
  const { reduceMotion, ease } = useMotionPrefs();

  return (
    <header id="ihbar-tanim" className="ihbar-guide-hero">
      <span className="ihbar-guide-hero-bg" aria-hidden="true" />
      <span className="ihbar-guide-hero-overlay" aria-hidden="true" />
      <div className="container ihbar-guide-hero-grid">
        <motion.div
          className="ihbar-guide-hero-copy"
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
        >
          <H1 id="ihbar-nedir">İhbar Tazminatı Hesaplaması: Örnekler, İhbar Süreleri ve Uygunluk Kriterleri 2026</H1>
          <p className="hero-copy">
            İhbar tazminatı, bir tarafın yasal olarak gerekli ihbar süresine uymadan iş sözleşmesini feshetmesi
            durumunda ortaya çıkan tutardır. İhbar tazminatına ilişkin yasal çerçeve, 4857 sayılı{" "}
            <a
              href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4857&MevzuatTur=1&MevzuatTertip=5"
              target="_blank"
              rel="noopener noreferrer"
            >
              İş Kanunu
            </a>
            &apos;nun
            özellikle 17. maddesinde (ihbar) belirtilmiştir.
          </p>
          <div className="ihbar-guide-hero-actions">
            <CalcCta href={`${HOME_PATH}#hesapla`}>Kıdem Tazminatı Hesapla</CalcCta>
            <a href="#ihbar-sure" className="guide-page-secondary-link">
              İhbar sürelerini incele
            </a>
          </div>
        </motion.div>
        <motion.div
          className="ihbar-guide-hero-visual"
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease, delay: reduceMotion ? 0 : 0.1 }}
        >
          <div className="ihbar-guide-hero-frame">
            <span className="ihbar-guide-hero-frame-ring" aria-hidden="true" />
            <GuideImage
              src={image.src}
              alt={image.alt}
              title={image.title}
              priority
              className="ihbar-guide-image--hero"
            />
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export function TwoColumnImageBlock({ image, children }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <div className="ihbar-guide-split ihbar-guide-split--image-left">
      <motion.aside
        className="ihbar-guide-split-visual"
        initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -22 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
      >
        <GuideImage src={image.src} alt={image.alt} title={image.title} className="ihbar-guide-image--compact" />
      </motion.aside>
      <motion.div
        className="ihbar-guide-split-copy"
        initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : 22 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease, delay: reduceMotion ? 0 : 0.06 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function NoticeTierCards({ tiers }) {
  return (
    <RevealStagger className="ihbar-tier-grid">
      {tiers.map((tier, index) => (
        <RevealItem key={tier.duration}>
          <TiltCard className="ihbar-tier-card-wrap" tiltMax={7} scale={1.02}>
            <article className="ihbar-tier-card">
              <span className="ihbar-tier-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="ihbar-tier-icon" aria-hidden="true">
                <CalendarClock size={20} strokeWidth={1.8} />
              </span>
              <p className="ihbar-tier-duration">{tier.duration}</p>
              <p className="ihbar-tier-weeks">
                <Clock3 size={16} strokeWidth={2} aria-hidden="true" />
                {tier.weeks}
              </p>
            </article>
          </TiltCard>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}

export function NoticeWarningCallout({ items }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <motion.aside
      className="ihbar-warning-callout"
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: reduceMotion ? 0 : 0.48, ease }}
    >
      <span className="ihbar-warning-callout-icon" aria-hidden="true">
        <AlertTriangle size={22} strokeWidth={1.8} />
      </span>
      <ul className="ihbar-warning-callout-list">
        {items.map((item) => (
          <li key={item}>
            <MinusCircle size={16} strokeWidth={2} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}

const EXAMPLE_ICONS = [Briefcase, UserMinus, Scale];

export function NoticeScenarioCards({ examples }) {
  return (
    <RevealStagger className="ihbar-examples-grid">
      {examples.map((example, index) => {
          const Icon = EXAMPLE_ICONS[index] ?? FileText;
          return (
            <RevealItem key={example.title}>
              <TiltCard className="ihbar-example-card-wrap" tiltMax={8} scale={1.02}>
                <article className="ihbar-example-card">
                  <span className="ihbar-example-badge" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="ihbar-example-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <H4>{example.title}</H4>
                  <p>{linkInternalTerms(example.body)}</p>
                </article>
              </TiltCard>
            </RevealItem>
          );
        })}
    </RevealStagger>
  );
}

export function NoticeComparisonTable({ rows }) {
  return (
    <Reveal>
      <div className="ihbar-compare-wrap">
        <table className="ihbar-compare-table">
          <caption className="sr-only">İhbar süresi ve bildirim ödemesi karşılaştırma tablosu</caption>
          <thead>
            <tr>
              <th scope="col">Özellik</th>
              <th scope="col" className="ihbar-compare-col--indigo">
                İhbar Süresi
              </th>
              <th scope="col" className="ihbar-compare-col--green">
                Bildirim Ödemesi
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature}>
                <th scope="row">{row.feature}</th>
                <td data-label="İhbar Süresi">{row.noticePeriod}</td>
                <td data-label="Bildirim Ödemesi">{row.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ihbar-compare-cards" aria-label="İhbar süresi ve bildirim ödemesi karşılaştırması">
          {rows.map((row) => (
            <article key={row.feature} className="ihbar-compare-card">
              <H4>{row.feature}</H4>
              <div className="ihbar-compare-card-row">
                <span className="ihbar-compare-card-label ihbar-compare-card-label--indigo">İhbar Süresi</span>
                <p>{row.noticePeriod}</p>
              </div>
              <div className="ihbar-compare-card-row">
                <span className="ihbar-compare-card-label ihbar-compare-card-label--green">Bildirim Ödemesi</span>
                <p>{row.payment}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function EligibilityCards({ notEligibleItems }) {
  return (
    <div className="ihbar-eligibility-grid">
      <Reveal direction="left">
        <TiltCard className="ihbar-eligibility-wrap" tiltMax={6} scale={1.02}>
          <article className="ihbar-eligibility-card ihbar-eligibility-card--yes">
            <span className="ihbar-eligibility-icon" aria-hidden="true">
              <CheckCircle2 size={24} strokeWidth={1.8} />
            </span>
            <H3>Kimler İhbar Tazminatına Hak Kazanır?</H3>
            <p>
              İş sözleşmesiyle çalışanlar genellikle ihbar tazminatına hak kazanırlar. Özellikle de işveren, yasal
              olarak gerekli ihbar süresini vermeden iş ilişkisini sonlandırdığında bu hak daha da artar.
            </p>
          </article>
        </TiltCard>
      </Reveal>
      <Reveal direction="right" delay={0.08}>
        <TiltCard className="ihbar-eligibility-wrap" tiltMax={6} scale={1.02}>
          <article className="ihbar-eligibility-card ihbar-eligibility-card--no">
            <span className="ihbar-eligibility-icon" aria-hidden="true">
              <XCircle size={24} strokeWidth={1.8} />
            </span>
            <H3>Bir Çalışanın İhbar Tazminatına Hak Kazanmadığı Durumlar</H3>
            <p>
              Bazı durumlarda çalışanlar ihbar tazminatı talep edemezler. Bir çalışan genellikle aşağıdaki durumlarda
              ihbar tazminatına hak kazanamaz:
            </p>
            <ul className="ihbar-not-eligible-list">
              {notEligibleItems.map((item) => (
                <li key={item}>
                  <XCircle size={16} strokeWidth={2} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </TiltCard>
      </Reveal>
    </div>
  );
}

const RIGHTS_ICONS = [Wallet, Briefcase, ShieldAlert];

export function RightsSectionLayout({ cards, accentImage }) {
  return (
    <div className="ihbar-rights-layout">
      <Reveal className="ihbar-rights-accent">
        <GuideImage
          src={accentImage.src}
          alt={accentImage.alt}
          title={accentImage.title}
          className="ihbar-guide-image--accent"
        />
      </Reveal>
      <RightsGrid cards={cards} />
    </div>
  );
}

export function RightsGrid({ cards }) {
  return (
    <RevealStagger className="ihbar-rights-grid">
      {cards.map((card, index) => {
        const Icon = RIGHTS_ICONS[index] ?? Info;
        return (
          <RevealItem key={card.id}>
            <TiltCard className="ihbar-rights-card-wrap" tiltMax={7} scale={1.02}>
              <article className="ihbar-rights-card">
                <span className="ihbar-rights-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <H3>{card.title}</H3>
                {card.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {card.list.length > 0 ? (
                  <ul className="ihbar-rights-checklist">
                    {card.list.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </TiltCard>
          </RevealItem>
        );
      })}
    </RevealStagger>
  );
}

export function PilonCallout({ factors }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <div className="ihbar-pilon-block">
      <motion.div
        className="ihbar-pilon-badge"
        initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewport}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease }}
      >
        <span className="ihbar-pilon-acronym">PILON</span>
        <span className="ihbar-pilon-sub">İhbar Süresi Yerine Ödeme</span>
      </motion.div>
      <p>
        PILON, &quot;İhbar Süresi Yerine Ödeme&quot; anlamına gelir ve işverenin, çalışana ihbar süresi için tazminat
        ödeyerek iş akdini derhal feshetmesine olanak tanır. PILON kapsamında ödenecek tutar genellikle çalışanın
        düzenli kazancı üzerinden hesaplanır.
      </p>
      <p>İlgili faktörler şunlardır:</p>
      <RevealStagger className="ihbar-pilon-chips">
        {factors.map((factor) => (
          <RevealItem key={factor}>
            <span className="ihbar-pilon-chip">
              <Coins size={14} strokeWidth={2} aria-hidden="true" />
              {factor}
            </span>
          </RevealItem>
        ))}
      </RevealStagger>
    </div>
  );
}

export function ProsConsGrid({ pros, cons }) {
  return (
    <div className="ihbar-pros-cons-grid">
      <Reveal direction="left">
        <TiltCard className="ihbar-pros-cons-wrap" tiltMax={6} scale={1.02}>
          <article className="ihbar-pros-cons-card ihbar-pros-cons-card--pro">
            <span className="ihbar-pros-cons-heading-icon" aria-hidden="true">
              <ThumbsUp size={20} strokeWidth={1.8} />
            </span>
            <H3>Avantajları</H3>
            <ul>
              {pros.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </TiltCard>
      </Reveal>
      <Reveal direction="right" delay={0.08}>
        <TiltCard className="ihbar-pros-cons-wrap" tiltMax={6} scale={1.02}>
          <article className="ihbar-pros-cons-card ihbar-pros-cons-card--con">
            <span className="ihbar-pros-cons-heading-icon" aria-hidden="true">
              <ThumbsDown size={20} strokeWidth={1.8} />
            </span>
            <H3>Dezavantajlar</H3>
            <ul>
              {cons.map((item) => (
                <li key={item}>
                  <UserX size={16} strokeWidth={2} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </TiltCard>
      </Reveal>
    </div>
  );
}

export function TaxCallout() {
  return (
    <InfoCalloutStyled icon={Receipt}>
      <H3>Bildirim Ücreti Vergiye Tabi Midir?</H3>
      <p>
        Evet, ihbar tazminatı, müşterinizle yaptığınız sözleşmede belirtilmişse vergilendirilebilir gelir olarak kabul
        edilir. Çünkü ihbar tazminatı, ihbar süresi boyunca alınacak kazançların yerini alır. Kesin vergi uygulaması,
        mevcut vergi düzenlemelerine ve çalışanın bireysel durumuna bağlıdır.
      </p>
    </InfoCalloutStyled>
  );
}

export function InsolvencyCallout() {
  return (
    <InfoCalloutStyled icon={ShieldAlert} variant="important">
      <p>
        Bu, işverenin çalışanlarına olan borçlarını ödeyemediği ve iflas ettiği bir durumdur. Ancak yine de, bu
        durumda çalışanlar ihbar tazminatına hak kazanırlar. İflas etmiş bir işveren, yasal ihbar süresi vermeden bir
        çalışanın işine son verirse, İş Kanunu&apos;nun 17. maddesi (ihbar) uyarınca, çalışan yine de ihbar
        tazminatına hak kazanabilir.
      </p>
    </InfoCalloutStyled>
  );
}

function InfoCalloutStyled({ children, icon: Icon, variant = "info" }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <motion.aside
      className={`ihbar-info-callout ihbar-info-callout--${variant}`}
      initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: reduceMotion ? 0 : 0.48, ease }}
    >
      <span className="ihbar-info-callout-icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.8} />
      </span>
      <div>{children}</div>
    </motion.aside>
  );
}
