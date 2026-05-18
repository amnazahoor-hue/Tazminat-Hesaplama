"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

const reasonNotes = {
  haksiz_fesih: "Hem kidem hem de ihbar tazminati hak edilir.",
  istifa_haksiz: "Hakli neden olmaksizin istifa halinde kidem ve ihbar hak edilmez.",
  istifa_hakli: "Hakli nedenle istifada kidem tazminati hak edilir.",
  emeklilik: "Emeklilik/askerlik/evlilik durumunda kidem hak edilir.",
  belirli_sureli: "Belirli sureli sozlesmenin dogal bitisinde tazminat hak edilmez.",
  anlasma: "Ikale durumunda kidem tutari anlasmaya gore degisir.",
  olum: "Vefat halinde kidem yasal mirascilara odenir."
};

const examples = [
  { title: "3 Yillik Calisan", startDate: "2021-01-01", endDate: "2023-12-31", grossSalary: "20.000,00" },
  { title: "5 Yil Tavan Altinda", startDate: "2019-01-01", endDate: "2024-01-01", grossSalary: "28.000,00" },
  { title: "10 Yil Tavan Uzerinde", startDate: "2014-01-01", endDate: "2024-01-01", grossSalary: "50.000,00" },
  {
    title: "1 Yil Asgari Ucret",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    grossSalary: "17.002,12",
    unusedLeaveDays: "6",
    overtime: "1.250,00"
  }
];

const faqItems = [
  {
    id: "q1",
    question: "Kidem tazminati nedir?",
    answer:
      "Kidem tazminati, isten ayrilan ve yasal kosullari saglayan calisana odenen bir tazminattir. Her tam hizmet yili icin 1 aylik brut ucret esas alinir ve Turk Is Hukuku'ndaki en onemli isci haklarindan biridir."
  },
  {
    id: "q2",
    question: "Calisan hangi durumda kidem tazminatina hak kazanir?",
    answer:
      "Calisanin ayni isverene en az 1 yil hizmet etmis olmasi gerekir. Ayrica isverenin haksiz feshi, emeklilik, askerlik, evlilik (kadin calisan icin 1 yil icinde) veya vefat gibi durumlar aranir. Hakli neden olmaksizin istifa eden calisan kidem tazminati alamaz."
  },
  {
    id: "q3",
    question: "Kidem tazminati tavani nedir?",
    answer:
      "Kidem tazminatinda her yil icin uygulanabilecek azami tutardir. 2024 yilinin ikinci yarisi icin bu tutar ₺41.828,42'dir. Brut ucret bu tutarin altindaysa tavan uygulanmaz; uzerindeyse her yil icin tavan tutari esas alinir."
  },
  {
    id: "q4",
    question: "Ihbar tazminati nedir, kidem tazminatindan farki nedir?",
    answer:
      "Ihbar tazminati, is sozlesmesi yasal bildirim suresine uyulmadan feshedildiginde dogan tazminattir. Kidem tazminati hizmet suresine; ihbar tazminati ise ihbar suresinin ucret karsiligina dayanir. Iki hak birbirinden bagimsizdir."
  },
  {
    id: "q5",
    question: "Istifa edince kidem tazminati alabilir miyim?",
    answer:
      "Hakli neden olmadan istifa eden calisan kidem tazminati alamaz. Ancak hakli nedenle fesihte (or. maas odememesi, mobbing, guvensiz calisma ortami - Is Kanunu Md. 24) kidem tazminati hakki dogar."
  },
  {
    id: "q6",
    question: "Kidem tazminati vergilendirilir mi?",
    answer:
      "Kidem tazminati yasal tavan dahilinde gelir vergisinden muaftir. Tavani asan kisim icin gelir vergisi gundeme gelebilir. Damga vergisi ise 2008 yilindan bu yana kidem tazminatinda uygulanmamaktadir."
  },
  {
    id: "q7",
    question: "Kullanilmayan yillik izinlerime ne olur?",
    answer:
      "Is sozlesmesi sona erdiginde birikmis ancak kullanilmamis yillik izin gunleri isveren tarafindan ucrete cevrilerek odenmelidir. Bu kural istifa, emeklilik veya isten cikarma dahil tum fesih turlerinde gecerlidir."
  },
  {
    id: "q8",
    question: "Hesaplama ne kadar dogru sonuc verir?",
    answer:
      "Hesaplama standart Is Kanunu formullerine ve guncel 2024 tavan tutarlarina dayanir. Ancak prim, ikramiye, yemek/yol yardimi gibi kalemler dahil edilmediginden nihai tutar farkli cikabilir. Baglayici hesap icin bir is hukuku avukati veya ISKUR gorusu alin."
  }
];

function formatDuration(s) {
  return `${s.yil} yil ${s.ay} ay ${s.gun} gun`;
}

export default function CompensationCalculator() {
  const [activeTab, setActiveTab] = useState("standart");
  const [form, setForm] = useState(() => ({
    ...initialForm,
    endDate: new Date().toISOString().split("T")[0]
  }));
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [openFaq, setOpenFaq] = useState("");
  const [cardTransform, setCardTransform] = useState("perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)");
  const cardRef = useRef(null);

  const preview = useMemo(() => {
    if (!result) {
      return {
        kidem: "85.250,00",
        ihbar: "28.416,67",
        toplam: "113.666,67",
        sure: "5 yil 3 ay",
        maas: "28.000,00",
        tavan: "Hayir"
      };
    }
    return {
      kidem: TR.money(result.kidemTazminati),
      ihbar: TR.money(result.ihbarTazminati),
      toplam: TR.money(result.toplamTazminat),
      sure: `${result.calismaSuresi.yil} yil ${result.calismaSuresi.ay} ay`,
      maas: TR.money(result.brutMaas),
      tavan: result.tavanUygulandi ? "Evet" : "Hayir"
    };
  }, [result]);

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

  const applyExample = (item) => {
    setForm((prev) => ({
      ...prev,
      startDate: item.startDate,
      endDate: item.endDate,
      grossSalary: item.grossSalary,
      reason: "haksiz_fesih",
      unusedLeaveDays: item.unusedLeaveDays || "0",
      overtime: item.overtime || "",
      otherReceivables: item.otherReceivables || ""
    }));
    setErrors({});
  };

  const runExampleCalculation = (item) => {
    const shouldUseDetailedTab = Boolean(
      (item.unusedLeaveDays && parseInt(item.unusedLeaveDays, 10) > 0) ||
      (item.overtime && TR.parseMoney(item.overtime) > 0) ||
      (item.otherReceivables && TR.parseMoney(item.otherReceivables) > 0)
    );
    setActiveTab(shouldUseDetailedTab ? "detayli" : "standart");
    applyExample(item);
    const payload = {
      startDate: item.startDate,
      endDate: item.endDate,
      grossSalary: TR.parseMoney(item.grossSalary),
      reason: "haksiz_fesih",
      weeklyDays: 5,
      unusedLeaveDays: parseInt(item.unusedLeaveDays || "0", 10),
      overtime: TR.parseMoney(item.overtime || ""),
      otherReceivables: TR.parseMoney(item.otherReceivables || "")
    };
    const v = validateForm(payload);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    const calc = calculateCompensation(payload);
    setResult(calc.error ? null : calc);
    document.getElementById("hesapla")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        `Girilen maas asgari ucretin (₺${TR.money(CONFIG.MIN_WAGE_2024)}) altinda. Devam edilsin mi?`
      )
    ) {
      return;
    }
    const calc = calculateCompensation(payload);
    setResult(calc.error ? null : calc);
  };

  const clear = () => {
    setForm({ ...initialForm, endDate: new Date().toISOString().split("T")[0] });
    setErrors({});
    setResult(null);
  };

  const copy = async () => {
    if (!result) return;
    const text = `TAZMINAT HESAPLAMA SONUCLARI\nCalisma Suresi: ${formatDuration(result.calismaSuresi)}\nKidem: ₺${TR.money(result.kidemTazminati)}\nIhbar: ₺${TR.money(result.ihbarTazminati)}\nToplam: ₺${TR.money(result.toplamTazminat)}`;
    await navigator.clipboard.writeText(text);
    window.alert("Sonuc kopyalandi.");
  };

  const handleCardMouseMove = (event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = (0.5 - (y / rect.height)) * 10;
    setCardTransform(
      `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
    );
  };

  const handleCardMouseLeave = () => {
    setCardTransform("perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)");
  };

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
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-left">
            <span className="badge">Ucretsiz Kidem Tazminati Hesaplama</span>
            <h1>
              Kidem Tazminatinizi
              <br />
              <span className="hero-highlight">Aninda Hesaplayin</span>
            </h1>
            <p className="hero-copy">
              Ise giris tarihi, cikis tarihi ve brut maasinizi girin; 4857 sayili Is Kanunu&apos;na gore
              kidem ve ihbar tazminatinizi aninda hesaplayin. Ucretsiz, kayit gerektirmez, tarayicinizda
              calisir.
            </p>
            <div className="hero-actions">
              <a href="/#hesapla" className="hero-btn hero-btn-primary">
                Hesaplamaya Basla <span aria-hidden="true">→</span>
              </a>
              <a href="/#nasil-hesaplanir" className="hero-btn hero-btn-ghost">
                Nasil Hesaplanir?
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat-card">
                <strong>4857</strong>
                <span>IS KANUNU NO.</span>
              </div>
              <div className="hero-stat-card">
                <strong>100%</strong>
                <span className="hero-stat-sub hero-stat-subline">FREE UCRETSIZ</span>
              </div>
              <div className="hero-stat-card">
                <strong>2024</strong>
                <span>GUNCEL TAVAN</span>
              </div>
            </div>
          </div>

          <div
            className="preview-card preview-card-animated"
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{ transform: cardTransform }}
          >
            <span className="preview-live">CANLI ONIZLEME</span>
            <p className="preview-kicker">TAHMINI SONUC</p>
            <h3>Kidem ve Ihbar Tazminati</h3>
            <div className="preview-row">
              <span>Kidem Tazminati</span>
              <strong>₺{preview.kidem}</strong>
            </div>
            <div className="preview-row">
              <span>Ihbar Tazminati</span>
              <strong>₺{preview.ihbar}</strong>
            </div>
            <div className="preview-total">
              <span>Toplam Tazminat</span>
              <strong>₺{preview.toplam}</strong>
            </div>
            <div className="preview-meta">
              <div>
                <span>Calisma Suresi</span>
                <strong>{preview.sure}</strong>
              </div>
              <div>
                <span>Brut Maas</span>
                <strong>₺{preview.maas}</strong>
              </div>
              <div>
                <span>Tavan Uygulamasi</span>
                <strong>{preview.tavan}</strong>
              </div>
              <div>
                <span>Son Guncelleme</span>
                <strong>{CONFIG.CEILING.lastUpdated}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="hesapla">
        <div className="container">
          <h2>Tazminat Hesaplama</h2>
          <div className="tabs">
            <button
              type="button"
              className={activeTab === "standart" ? "active" : ""}
              onClick={() => setActiveTab("standart")}
            >
              Standart
            </button>
            <button
              type="button"
              className={activeTab === "detayli" ? "active" : ""}
              onClick={() => setActiveTab("detayli")}
            >
              Detayli
            </button>
          </div>

          <form className="calc-form" onSubmit={submit}>
            <div className="grid">
              <label>
                Ise Giris Tarihi
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => onChange("startDate", e.target.value)}
                />
                {errors.giris && <small className="error">{errors.giris}</small>}
              </label>
              <label>
                Isten Cikis Tarihi
                <input type="date" value={form.endDate} onChange={(e) => onChange("endDate", e.target.value)} />
                {errors.cikis && <small className="error">{errors.cikis}</small>}
              </label>
              <label className="full">
                Son Brut Aylik Maas (₺)
                <input
                  type="text"
                  value={form.grossSalary}
                  onChange={(e) => onChange("grossSalary", e.target.value)}
                  onBlur={(e) => {
                    const n = TR.parseMoney(e.target.value);
                    if (n > 0) onChange("grossSalary", TR.money(n));
                  }}
                  placeholder="28.000,00"
                />
                <div className="chips">
                  {["17.002,12", "20.000,00", "25.000,00", "30.000,00", "40.000,00", "50.000,00"].map((m) => (
                    <button key={m} type="button" className="chip" onClick={() => onChange("grossSalary", m)}>
                      ₺{m}
                    </button>
                  ))}
                </div>
                {errors.maas && <small className="error">{errors.maas}</small>}
              </label>
              <label>
                Isten Cikis Nedeni
                <select value={form.reason} onChange={(e) => onChange("reason", e.target.value)}>
                  <option value="haksiz_fesih">Isveren tarafindan haksiz fesih</option>
                  <option value="istifa_haksiz">Istifa - hakli neden olmaksizin</option>
                  <option value="istifa_hakli">Istifa - hakli nedenle</option>
                  <option value="emeklilik">Emeklilik / Askerlik / Evlilik</option>
                  <option value="belirli_sureli">Belirli sureli sozlesme sonu</option>
                  <option value="anlasma">Karsilikli anlasma (ikale)</option>
                  <option value="olum">Vefat</option>
                </select>
                <small>{reasonNotes[form.reason]}</small>
              </label>
              <label>
                Haftalik Calisma Gunu
                <select value={form.weeklyDays} onChange={(e) => onChange("weeklyDays", e.target.value)}>
                  <option value="5">5 gun</option>
                  <option value="6">6 gun</option>
                </select>
              </label>
              {activeTab === "detayli" && (
                <>
                  <label>
                    Kullanilmamis Yillik Izin (gun)
                    <input
                      type="number"
                      min={0}
                      value={form.unusedLeaveDays}
                      onChange={(e) => onChange("unusedLeaveDays", e.target.value)}
                    />
                  </label>
                  <label>
                    Fazla Mesai Alacagi (₺)
                    <input type="text" value={form.overtime} onChange={(e) => onChange("overtime", e.target.value)} />
                  </label>
                  <label className="full">
                    Diger Alacaklar (₺)
                    <input
                      type="text"
                      value={form.otherReceivables}
                      onChange={(e) => onChange("otherReceivables", e.target.value)}
                    />
                  </label>
                </>
              )}
            </div>
            <div className="actions">
              <button type="submit">Tazminati Hesapla</button>
              <button type="button" onClick={clear}>
                Temizle
              </button>
              <button type="button" onClick={() => window.print()}>
                Yazdir
              </button>
              <button type="button" onClick={copy} disabled={!result}>
                Sonucu Kopyala
              </button>
            </div>
          </form>

          {result && (
            <div className="results">
              <h3>Hesaplama Sonuclari</h3>
              <p>
                {result.iseGirisTarihi} - {result.istenCikisTarihi} / {formatDuration(result.calismaSuresi)}
              </p>
              <p className="result-disclaimer" role="note" aria-label="Yasal bilgilendirme">
                Bu sonuc yalnizca bilgilendirme amaclidir. Toplu is sozlesmesi, mahkeme karari veya ozel
                sozlesme sartlari nihai tutari degistirebilir.
              </p>
              <div className="result-cards">
                <article>
                  <h4>Kidem Tazminati</h4>
                  <strong>₺{TR.money(result.kidemTazminati)}</strong>
                </article>
                <article>
                  <h4>Ihbar Tazminati</h4>
                  <strong>₺{TR.money(result.ihbarTazminati)}</strong>
                </article>
                <article>
                  <h4>Toplam Tazminat</h4>
                  <strong>₺{TR.money(result.toplamTazminat)}</strong>
                </article>
              </div>

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
                    <td>Kidem Tazminati</td>
                    <td>
                      ₺{TR.money(Math.min(result.brutMaas, result.tavanTutari))} x {result.totalYears.toFixed(2)} yil
                    </td>
                    <td>₺{TR.money(result.kidemTazminati)}</td>
                  </tr>
                  <tr>
                    <td>Ihbar Tazminati</td>
                    <td>
                      (₺{TR.money(result.brutMaas)} / 30) x {result.ihbarSuresi} gun
                    </td>
                    <td>₺{TR.money(result.ihbarTazminati)}</td>
                  </tr>
                  {activeTab === "detayli" && result.unusedLeaveDays > 0 && (
                    <tr>
                      <td>Kullanilmamis Izin</td>
                      <td>(₺{TR.money(result.brutMaas)} / 30) x {result.unusedLeaveDays} gun</td>
                      <td>₺{TR.money(result.unusedLeavePay)}</td>
                    </tr>
                  )}
                  <tr>
                    <td>Toplam</td>
                    <td />
                    <td>₺{TR.money(result.toplamTazminat)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="section alt" id="nasil-hesaplanir">
        <div className="container how-wrap">
          <div className="how-head">
            <span className="how-eyebrow">ADIM ADIM REHBER</span>
            <h2>
              Nasil <span>hesaplanir?</span>
            </h2>
            <p>Kidem ve ihbar tazminati hesaplamasi 3 basit adimda tamamlanir</p>
          </div>
          <div className="how-grid">
            <article className="how-card">
              <div className="how-num">01</div>
              <span className="how-icon">📅</span>
              <h3>Tarihleri Girin</h3>
              <p>
                Ise giris ve cikis tarihlerinizi girin. Sistem calisma suresini yil, ay ve gun bazinda
                otomatik hesaplar.
              </p>
            </article>
            <article className="how-card">
              <div className="how-num">02</div>
              <span className="how-icon">💲</span>
              <h3>Maas Bilgisi Girin</h3>
              <p>
                Son brut maasinizi ve cikis nedeninizi secin. Hizli secim butonlari ile kolayca veri
                girebilirsiniz.
              </p>
            </article>
            <article className="how-card">
              <div className="how-num">03</div>
              <span className="how-icon">📊</span>
              <h3>Sonucu Gorun</h3>
              <p>
                Kidem ve ihbar tazminati Is Kanunu formulune gore aninda hesaplanir. Sonucu yazdirabilir
                veya kopyalayabilirsiniz.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="tazminat-turleri">
        <div className="container types-wrap">
          <div className="types-head">
            <span className="types-eyebrow">BILGI MERKEZI</span>
            <h2>
              Tazminat <span>Turleri</span>
            </h2>
            <p>Turk Is Hukuku&apos;nda one cikan temel tazminat turleri</p>
          </div>
          <div className="types-grid">
            <article className="type-card">
              <span className="type-tag">📜 IS KANUNU MD. 14</span>
              <h3>Kidem Tazminati</h3>
              <div className="type-sub">Kidem Tazminati</div>
              <dl className="type-facts">
                <div>
                  <dt>TANIM</dt>
                  <dd>Hak kazanan isciye, her tam hizmet yili icin 1 aylik brut ucret tutarinda odenen tazminattir.</dd>
                </div>
                <div>
                  <dt>HUKUKI DAYANAK</dt>
                  <dd>1475 sayili Kanun Md. 14 ve ilgili yargi ictihatlari.</dd>
                </div>
                <div>
                  <dt>KOSUL</dt>
                  <dd>En az 1 yil kidem ve uygun fesih nedeni.</dd>
                </div>
                <div>
                  <dt>FORMUL</dt>
                  <dd>Brut Ucret x Kidem Yili (tavan uygulanarak).</dd>
                </div>
              </dl>
            </article>
            <article className="type-card">
              <span className="type-tag">📜 IS KANUNU MD. 17</span>
              <h3>Ihbar Tazminati</h3>
              <div className="type-sub">Ihbar Tazminati</div>
              <dl className="type-facts">
                <div>
                  <dt>TANIM</dt>
                  <dd>Bildirim suresine uyulmadan fesih yapildiginda odenen tazminattir.</dd>
                </div>
                <div>
                  <dt>HUKUKI DAYANAK</dt>
                  <dd>4857 sayili Is Kanunu Md. 17.</dd>
                </div>
                <div>
                  <dt>KOSUL</dt>
                  <dd>Ihbar surelerine uyulmaksizin fesih.</dd>
                </div>
                <div>
                  <dt>SURE</dt>
                  <dd>Kideme gore 2 ila 8 hafta arasi.</dd>
                </div>
              </dl>
            </article>
            <article className="type-card">
              <span className="type-tag">📜 IS KANUNU MD. 59</span>
              <h3>Yillik Izin Ucreti</h3>
              <div className="type-sub">Yillik Izin Alacagi</div>
              <dl className="type-facts">
                <div>
                  <dt>TANIM</dt>
                  <dd>Kullanilmamis izin gunleri, is sozlesmesi sona erdiginde ucrete donusur.</dd>
                </div>
                <div>
                  <dt>HUKUKI DAYANAK</dt>
                  <dd>4857 sayili Is Kanunu Md. 59.</dd>
                </div>
                <div>
                  <dt>KOSUL</dt>
                  <dd>Fesih sekli fark etmeksizin kullanilmamis izin bulunmasi.</dd>
                </div>
                <div>
                  <dt>FORMUL</dt>
                  <dd>(Brut Maas / 30) x Kullanilmayan Izin Gunu.</dd>
                </div>
              </dl>
            </article>
            <article className="type-card">
              <span className="type-tag">📜 IS KANUNU MD. 17/6</span>
              <h3>Kotu Niyet Tazminati</h3>
              <div className="type-sub">Kotu Niyet Tazminati</div>
              <dl className="type-facts">
                <div>
                  <dt>TANIM</dt>
                  <dd>Isverenin kotu niyetli fesihlerinde dogabilen ilave tazminattir.</dd>
                </div>
                <div>
                  <dt>HUKUKI DAYANAK</dt>
                  <dd>4857 sayili Is Kanunu Md. 17/6.</dd>
                </div>
                <div>
                  <dt>KOSUL</dt>
                  <dd>Kotu niyet unsurunun hukuki olarak ortaya konmasi.</dd>
                </div>
                <div>
                  <dt>TUTAR</dt>
                  <dd>Kosullara gore ihbar tazminatinin 3 kati seviyesine ulasabilir.</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt" id="ornekler">
        <div className="container examples-wrap">
          <div className="examples-head">
            <span className="examples-eyebrow">PRAKTIK SENARYOLAR</span>
            <h2>Hesaplama Ornekleri</h2>
            <p>Farkli calisma sureleri ve brut maaslara gore hazirlanmis hizli ornek senaryolar.</p>
          </div>
          <div className="examples-grid">
            {examples.map((item) => (
              <article className="example-card" key={item.title}>
                <span className="example-tag">ORNEK SENARYO</span>
                <h3>{item.title}</h3>
                <dl className="example-facts">
                  <div>
                    <dt>Ise Giris</dt>
                    <dd>{item.startDate}</dd>
                  </div>
                  <div>
                    <dt>Isten Cikis</dt>
                    <dd>{item.endDate}</dd>
                  </div>
                  <div>
                    <dt>Brut Maas</dt>
                    <dd>₺{item.grossSalary}</dd>
                  </div>
                </dl>
                <button type="button" className="example-btn" onClick={() => runExampleCalculation(item)}>
                  Bu Degerlerle Hesapla →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="sss">
        <div className="container faq-wrap">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
          <div className="faq-head">
            <span className="faq-eyebrow">SSS</span>
            <h2>Sikca Sorulan Sorular</h2>
            <p>Kidem, ihbar ve izin alacaklari hakkinda en cok merak edilen sorular.</p>
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
