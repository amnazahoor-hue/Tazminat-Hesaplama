"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import ResultPdfTemplate from "@/components/ResultPdfTemplate";
import ResultShareBar from "@/components/ResultShareBar";
import { exportResultPdf } from "@/utils/exportPdf";
import { buildShareReport, getEmailShareUrl, getWhatsAppShareUrl } from "@/utils/shareReport";
import { calculateCompensation, CONFIG, TR, validateForm } from "@/utils/helpers";

const initialForm = {
  startDate: "",
  endDate: "",
  grossSalary: "",
  reason: "haksiz_fesih",
  weeklyDays: "5",
  unusedLeaveDays: "0",
  overtime: "",
  otherReceivables: ""
};

const faqItems = [
  {
    id: "q1",
    question: "Kıdem tazminatı ve ihbar tazminatı nasıl hesaplanır?",
    answer:
      "İşten ayrılma tazminatı genellikle çalışanın 30 günlük brüt ücretinin, tamamlanan toplam hizmet yılıyla çarpılmasıyla hesaplanır. İhbar tazminatı ise haftalık maaş ve yasal olarak zorunlu olan 2, 4, 6 veya 8 haftalık ihbar süresi esas alınarak hesaplanır."
  },
  {
    id: "q2",
    question: "2026 yılı için tazminat hesaplamasında tavan değeri nedir?",
    answer:
      "2026 kıdem tazminatı tavanı, bu sınırın üzerindeki tazminat hesaplamalarının iş hukuku düzenlemelerine ve Resmî Gazete güncellemelerine göre sınırlandırıldığı anlamına gelir."
  },
  {
    id: "q3",
    question: "Net maaştan kıdem tazminatını nasıl hesaplayabilirim?",
    answer:
      "Çalışanın net maaşını brüt maaş karşılığına çevirin. Ardından, kıdem tazminatı brüt maaşa dayalı tazminat formülü ve yasal kesintiler kullanılarak hesaplanır."
  },
  {
    id: "q4",
    question: "Brüt maaştan kıdem tazminatı nasıl hesaplanır?",
    answer: "Brüt maaşa dayalı kıdem tazminatı, çalışanın brüt maaşının toplam hizmet yılı ile çarpılmasıyla hesaplanır."
  },
  {
    id: "q5",
    question: "Tazminatımdan ne kadar vergi kesilecek?",
    answer:
      "Birçok durumda, kıdem tazminatından %0,759 oranında vergi kesilir. Ayrıca ihbar tazminatı ve diğer tazminatlar da gelir vergisi kesintilerinin bir parçasıdır."
  },
  {
    id: "q6",
    question: "Seyahat ve yemek ödenekleri maaşıma dahil mi?",
    answer: "Evet, seyahat ödenekleri, yemek ödemeleri, ikramiyeler ve teşvik ödemeleri genellikle brüt ücrete dahildir."
  },
  {
    id: "q7",
    question: "İhbar süresi nedir?",
    answer:
      "İhbar süreleri, çalışanın toplam hizmet yılına bağlı olarak, yasal olarak zorunlu olan işten çıkarma öncesi sürelerdir."
  },
  {
    id: "q8",
    question: "Kendi isteğimle ayrılırsam tazminat alabilir miyim?",
    answer:
      "Çalışanlar, emeklilik, askerlik hizmeti veya yasal olarak korunan diğer işten çıkarma durumlarında kıdem tazminatı alabilirler."
  },
  {
    id: "q9",
    question: "Kıdem tazminatı ve ihbar tazminatı aynı anda alınabilir mi?",
    answer:
      "Evet. Çalışanlar, iş kanunları kapsamında hak kazanmaları durumunda hem kıdem tazminatını hem de ihbar tazminatını birlikte alabilirler."
  },
  {
    id: "q10",
    question: "Tazminat hesaplama aracı ne kadar doğru?",
    answer:
      "Bir kıdem tazminatı hesaplayıcısı, sağladığınız doğru iş bilgilerine dayanarak tahmini sonuçlar verir. Ancak nihai tazminat, yasal koşullara bağlı olarak değişebilir."
  },
  {
    id: "q11",
    question: "Tazminatımı ne zaman almalıyım?",
    answer:
      "Tazminat tutarı genellikle çalışana mümkün olan en kısa sürede ödenir ve çalışan yeni bir iş bulana kadar geçerlidir."
  },
  {
    id: "q12",
    question: "Araçtan elde edilen sonuçlar resmi olarak kabul ediliyor mu?",
    answer:
      "Hayır, hesaplayıcı sonuçları yalnızca bilgilendirme amacıyla verilen tahminlerdir. Yasal olarak kabul edilmemelidirler. Çalışanlar nihai ödemelerini İK departmanlarından ve işverenlerinden teyit etmelidir."
  }
];

const HERO_CAROUSEL_IMAGES = [
  "/hero-carousel-lira.png",
  "/hero-carousel-1.png",
  "/hero-carousel-2.png",
  "/hero-carousel-3.png"
];

function formatDuration(s) {
  return `${s.yil} yıl ${s.ay} ay ${s.gun} gün`;
}

function ContentSection({ id, alt, children }) {
  return (
    <section className={`section content-section${alt ? " alt" : ""}`} id={id}>
      <div className="container">{children}</div>
    </section>
  );
}

export default function CompensationCalculator() {
  const [activeTab, setActiveTab] = useState("standart");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [openFaq, setOpenFaq] = useState("");
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [pdfLoading, setPdfLoading] = useState(false);
  const pdfRef = useRef(null);
  const resultsRef = useRef(null);
  const gerekliGirisRef = useRef(null);
  const pendingScrollToResults = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % HERO_CAROUSEL_IMAGES.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!result || !pendingScrollToResults.current) return undefined;
    pendingScrollToResults.current = false;
    const timer = window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [result]);

  useEffect(() => {
    const node = gerekliGirisRef.current;
    if (!node) return undefined;

    const reveal = () => node.classList.add("is-revealed");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }),
    []
  );
  const faqLeftColumn = useMemo(() => faqItems.filter((_, index) => index % 2 === 0), []);
  const faqRightColumn = useMemo(() => faqItems.filter((_, index) => index % 2 === 1), []);

  const renderFaqItem = (faq) => {
    const isOpen = openFaq === faq.id;
    const buttonId = `faq-button-${faq.id}`;
    const panelId = `faq-panel-${faq.id}`;
    return (
      <article className={`faq-item${isOpen ? " is-open" : ""}`} key={faq.id}>
        <h3>
          <button
            id={buttonId}
            type="button"
            className="faq-trigger"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => setOpenFaq((prev) => (prev === faq.id ? "" : faq.id))}
          >
            <span>{faq.question}</span>
            <span className="faq-toggle" aria-hidden="true">
              +
            </span>
          </button>
        </h3>
        <div
          id={panelId}
          className="faq-content"
          role="region"
          aria-labelledby={buttonId}
          aria-hidden={!isOpen}
        >
          <div className="faq-content-inner">{faq.answer}</div>
        </div>
      </article>
    );
  };

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      startDate: form.startDate,
      endDate: form.endDate,
      grossSalary: TR.parseMoney(form.grossSalary),
      reason: form.reason,
      weeklyDays: parseInt(form.weeklyDays, 10),
      unusedLeaveDays: parseInt(form.unusedLeaveDays || "0", 10),
      overtime: TR.parseMoney(form.overtime),
      otherReceivables: TR.parseMoney(form.otherReceivables)
    };
    const v = validateForm(payload);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    if (
      payload.grossSalary < CONFIG.MIN_WAGE_2024 &&
      !window.confirm(
        `Girilen maaş asgari ücretin (₺${TR.money(CONFIG.MIN_WAGE_2024)}) altında. Devam edilsin mi?`
      )
    ) {
      return;
    }
    const calc = calculateCompensation(payload);
    setResult(calc.error ? null : calc);
    if (!calc.error) pendingScrollToResults.current = true;
  };

  const clear = () => {
    setForm({ ...initialForm, endDate: new Date().toISOString().split("T")[0] });
    setErrors({});
    setResult(null);
  };

  const copy = async () => {
    if (!result) return;
    const { text } = buildShareReport({ form, result, activeTab });
    await navigator.clipboard.writeText(text);
    window.alert("Sonuç kopyalandı.");
  };

  const shareWhatsApp = () => {
    if (!result) return;
    const { text } = buildShareReport({ form, result, activeTab });
    window.open(getWhatsAppShareUrl(text), "_blank", "noopener,noreferrer");
  };

  const shareEmail = () => {
    if (!result) return;
    const { text } = buildShareReport({ form, result, activeTab });
    window.location.href = getEmailShareUrl({ text });
  };

  const downloadPdf = async () => {
    if (!result || !pdfRef.current) return;
    const sheet = pdfRef.current.querySelector(".pdf-report-sheet");
    if (!sheet) return;

    setPdfLoading(true);
    try {
      await exportResultPdf(sheet);
    } catch {
      window.alert("PDF oluşturulamadı. Lütfen tekrar deneyin.");
    } finally {
      setPdfLoading(false);
    }
  };

  useEffect(() => {
    setForm((prev) => {
      if (prev.endDate) return prev;
      return { ...prev, endDate: new Date().toISOString().split("T")[0] };
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const giris = params.get("giris");
    const cikis = params.get("cikis");
    const maas = params.get("maas");
    if (!giris && !cikis && !maas) return;

    const parseDdMmYyyy = (v) => {
      if (!v) return "";
      if (v.includes("-")) return v;
      const parts = v.split(".");
      if (parts.length !== 3) return "";
      const [dd, mm, yyyy] = parts;
      return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    };

    const startDate = parseDdMmYyyy(giris);
    const endDate = parseDdMmYyyy(cikis);
    const grossSalary = maas || "";
    setForm((prev) => ({
      ...prev,
      startDate: startDate || prev.startDate,
      endDate: endDate || prev.endDate,
      grossSalary: grossSalary || prev.grossSalary
    }));

    const payload = {
      startDate,
      endDate,
      grossSalary: TR.parseMoney(grossSalary),
      reason: "haksiz_fesih",
      weeklyDays: 5,
      unusedLeaveDays: 0,
      overtime: 0,
      otherReceivables: 0
    };
    const v = validateForm(payload);
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    const calc = calculateCompensation(payload);
    setErrors({});
    setResult(calc.error ? null : calc);
  }, []);

  return (
    <>
      <section className="hero-shell landing-frame">
        <div className="landing-frame-inner">
          <div className="hero-card">
            <div className="hero-grid">
              <div className="hero-content">
                <h1>Kıdem Tazminatı Hesaplayıcısı ve Kıdem Tazminatı Hakkında Kapsamlı Kılavuz</h1>
                <p className="hero-copy">
                  İşten ayrılma tazminatını anlamak hem çalışanlar hem de işverenler için çok önemlidir. Hak ettiğiniz
                  tazminatı doğru bir şekilde tahmin etmek için İşten Ayrılma Tazminatı Hesaplayıcımızı kullanın ve
                  işten ayrılma tazminatının nasıl hesaplandığını öğrenmek için kapsamlı kılavuzumuzu inceleyin.
                </p>
                <span className="hero-divider" aria-hidden="true" />
                <a
                  href="#hesapla"
                  className="hero-cta-lime"
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById("hesapla")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Hesapla
                  <span className="hero-cta-icon" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
              <div className="hero-visual" aria-hidden="true">
                <div className="hero-carousel">
                  {HERO_CAROUSEL_IMAGES.map((src, index) => (
                    <div
                      key={src}
                      className={`hero-carousel-slide${activeHeroSlide === index ? " is-active" : ""}`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 900px) 100vw, 52vw"
                        priority={index === 0}
                        className="hero-visual-img"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hero-slider-dots" aria-hidden="true">
              {HERO_CAROUSEL_IMAGES.map((src, index) => (
                <span key={src} className={activeHeroSlide === index ? "is-active" : ""} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section calc-section" id="hesapla">
        <div className="container calc-wrap">
          <div className="calc-panel">
            <div className="calc-panel-top" aria-hidden="true" />
            <div className="calc-panel-head">
              <div className="tabs calc-tabs" role="tablist" aria-label="Hesaplama modu">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "standart"}
                  className={activeTab === "standart" ? "active" : ""}
                  onClick={() => setActiveTab("standart")}
                >
                  Standart
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "detayli"}
                  className={activeTab === "detayli" ? "active" : ""}
                  onClick={() => setActiveTab("detayli")}
                >
                  Detaylı
                </button>
              </div>
            </div>

            <form className="calc-form" onSubmit={submit}>
              <div className="calc-fields grid">
              <label>
                İşe Giriş Tarihi
                <input
                  id="giris"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => onChange("startDate", e.target.value)}
                />
                {errors.giris && <small className="error">{errors.giris}</small>}
              </label>
              <label>
                İşten Çıkış Tarihi
                <input type="date" value={form.endDate} onChange={(e) => onChange("endDate", e.target.value)} />
                {errors.cikis && <small className="error">{errors.cikis}</small>}
              </label>
              <label className="full calc-salary-block">
                Son Brüt Aylık Maaş (₺)
                <input
                  type="text"
                  className="calc-salary-input"
                  value={form.grossSalary}
                  onChange={(e) => onChange("grossSalary", e.target.value)}
                  onBlur={(e) => {
                    const n = TR.parseMoney(e.target.value);
                    if (n > 0) onChange("grossSalary", TR.money(n));
                  }}
                  placeholder="28.000,00"
                />
                <div className="chips calc-chips">
                  {["17.002,12", "20.000,00", "25.000,00", "30.000,00", "40.000,00", "50.000,00"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`chip${form.grossSalary === m ? " is-active" : ""}`}
                      onClick={() => onChange("grossSalary", m)}
                    >
                      ₺{m}
                    </button>
                  ))}
                </div>
                {errors.maas && <small className="error">{errors.maas}</small>}
              </label>
              <label>
                İşten Ayrılma Nedeni
                <select value={form.reason} onChange={(e) => onChange("reason", e.target.value)}>
                  <option value="haksiz_fesih">İşveren tarafından haksız fesih</option>
                  <option value="istifa_haksiz">İstifa - haklı neden olmaksızın</option>
                  <option value="istifa_hakli">İstifa - haklı nedenle</option>
                  <option value="emeklilik">Emeklilik / Askerlik / Evlilik</option>
                  <option value="belirli_sureli">Belirli süreli sözleşme sonu</option>
                  <option value="anlasma">Karşılıklı anlaşma (ikale)</option>
                  <option value="olum">Vefat</option>
                </select>
              </label>
              <label>
                Haftalık Çalışma Günü
                <select value={form.weeklyDays} onChange={(e) => onChange("weeklyDays", e.target.value)}>
                  <option value="5">5 gün</option>
                  <option value="6">6 gün</option>
                </select>
              </label>
              {activeTab === "detayli" && (
                <>
                  <label>
                    Kullanılmamış Yıllık İzin (gün)
                    <input
                      type="number"
                      min={0}
                      value={form.unusedLeaveDays}
                      onChange={(e) => onChange("unusedLeaveDays", e.target.value)}
                    />
                  </label>
                  <label>
                    Fazla Mesai Alacağı (₺)
                    <input type="text" value={form.overtime} onChange={(e) => onChange("overtime", e.target.value)} />
                  </label>
                  <label className="full">
                    Diğer Alacaklar (₺)
                    <input
                      type="text"
                      value={form.otherReceivables}
                      onChange={(e) => onChange("otherReceivables", e.target.value)}
                    />
                  </label>
                </>
              )}
              </div>
              <div className="calc-actions actions">
                <button type="submit" className="calc-submit-btn">
                  Tazminatı Hesapla
                  <span className="calc-submit-icon" aria-hidden="true">
                    →
                  </span>
                </button>
                <div className="calc-secondary-actions">
                  <button type="button" onClick={clear}>
                    Temizle
                  </button>
                  <button type="button" onClick={() => window.print()}>
                    Yazdır
                  </button>
                  <button type="button" onClick={copy} disabled={!result}>
                    Sonucu Kopyala
                  </button>
                </div>
              </div>
            </form>
          </div>

          {result && (
            <div id="calc-results" className="calc-results results" ref={resultsRef}>
              <div className="result-results-top" aria-hidden="true" />
              <div className="result-results-head">
                <h3>Hesaplama Sonuçları</h3>
                <p className="result-period">
                  {result.iseGirisTarihi} - {result.istenCikisTarihi} / {formatDuration(result.calismaSuresi)}
                </p>
              </div>
              <div className="result-cards">
                <article>
                  <h4>Kıdem Tazminatı</h4>
                  <strong>₺{TR.money(result.kidemTazminati)}</strong>
                </article>
                <article>
                  <h4>İhbar Tazminatı</h4>
                  <strong>₺{TR.money(result.ihbarTazminati)}</strong>
                </article>
                <article>
                  <h4>Toplam Tazminat</h4>
                  <strong>₺{TR.money(result.toplamTazminat)}</strong>
                </article>
              </div>

              <div className="result-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Kalem</th>
                      <th>Hesaplama</th>
                      <th>Tutar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Kıdem Tazminatı</td>
                      <td>
                        ₺{TR.money(Math.min(result.brutMaas, result.tavanTutari))} x {result.totalYears.toFixed(2)} yıl
                      </td>
                      <td>₺{TR.money(result.kidemTazminati)}</td>
                    </tr>
                    <tr>
                      <td>İhbar Tazminatı</td>
                      <td>
                        (₺{TR.money(result.brutMaas)} / 30) x {result.ihbarSuresi} gün
                      </td>
                      <td>₺{TR.money(result.ihbarTazminati)}</td>
                    </tr>
                    {activeTab === "detayli" && result.unusedLeaveDays > 0 && (
                      <tr>
                        <td>Kullanılmamış İzin</td>
                        <td>
                          (₺{TR.money(result.brutMaas)} / 30) x {result.unusedLeaveDays} gün
                        </td>
                        <td>₺{TR.money(result.unusedLeavePay)}</td>
                      </tr>
                    )}
                    <tr className="result-total-row">
                      <td>Toplam</td>
                      <td />
                      <td>₺{TR.money(result.toplamTazminat)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <ResultShareBar
                onWhatsApp={shareWhatsApp}
                onPdf={downloadPdf}
                onEmail={shareEmail}
                pdfLoading={pdfLoading}
              />
            </div>
          )}

          {result && (
            <div ref={pdfRef}>
              <ResultPdfTemplate form={form} result={result} activeTab={activeTab} />
            </div>
          )}
        </div>
      </section>

      <ContentSection id="tazminat-turleri">
        <div className="intro-section">
          <div className="intro-showcase">
            <div className="intro-showcase-copy">
              <h2>İşten Çıkarma Tazminatı Nedir?</h2>
              <p>
                İşten çıkarma tazminatı, belirli yasal veya sözleşmesel koşullar altında iş ilişkisinin sona ermesi
                durumunda işveren tarafından çalışana ödenen mali tazminattır. Birçok ülkede, işten çıkarma tazminatı
                hesaplaması iş kanunları, iş sözleşmeleri, toplu iş sözleşmeleri ve şirket politikaları tarafından
                düzenlenir.
              </p>
              <p>
                Çalışanlar, işten çıkarma, emeklilik, işten çıkarılma, iş gücü azaltımı, askerlik hizmeti, istifa veya
                işten ayrılma durumlarında işten çıkarma tazminatı alabilirler. Geçerli yasa ve iş şartlarına bağlı olarak,
                çalışanlar ayrıca ihbar tazminatı ve diğer çalışan alacaklarına da hak kazanabilirler. Ancak politikalar
                şirketten şirkete biraz farklılık gösterebilir. Tüm bu ödemeler için hesaplamaları hesaplayıcımızı
                kullanarak yapabilirsiniz.
              </p>
            </div>
            <div className="intro-sticky-board">
              <ul className="intro-points-list">
                <li>İşten çıkarma tazminatı hesaplaması</li>
                <li>İhbar tazminatı hesaplaması</li>
                <li>İhbar süresi hesaplaması</li>
                <li>Çalışan ücreti hesaplaması</li>
                <li>Emeklilik tazminatı hesaplaması</li>
                <li>İşten ayrılma tazminatı hesaplaması</li>
                <li>Kıdem hesaplaması</li>
                <li>Net maaş üzerinden işten çıkarma tazminatı hesaplaması</li>
                <li>İşten çıkarma ve ihbar tazminatı birleşik hesaplaması</li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection alt id="ucretsiz-hesaplayici">
        <div className="free-calc-showcase">
          <div className="free-calc-visual">
            <Image
              src="/free-calc-idea.png"
              alt="Kıdem tazminatı hesaplama fikir görseli"
              width={600}
              height={400}
              className="free-calc-image"
            />
          </div>
          <div className="free-calc-copy">
            <h2>Ücretsiz Kıdem Tazminatı Hesaplayıcısı</h2>
            <p>
              Bu çevrimiçi kıdem tazminatı hesaplayıcısı, çalışanların, insan kaynakları uzmanlarının ve işverenlerin
              maaş, hizmet süresi, yaş, şirket politikası ve diğer önemli faktörlere dayanarak kıdem tazminatını hızlı
              bir şekilde tahmin etmelerine yardımcı olur. İster işten çıkarılma, ister işten atılma veya gönüllü ayrılma
              ile karşı karşıya olun, bu araç potansiyel kıdem tazminatı paketinizin anlık bir tahminini sunar.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="aninda-hesapla">
        <div className="instant-calc-showcase">
          <div className="instant-calc-list-panel">
            <ul className="instant-calc-points">
              <li>Toplam kıdem tazminatı tutarı</li>
              <li>Haftalık ve iki haftalık kıdem tazminatı</li>
              <li>İşten çıkarma tazminatı tahminleri</li>
              <li>Kıdem tazminatından vergi kesintileri</li>
              <li>Ek ödemeler ve yan haklar</li>
              <li>Maksimum kıdem tazminatı limitleri</li>
            </ul>
          </div>
          <div className="instant-calc-copy-card">
            <h2>İşten Çıkarma Tazminatınızı Anında Hesaplayın</h2>
            <p>
              Hesap makinesi veya bir araç kullanmadan kıdem tazminatını manuel olarak hesaplamak zordur. Bu yöntemde
              hatalar ve yanlışlıklar olma olasılığı yüksektir; ayrıca gelişmiş hesaplamalar için nihai formüle ve ödemeye
              çeşitli terimler ve değişkenler dahil edilir. İşte burada kıdem tazminatı hesaplayıcısının sihri devreye
              giriyor. Hesaplayıcı aşağıdaki hususları tahmin etmenize yardımcı olabilir:
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection alt id="gerekli-girisler">
        <div className="required-inputs-showcase" ref={gerekliGirisRef}>
          <h2 className="required-inputs-heading">Hesap Makinesi İçin Gerekli Girişler</h2>
          <p className="required-inputs-intro">
            İşten çıkarılmanız veya işten atılmanız durumunda alacağınız kıdem tazminatını belirlerken bazı faktörler
            önemlidir. Daha iyi bir tazminat alabilmeniz için her zaman doğru bilgiler vermeniz çok önemlidir.
            Hesaplama cihazına girilebilecek yaygın bilgiler şunlardır:
          </p>

          <div className="required-inputs-diagram">
            <svg
              className="required-inputs-connectors"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="req-conn-1" x1="408" y1="250" x2="338" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-2" x1="408" y1="250" x2="338" y2="145" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-3" x1="408" y1="250" x2="338" y2="250" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-4" x1="408" y1="250" x2="338" y2="355" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-5" x1="408" y1="250" x2="338" y2="460" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#65a30d" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-6" x1="592" y1="250" x2="662" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-7" x1="592" y1="250" x2="662" y2="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-8" x1="592" y1="250" x2="662" y2="320" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="req-conn-9" x1="592" y1="250" x2="662" y2="460" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path className="required-inputs-connector required-inputs-connector--1" d="M408 250 H362 V40 H338" stroke="url(#req-conn-1)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--2" d="M408 250 H362 V145 H338" stroke="url(#req-conn-2)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--3" d="M408 250 H338" stroke="url(#req-conn-3)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--4" d="M408 250 H362 V355 H338" stroke="url(#req-conn-4)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--5" d="M408 250 H362 V460 H338" stroke="url(#req-conn-5)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--6" d="M592 250 H638 V40 H662" stroke="url(#req-conn-6)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--7" d="M592 250 H638 V180 H662" stroke="url(#req-conn-7)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--8" d="M592 250 H638 V320 H662" stroke="url(#req-conn-8)" strokeWidth="2" />
                <path className="required-inputs-connector required-inputs-connector--9" d="M592 250 H638 V460 H662" stroke="url(#req-conn-9)" strokeWidth="2" />
              </g>
            </svg>

            <div className="required-inputs-hub" aria-hidden="true">
              <svg className="required-inputs-hub-art" viewBox="0 0 280 280" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="req-hub-calc" x1="88" y1="84" x2="192" y2="196" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4f46e5" />
                    <stop offset="1" stopColor="#7c3aed" />
                  </linearGradient>
                  <linearGradient id="req-hub-screen" x1="108" y1="98" x2="172" y2="126" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#eef2ff" />
                    <stop offset="1" stopColor="#f8f9ff" />
                  </linearGradient>
                  <filter id="req-hub-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#4f46e5" floodOpacity="0.22" />
                  </filter>
                </defs>
                <circle className="required-inputs-hub-glow" cx="140" cy="140" r="126" stroke="rgba(124, 58, 237, 0.12)" strokeWidth="2" />
                <circle cx="140" cy="140" r="110" stroke="rgba(79, 70, 229, 0.14)" strokeWidth="1.5" />
                <circle cx="140" cy="140" r="94" stroke="rgba(124, 58, 237, 0.2)" strokeWidth="1" />
                <g filter="url(#req-hub-shadow)">
                  <rect x="98" y="104" width="84" height="96" rx="12" fill="url(#req-hub-calc)" />
                  <rect x="108" y="114" width="64" height="22" rx="5" fill="url(#req-hub-screen)" />
                  <text x="140" y="129" textAnchor="middle" fill="#4f46e5" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                    ₺
                  </text>
                  <rect x="112" y="144" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.3)" />
                  <rect x="127" y="144" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.3)" />
                  <rect x="142" y="144" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.3)" />
                  <rect x="157" y="144" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.3)" />
                  <rect x="112" y="159" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.22)" />
                  <rect x="127" y="159" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.22)" />
                  <rect x="142" y="159" width="11" height="11" rx="2.5" fill="rgba(255,255,255,0.22)" />
                  <rect x="157" y="159" width="11" height="11" rx="2.5" fill="#c6f24e" fillOpacity="0.9" />
                  <rect x="112" y="174" width="26" height="11" rx="2.5" fill="rgba(255,255,255,0.2)" />
                  <rect x="142" y="174" width="26" height="11" rx="2.5" fill="rgba(255,255,255,0.2)" />
                </g>
                <g className="required-inputs-hub-coin required-inputs-hub-coin--1">
                  <circle cx="46" cy="56" r="14" fill="#eef2ff" stroke="#4f46e5" strokeWidth="1.4" />
                  <text x="46" y="60.5" textAnchor="middle" fill="#4f46e5" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                    ₺
                  </text>
                </g>
                <g className="required-inputs-hub-coin required-inputs-hub-coin--2">
                  <circle cx="234" cy="224" r="14" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.4" />
                  <text x="234" y="228.5" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                    ₺
                  </text>
                </g>
                <circle className="required-inputs-hub-spark" cx="234" cy="56" r="3.5" fill="#c6f24e" />
                <circle className="required-inputs-hub-spark required-inputs-hub-spark--delay" cx="46" cy="224" r="3" fill="#c6f24e" fillOpacity="0.88" />
                <circle cx="140" cy="32" r="2.5" fill="#c6f24e" fillOpacity="0.72" />
              </svg>
            </div>

            <ul className="required-inputs-branch required-inputs-branch--left">
              <li className="required-inputs-item required-inputs-item--1">
                <span className="required-inputs-item-text">Yıllık maaş veya saatlik ücret</span>
                <span className="required-inputs-item-icon" aria-hidden="true" />
              </li>
              <li className="required-inputs-item required-inputs-item--2">
                <span className="required-inputs-item-text">Haftalık kazanç</span>
                <span className="required-inputs-item-icon" aria-hidden="true" />
              </li>
              <li className="required-inputs-item required-inputs-item--3">
                <span className="required-inputs-item-text">Hizmet süresi (yıl ve ay)</span>
                <span className="required-inputs-item-icon" aria-hidden="true" />
              </li>
              <li className="required-inputs-item required-inputs-item--4">
                <span className="required-inputs-item-text">Çalışanın yaşı</span>
                <span className="required-inputs-item-icon" aria-hidden="true" />
              </li>
              <li className="required-inputs-item required-inputs-item--5">
                <span className="required-inputs-item-text">İstihdam türü ve pozisyonu</span>
                <span className="required-inputs-item-icon" aria-hidden="true" />
              </li>
            </ul>

            <ul className="required-inputs-branch required-inputs-branch--right">
              <li className="required-inputs-item required-inputs-item--6">
                <span className="required-inputs-item-icon" aria-hidden="true" />
                <span className="required-inputs-item-text">Şirketin kıdem tazminatı politikası</span>
              </li>
              <li className="required-inputs-item required-inputs-item--7">
                <span className="required-inputs-item-icon" aria-hidden="true" />
                <span className="required-inputs-item-text">İhbar süresi detayları</span>
              </li>
              <li className="required-inputs-item required-inputs-item--8">
                <span className="required-inputs-item-icon" aria-hidden="true" />
                <span className="required-inputs-item-text">Bonuslar veya kullanılmayan yıllık izin ödemeleri</span>
              </li>
              <li className="required-inputs-item required-inputs-item--9">
                <span className="required-inputs-item-icon" aria-hidden="true" />
                <span className="required-inputs-item-text">Kıdem tazminatı paketine dahil olan ek haklar</span>
              </li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="nasil-hesaplanir">
        <div className="how-steps-showcase">
          <header className="how-steps-head">
            <h2 className="how-steps-title">Kıdem Tazminatı Hesaplayıcısı Nasıl Kullanılır?</h2>
            <p className="how-steps-lead">
              Bu kıdem tazminatı hesaplayıcısını kolayca kullanabilirsiniz ve sadece birkaç adım gerektirir. Araç,
              finansal veya hukuki uzmanlığa ihtiyaç duymadan kullanıcılara hızlı sonuçlar vermek üzere tasarlanmıştır.
            </p>
            <p className="how-steps-sub">İşten ayrılma tazminatınızı hesaplamak için şu adımları izleyin:</p>
          </header>

          <ol className="how-steps-grid">
            <li className="how-steps-card how-steps-card--1">
              <span className="how-steps-badge">1</span>
              <span className="how-steps-icon" aria-hidden="true" />
              <p className="how-steps-card-text">Yıllık maaşınızı veya haftalık ücretinizi girin.</p>
            </li>
            <li className="how-steps-card how-steps-card--2">
              <span className="how-steps-badge">2</span>
              <span className="how-steps-icon" aria-hidden="true" />
              <p className="how-steps-card-text">Şirketteki toplam hizmet sürenizi ekleyin.</p>
            </li>
            <li className="how-steps-card how-steps-card--3">
              <span className="how-steps-badge">3</span>
              <span className="how-steps-icon" aria-hidden="true" />
              <p className="how-steps-card-text">Yaşa bağlı düzenlemeler uygulanıyorsa, yaşınızı girin.</p>
            </li>
            <li className="how-steps-card how-steps-card--4">
              <span className="how-steps-badge">4</span>
              <span className="how-steps-icon" aria-hidden="true" />
              <p className="how-steps-card-text">Bonuslar veya kullanılmamış izinler gibi ek tazminatları ekleyin.</p>
            </li>
            <li className="how-steps-card how-steps-card--5">
              <span className="how-steps-badge">5</span>
              <span className="how-steps-icon" aria-hidden="true" />
              <p className="how-steps-card-text">Biliniyorsa, şirketinizin kıdem tazminatı politikasını seçin.</p>
            </li>
            <li className="how-steps-card how-steps-card--6">
              <span className="how-steps-badge">6</span>
              <span className="how-steps-icon" aria-hidden="true" />
              <p className="how-steps-card-text">Tahmini tutarınızı anında oluşturmak için hesapla düğmesine tıklayın.</p>
            </li>
          </ol>

          <p className="how-steps-outro">
            Tüm adımları tamamladıktan sonra, hesap makinesi tahmini kıdem tazminatınız, toplam çalışma süreniz,
            nihai ödemeniz ve vergi kesintileriniz gibi tüm verilerinizi gösterir.
          </p>
        </div>
      </ContentSection>

      <ContentSection alt>
        <h2>İşten Çıkarma Tazminatınızın Sonuçlarını Anlamak</h2>
        <p>
          Hesaplamadan sonra, her sonucun ne anlama geldiğini anlamak önemlidir. Kıdem tazminatı paketleri genellikle
          nihai ödeme tutarınızı etkileyebilecek çeşitli tazminat bileşenlerini içerir. Sonuçlarınız şunları
          içerebilir:
        </p>
        <ul>
          <li>Maaş ve hizmet süresine göre hesaplanan temel kıdem tazminatı</li>
          <li>Yaş faktörleri dikkate alınarak hesaplanan ayarlanmış kıdem tazminatı</li>
          <li>Tahmini işten çıkarma tazminatı</li>
          <li>Haftalık veya iki haftalık ödeme tutarları</li>
          <li>Maksimum ödeme limitleri</li>
          <li>Toplam kıdem tazminatı haftası sayısı</li>
          <li>Ek haklar veya birikmiş ödemeler</li>
        </ul>
        <p>
          Haklarınızı doğru bir şekilde anladığınızda, rollerinizi ve sorumluluklarınızı, ayrıca kıdem tazminatı
          paketlerinizi daha verimli bir şekilde öğrenebilirsiniz.
        </p>
      </ContentSection>

      <ContentSection>
        <h2>Vergi Tahmini ve Nihai Ödeme</h2>
        <p>
          Kıdem tazminatı birçok ülkede genellikle vergilendirilebilir gelir olarak kabul edilir; bu da kesintilerin
          aslında alacağınız tutarı azaltabileceği anlamına gelir. Hesaplayıcımız vergileri tahmin etmenize ve
          kesintilerden sonra beklenen nihai ödemeniz hakkında daha net bir tablo sunmanıza yardımcı olur.
        </p>
        <p>Vergi tahminleri şunları içerebilir:</p>
        <ul>
          <li>Federal gelir vergisi stopajı</li>
          <li>Eyalet veya yerel vergiler</li>
          <li>Sosyal güvenlik veya maaş kesintileri</li>
          <li>Emeklilik katkı paylarının etkileri</li>
          <li>İşten çıkarma tazminatlarının vergi uygulaması</li>
        </ul>
      </ContentSection>

      <ContentSection alt>
        <h2>İşverenler Neden Kıdem Tazminatı Öder?</h2>
        <p>
          İşverenler, iş kanunlarına uymak, yasal anlaşmazlıkları azaltmak ve çalışanları iş değiştirme süreçlerinde
          desteklemek için kıdem tazminatı öderler. Birçok durumda, kıdem tazminatı çalışanlar için isteğe bağlı bir
          hak olmaktan ziyade yasal bir yükümlülüktür.
        </p>
        <p>Kıdem tazminatı paketleri işverenlere şu konularda yardımcı olur:</p>
        <ul>
          <li>İş mahkemesi uyuşmazlıklarını azaltın</li>
          <li>Şirketin itibarını koruyun</li>
          <li>Yasal uyumluluğu sağlayın</li>
          <li>İş gücü yeniden yapılandırmasını destekleyin</li>
          <li>Çalışanların daha sorunsuz ayrılmasını kolaylaştırın</li>
          <li>İşten çıkarma taleplerini verimli bir şekilde çözün</li>
        </ul>
        <p>
          Çalışanlar için kıdem tazminatı, yeni iş fırsatları ararken geçici mali destek sağlar. Ayrıca, ilgili
          kuruluşa uzun süre hizmet eden çalışanları da telafi edebilir. Bu nedenle, onlara yönelik bir tür takdir
          göstergesidir. Birçok şirket artık aşağıdaki işlemleri gerçekleştirmek için otomatik çalışan tazminatı
          hesaplama sistemleri ve e-devlet tazminat araçları kullanmaktadır:
        </p>
        <ul>
          <li>İşten çıkarma tazminatı + ihbar süresi hesaplamaları</li>
          <li>İhbar süresi hesaplamaları</li>
          <li>Hizmet süresi hesaplamaları</li>
          <li>Çalışma süresi hesaplamaları</li>
          <li>Çalışan alacakları hesaplamaları</li>
        </ul>
      </ContentSection>

      <ContentSection>
        <h2>Kıdem Tazminatı ile İşten Çıkarma Tazminatı Arasındaki Fark</h2>
        <p>
          İki terim de yaklaşık olarak aynı kabul edilir, ancak bu doğru değildir. Kıdem tazminatı genellikle kıdem,
          hizmet süresi ve fesih koşullarına dayalı tazminatı ifade eder. İşten çıkarma tazminatı ise özellikle bir
          çalışanın yeniden yapılanma, iş pozisyonunun ortadan kaldırılması veya operasyonel değişiklikler nedeniyle
          işini kaybetmesi durumunda geçerlidir.
        </p>
        <p>Temel farklılıklar şunlardır:</p>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Kıdem tazminatı</th>
              <th>İşten Çıkarma Ücreti</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hizmet yılına göre</td>
              <td>İşin ortadan kaldırılmasına dayalı</td>
            </tr>
            <tr>
              <td>Birden fazla fesih senaryosu için geçerlidir.</td>
              <td>Esas olarak iş gücü azaltımları için geçerlidir.</td>
            </tr>
            <tr>
              <td>İhbar tazminatı içerebilir</td>
              <td>Çoğunlukla işten çıkarılma tazminatlarını içerir.</td>
            </tr>
            <tr>
              <td>İş kanunları ve sözleşmeleriyle yönetilir.</td>
              <td>Temelde yeniden yapılandırma politikalarıyla ilgili.</td>
            </tr>
          </tbody>
        </table>
      </ContentSection>

      <ContentSection alt>
        <h2>İşten Çıkarma Tazminat Paketine Neler Dahildir?</h2>
        <p>
          İşten ayrılma tazminatı paketi, kıdem tazminatının ötesinde birden fazla finansal bileşeni içerebilir. Nihai
          paket, iş kanunlarına, şirket politikasına, iş sözleşmelerine ve fesih nedenine bağlıdır.
        </p>
        <p>Tipik bir işten ayrılma tazminatı paketi şunları içerebilir:</p>
        <ul>
          <li>İşten ayrılma tazminatı</li>
          <li>İhbar tazminatı</li>
          <li>Kullanılmayan yıllık izin tazminatı</li>
          <li>Bonus ödemeleri</li>
          <li>Teşvik ödemeleri</li>
          <li>Emeklilik tazminatı</li>
          <li>Ek çalışan alacakları</li>
        </ul>
        <p>
          Tavan tutarları genellikle Resmî Gazete güncellemelerinden ve hükümetin işgücü düzenlemelerinden alınır.
          Güvenilir kıdem tazminatı hesaplayıcımız, tazminat tahmininizin güncel yasal standartları ve çalışma
          kurallarını yansıtmasını sağlamaya yardımcı olur.
        </p>
      </ContentSection>

      <ContentSection>
        <h2>Kıdem Tazminatı Nasıl Hesaplanır?</h2>
        <p>
          İşten ayrılma tazminatı hesaplaması, hizmet süresi, brüt maaş, ihbar süresi hakları, ek haklar ve geçerli
          yasal tavanlar dahil olmak üzere birçok önemli faktöre dayanmaktadır. İşverenler genellikle tazminatı, iş
          kanunları, iş sözleşmeleri ve şirket politikaları kapsamında belirlenen formülleri kullanarak
          hesaplarlar.
        </p>
        <p>Gelişmiş işten ayrılma tazminatı hesaplayıcımız aşağıdaki işlemleri otomatik olarak gerçekleştirir:</p>
        <ul>
          <li>İşten ayrılma tazminatı hesaplaması</li>
          <li>İhbar tazminatı hesaplaması</li>
          <li>İhbar süresi hesaplaması</li>
          <li>Kıdem hesaplaması</li>
          <li>Emeklilik tazminatı hesaplaması</li>
          <li>Net maaş tazminatı hesaplaması</li>
          <li>İşten ayrılma tazminatı hesaplaması</li>
          <li>Çalışan alacakları hesaplaması</li>
        </ul>
        <p>
          Bu araç, çalışanların doğru tazminat tutarlarını anında tahmin etmelerine yardımcı olmak için güncellenmiş
          kıdem tazminatı hesaplama 2025 ve kıdem tazminatı hesaplama 2026 kurallarını desteklemektedir.
        </p>
      </ContentSection>

      <ContentSection alt>
        <h2>Standart Kıdem Tazminatı Formülü</h2>
        <p>
          Standart kıdem tazminatı formülü genellikle çalışanın brüt aylık maaşı ve toplam hizmet yılı kullanılarak
          hesaplanır. En yaygın kıdem tazminatı formülü şöyledir:
        </p>
        <p className="formula-text">Kıdem Tazminatı = 30 Günlük Brüt Ücret × Tam Hizmet Yılı</p>
        <p>
          Çalışanlar genellikle çalıştıkları her tamamlanmış yıl için 30 günlük brüt maaşa eşit tazminat kazanırlar.
          Bazı sistemlerde, tazminat hesaplamalarında şunlar kullanılabilir:
        </p>
        <ul>
          <li>İşten Çıkarma Tazminatı Hesaplaması (Mod 1)</li>
          <li>İşten Çıkarma Tazminatı Hesaplaması (Mod 2)</li>
          <li>Kıdem + İhbar Süresi Birleşik Hesaplaması (Mod 3)</li>
          <li>Net Maaş Tazminatı Hesaplaması (Mod 4)</li>
          <li>Brüt Maaş Tazminatı Hesaplaması (Mod 5)</li>
        </ul>
      </ContentSection>

      <ContentSection>
        <h2>Haftalık Maaş ve Günlük Ücret Hesaplamaları</h2>
        <p>
          İşten ayrılma tazminatı ve ihbar tazminatını doğru hesaplamak için, çalışanın aylık maaşı öncelikle haftalık
          ve günlük ücret değerlerine dönüştürülmelidir. Günlük ücret hesaplamaları, ihbar tazminatı hesaplamaları,
          kısmi hizmet süreleri, çıkış ücreti hesaplamaları, tazminat faizi hesaplamaları ve çalışma süresi
          hesaplamaları için önemlidir. Standart günlük ücret formülü şöyledir:
        </p>
        <p className="formula-text">Günlük Ücret = Aylık Brüt Maaş / 30</p>
        <p>Haftalık ücret hesaplamaları genellikle ihbar süresi hesaplamalarında kullanılır:</p>
        <p className="formula-text">Haftalık Ücret = Aylık Brüt Maaş × 12 / 52</p>
        <p>Bu değerler şunların belirlenmesine yardımcı olur:</p>
        <ul>
          <li>İhbar süresi</li>
          <li>Çalışan ihbar süreleri</li>
          <li>İhbar günü hesaplamaları</li>
          <li>İstifa ihbarı hesaplamaları</li>
          <li>İşten çıkarma sırasında tazminat</li>
        </ul>
      </ContentSection>

      <ContentSection alt>
        <h2>Temel Kıdem Tazminatı Hesaplaması</h2>
        <p>
          İşten ayrılma tazminatı, çalışanın brüt kazanç maaşı üzerinden hesaplanır. Bu, işveren tarafından sağlanan
          düzenli ücret ve tekrarlayan yan hakları içerir. İşten ayrılma tazminatı, aylık maaş ve seyahat ödenekleri,
          yemek ödemeleri, ikramiyeler, primler, teşvik ödemeleri ve düzenli sosyal haklar kapsar.
        </p>
        <p>
          Toplam hizmet süresi daha sonra düzeltilmiş brüt ücretle çarpılarak temel tazminat tutarı belirlenir. Doğru
          sonuçları belirleyebilmek için her zaman maaşınız ve diğer iş detaylarınızla ilgili doğru verileri kullanın.
        </p>
      </ContentSection>

      <ContentSection>
        <h2>Bildirim süresi</h2>
        <p>
          Uygun ihbar yapılmadan işten çıkarılan çalışanlar, yasal ihbar sürelerine göre ihbar tazminatına hak
          kazanabilirler. İş Kanunu&apos;nun 17. maddesi uyarınca ihbar süreleri genellikle şunlardır:
        </p>
        <ul>
          <li>2 hafta</li>
          <li>4 hafta</li>
          <li>6 hafta</li>
          <li>8 hafta</li>
        </ul>
        <p>
          Bu ihbar süreleri, toplam çalışma süresine bağlıdır ve doğru ihbar süresi hesaplaması ve ihbar tazminatı
          hesaplaması için gereklidir.
        </p>
      </ContentSection>

      <ContentSection alt>
        <h2>Kıdem Tazminatını Etkileyen Faktörler</h2>
        <p>İşte kıdem tazminatının hesaplanmasında önemli rol oynayan bazı faktörler.</p>
        <ul>
          <li>İşten ayrılma tazminatı hesaplaması</li>
          <li>İhbar tazminatı hesaplaması</li>
          <li>Kıdem hesaplaması</li>
          <li>Çalışan alacakları hesaplaması</li>
          <li>Emeklilik tazminatı hesaplaması</li>
          <li>İşten çıkarma tazminatı</li>
          <li>İhbar süresi hesaplaması</li>
        </ul>
        <p>
          Bu değişkenler, çalışanların mevcut 2025 ve 2026 kıdem tazminatı düzenlemeleri kapsamında alacakları
          tazminatı doğru bir şekilde tahmin etmelerine yardımcı olur.
        </p>
      </ContentSection>

      <ContentSection>
        <h2>İşten ayrılma tazminatı hesaplayıcımızı kullanmanın faydaları nelerdir?</h2>
        <p>Dönüştürücümüzü kullanmanız için bazı nedenler şunlardır:</p>
        <ul>
          <li>Doğru ve Anında</li>
          <li>Kullanımı Kolay</li>
          <li>Çalışanlar ve İK Ekipleri için Uygun</li>
          <li>Ücretsiz Çevrimiçi Kıdem Tazminatı Tahmin Aracı</li>
          <li>Hızlı ve Güvenilir bir araç</li>
        </ul>
      </ContentSection>

      <ContentSection alt>
        <h2>Özet</h2>
        <p>
          Çalışanlar, kıdem tazminatı paketini kabul etmeden önce kıdem tazminatı hesaplamalarını, vergi kesintilerini,
          tazminat haklarını ve ihbar tazminatını dikkatlice incelemelidir. Adil bir tazminat almak ve kıdem
          tazminatından sonraki mali adımları (işsizlik ödeneği, emeklilik planlaması ve gelecekteki iş fırsatları
          dahil) planlamak için yasal veya mali danışmanlık almalıdır.
        </p>
      </ContentSection>

      <section className="section alt" id="sss">
        <div className="container faq-wrap">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          <div className="faq-head">
            <h2>Sıkça Sorulan Sorular</h2>
          </div>

          <div className="faq-list">
            <div className="faq-col">{faqLeftColumn.map((faq) => renderFaqItem(faq))}</div>
            <div className="faq-col">{faqRightColumn.map((faq) => renderFaqItem(faq))}</div>
          </div>
        </div>
      </section>
    </>
  );
}
