"use client";

import { motion } from "framer-motion";
import { HOME_PATH } from "@/config/site";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Coins,
  FileText,
  Heart,
  Landmark,
  Scale,
  Shield,
  TrendingUp,
  UserCheck,
  Users
} from "lucide-react";
import CalcCta from "@/components/common/CalcCta";
import CountUp from "../ui/CountUp";
import TiltCard from "../ui/TiltCard";
import { Reveal, RevealItem, RevealStagger } from "../motion/Reveal";
import SectionHeading from "../motion/SectionHeading";
import { useMotionPrefs } from "../motion/useMotionPrefs";

export function ExactFigure({ value, className = "" }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <motion.span
      className={className}
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
    >
      {value}
    </motion.span>
  );
}

export function TavanHero({ stat }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <header id="tavan-tanim" className="tavan-guide-hero">
      <span className="tavan-guide-hero-bg" aria-hidden="true" />
      <span className="tavan-guide-hero-overlay" aria-hidden="true" />
      <span className="tavan-guide-hero-glow tavan-guide-hero-glow--1" aria-hidden="true" />
      <span className="tavan-guide-hero-glow tavan-guide-hero-glow--2" aria-hidden="true" />
      <div className="container tavan-guide-hero-grid">
        <motion.div
          className="tavan-guide-hero-copy"
          initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
        >
          <span className="tavan-guide-eyebrow">Kıdem Tazminatı Tavanı</span>
          <h1>2026 Türkiye Kıdem Tazminatı Tavanı: Güncellenmiş Oranlar, Hesaplama ve İş Hukuku Rehberi</h1>
          <p>
            İşten ayrılma tazminatı tavanı, ücret hesaplamasında en önemli faktörlerden biridir. İnsan kaynakları
            uzmanları, muhasebe departmanı üyeleri ve çalışanlar her yıl tavan güncellemelerini kontrol eder, çünkü
            bu durum işten ayrılma tazminatı hesaplaması üzerinde büyük bir etkiye sahiptir.
          </p>
          <p>
            Ocak-Haziran 2026 dönemi için kıdem tazminatı tavanı 64.948,77 TL olarak açıklandı. Bir önceki yıla
            kıyasla kıdem tazminatı tavanında önemli bir artış söz konusu.
          </p>
          <div className="tavan-guide-hero-actions">
            <CalcCta href={`${HOME_PATH}#hesapla`}>Şimdi Hesapla</CalcCta>
          </div>
        </motion.div>
        <motion.div
          className="tavan-guide-hero-stat-wrap"
          initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease, delay: reduceMotion ? 0 : 0.08 }}
        >
          <TiltCard className="tavan-hero-stat-card-wrap" tiltMax={7} scale={1.02}>
            <article className="tavan-hero-stat-card">
              <span className="tavan-hero-stat-badge" aria-hidden="true">
                <TrendingUp size={14} strokeWidth={2.5} />
                {stat.badge}
              </span>
              <p className="tavan-hero-stat-label">{stat.label}</p>
              <p className="tavan-hero-stat-value">
                <ExactFigure value={stat.value} />
              </p>
              <span className="tavan-hero-stat-icon" aria-hidden="true">
                <Coins size={28} strokeWidth={1.6} />
              </span>
            </article>
          </TiltCard>
        </motion.div>
      </div>
    </header>
  );
}

const DEFINITION_ICONS = [ArrowDown, ArrowUp];

export function DefinitionPointCards({ points }) {
  return (
    <RevealStagger className="tavan-definition-grid">
      {points.map((point, index) => {
        const Icon = DEFINITION_ICONS[index] ?? Scale;
        return (
          <RevealItem key={point.id}>
            <TiltCard className="tavan-definition-card-wrap" tiltMax={7} scale={1.02}>
              <article className={`tavan-definition-card tavan-definition-card--${point.id}`}>
                <span className="tavan-definition-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <p>{point.text}</p>
              </article>
            </TiltCard>
          </RevealItem>
        );
      })}
    </RevealStagger>
  );
}

const LEGAL_ICONS = [Landmark, FileText, Building2, BookOpen];

export function LegalBasisCards({ rows }) {
  return (
    <RevealStagger className="tavan-legal-grid">
      {rows.map((row, index) => {
        const Icon = LEGAL_ICONS[index] ?? FileText;
        return (
          <RevealItem key={row.source}>
            <article className="tavan-legal-card">
              <span className="tavan-legal-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <p className="tavan-legal-source">{row.source}</p>
              <p className="tavan-legal-definition">{row.definition}</p>
            </article>
          </RevealItem>
        );
      })}
    </RevealStagger>
  );
}

export function OfficialTavanStat({ row }) {
  return (
    <Reveal>
      <TiltCard className="tavan-official-stat-wrap" tiltMax={6} scale={1.015}>
        <article className="tavan-official-stat">
          <p className="tavan-official-stat-period">{row.period}</p>
          <p className="tavan-official-stat-amount">{row.amount}</p>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export function AffectedGroupChips({ items }) {
  return (
    <RevealStagger className="tavan-affected-chips">
      {items.map((item) => (
        <RevealItem key={item}>
          <span className="tavan-affected-chip">
            <Users size={14} strokeWidth={2} aria-hidden="true" />
            {item}
          </span>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}

export function TavanBarChart({ rows }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();
  const max = Math.max(...rows.map((row) => row.numeric));

  return (
    <div className="tavan-bar-chart-block">
      <div className="tavan-bar-chart" role="img" aria-label="Yıllık tavan tutarı karşılaştırma grafiği">
        {rows.map((row, index) => {
          const height = `${Math.round((row.numeric / max) * 100)}%`;
          return (
            <div key={row.period} className="tavan-bar-chart-col">
              <motion.div
                className="tavan-bar-chart-bar"
                initial={{ height: reduceMotion ? height : "0%" }}
                whileInView={{ height }}
                viewport={viewport}
                transition={{ duration: reduceMotion ? 0 : 0.65, ease, delay: reduceMotion ? 0 : index * 0.1 }}
              >
                <span className="tavan-bar-chart-value">{row.amount}</span>
              </motion.div>
              <p className="tavan-bar-chart-label">{row.period}</p>
            </div>
          );
        })}
      </div>
      <div className="tavan-compare-table-wrap">
        <table className="tavan-data-table tavan-data-table--compact">
          <caption className="sr-only">Yıllık tavan tutarı karşılaştırma tablosu</caption>
          <thead>
            <tr>
              <th scope="col">Dönem</th>
              <th scope="col">Tavan Tutarı</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.period}>
                <th scope="row">{row.period}</th>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tavan-mobile-cards" aria-label="Yıllık tavan tutarı karşılaştırması">
          {rows.map((row) => (
            <article key={row.period} className="tavan-mobile-card">
              <h4>{row.period}</h4>
              <p>{row.amount}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HistoryTable({ rows }) {
  return (
    <Reveal>
      <div className="tavan-history-wrap">
        <table className="tavan-data-table tavan-history-table">
          <caption className="sr-only">Kıdem tazminatı tavanı geçmişi</caption>
          <thead>
            <tr>
              <th scope="col">Dönem</th>
              <th scope="col">Kıdem Tazminatı Tavanı (TL)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <motion.tr
                key={row.period}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <th scope="row">{row.period}</th>
                <td>
                  {row.badge ? <span className="tavan-muted-badge">{row.amount}</span> : row.amount}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div className="tavan-mobile-cards tavan-mobile-cards--history" aria-label="Kıdem tazminatı tavanı geçmişi">
          {rows.map((row) => (
            <article key={row.period} className="tavan-mobile-card">
              <h4>{row.period}</h4>
              <p>{row.badge ? <span className="tavan-muted-badge">{row.amount}</span> : row.amount}</p>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function FormulaCallout() {
  return (
    <Reveal>
      <TiltCard className="tavan-formula-wrap" tiltMax={6} scale={1.015}>
        <div className="tavan-formula-card">
          <code>Brüt Aylık Maaş × Hizmet Süresi (Yıl)</code>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export function GrossIncludesList({ items }) {
  return (
    <RevealStagger className="tavan-checklist" as="ul">
      {items.map((item) => (
        <RevealItem key={item} as="li">
          <CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" />
          {item}
        </RevealItem>
      ))}
    </RevealStagger>
  );
}

export function CeilingMechanismCards({ belowItems, aboveItems }) {
  return (
    <div className="tavan-mechanism-grid">
      <Reveal direction="left">
        <TiltCard className="tavan-mechanism-wrap" tiltMax={6} scale={1.02}>
          <article className="tavan-mechanism-card tavan-mechanism-card--below">
            <h3>Tavanın Altında Çalışan</h3>
            <ul>
              {belowItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </TiltCard>
      </Reveal>
      <Reveal direction="right" delay={0.08}>
        <TiltCard className="tavan-mechanism-wrap" tiltMax={6} scale={1.02}>
          <article className="tavan-mechanism-card tavan-mechanism-card--above">
            <h3>Tavanın Üstündeki Çalışan</h3>
            <ul>
              {aboveItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </TiltCard>
      </Reveal>
    </div>
  );
}

export function ExampleCalculationCards({ examples }) {
  return (
    <RevealStagger className="tavan-examples-grid">
      {examples.map((example) => (
        <RevealItem key={example.id}>
          <TiltCard className="tavan-example-wrap" tiltMax={7} scale={1.02}>
            <article className="tavan-example-card">
              <h3>{example.title}</h3>
              <ul>
                {example.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="tavan-example-result">
                {example.result.includes("360,000") ? (
                  <>
                    Kıdem Tazminatı = <CountUp value={example.countValue} /> TL
                  </>
                ) : (
                  <>
                    Tazminat = <ExactFigure value={example.countValue} /> TL
                  </>
                )}
              </p>
            </article>
          </TiltCard>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}

const SCENARIO_ICONS = [Briefcase, Shield, UserCheck, Heart];

export function EligibilityScenarioGrid({ scenarios }) {
  return (
    <RevealStagger className="tavan-eligibility-grid">
      {scenarios.map((scenario, index) => {
        const Icon = SCENARIO_ICONS[index] ?? Users;
        return (
          <RevealItem key={scenario.id}>
            <TiltCard className="tavan-eligibility-wrap" tiltMax={7} scale={1.02}>
              <article className="tavan-eligibility-card">
                <span className="tavan-eligibility-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3>{scenario.title}</h3>
                <p>{scenario.intro}</p>
                {scenario.list.length > 0 ? (
                  <ul className="tavan-checklist tavan-checklist--inline">
                    {scenario.list.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {scenario.closing ? <p>{scenario.closing}</p> : null}
              </article>
            </TiltCard>
          </RevealItem>
        );
      })}
    </RevealStagger>
  );
}

export function TaxInfoNote({ children }) {
  const { reduceMotion, viewport, ease } = useMotionPrefs();

  return (
    <motion.aside
      className="tavan-tax-note"
      initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: reduceMotion ? 0 : 0.48, ease }}
    >
      <Scale size={22} strokeWidth={1.8} aria-hidden="true" />
      <div>{children}</div>
    </motion.aside>
  );
}

export function MistakesTable({ rows }) {
  return (
    <Reveal>
      <div className="tavan-mistakes-wrap">
        <table className="tavan-data-table tavan-mistakes-table">
          <caption className="sr-only">İşverenlerin sık yaptığı hatalar</caption>
          <thead>
            <tr>
              <th scope="col">Hatalar</th>
              <th scope="col">Potansiyel Sonuç</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <motion.tr
                key={row.mistake}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <th scope="row">
                  <span className="tavan-mistake-label">
                    <AlertTriangle size={16} strokeWidth={2} aria-hidden="true" />
                    {row.mistake}
                  </span>
                </th>
                <td>{row.consequence}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div className="tavan-mobile-cards tavan-mobile-cards--mistakes" aria-label="İşveren hataları">
          {rows.map((row) => (
            <article key={row.mistake} className="tavan-mobile-card tavan-mobile-card--warning">
              <h4>
                <AlertTriangle size={16} strokeWidth={2} aria-hidden="true" />
                {row.mistake}
              </h4>
              <p>{row.consequence}</p>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export { SectionHeading };
