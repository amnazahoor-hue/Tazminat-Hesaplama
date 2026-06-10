export const CONFIG = {
  CEILING: { current: 64948.77, lastUpdated: "01.01.2026" },
  MIN_WAGE_2024: 22104.67,
  NOTICE_PERIODS: [
    { maxMonths: 6, days: 14, label: "2 hafta" },
    { maxMonths: 18, days: 28, label: "4 hafta" },
    { maxMonths: 36, days: 42, label: "6 hafta" },
    { maxMonths: Infinity, days: 56, label: "8 hafta" }
  ]
};

export const TR = {
  money: (n) =>
    Number.isFinite(n)
      ? n.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      : "0,00",
  parseMoney: (s) => {
    if (typeof s === "number") return s;
    if (!s) return 0;
    const c = String(s).replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "");
    const n = parseFloat(c);
    return Number.isFinite(n) ? n : 0;
  },
  date: (d) => {
    if (!d) return "";
    const dt = d instanceof Date ? d : new Date(d);
    if (Number.isNaN(dt.getTime())) return "";
    return `${String(dt.getDate()).padStart(2, "0")}.${String(dt.getMonth() + 1).padStart(2, "0")}.${dt.getFullYear()}`;
  }
};

/** Yıllık performans primi ödeme sayısı (ör. 5.000 TL × 3 = 15.000 TL yıllık bonus). */
export const BONUS_PAYMENTS_PER_YEAR = 3;

export function validateForm(data) {
  const errors = {};
  if (!data.startDate) errors.giris = "Lutfen ise giris tarihini girin.";
  if (!data.endDate) errors.cikis = "Lutfen isten cikis tarihini girin.";
  if (data.startDate && data.endDate && new Date(data.endDate) <= new Date(data.startDate)) {
    errors.cikis = "Isten cikis tarihi ise giris tarihinden sonra olmalidir.";
  }
  if (!data.grossSalary || data.grossSalary <= 0) errors.maas = "Lutfen gecerli bir brut maas tutari girin.";
  return errors;
}

/**
 * Düzenlenmiş brüt ücret: maaş + düzenli yan haklar (yemek, ulaşım, aylık prim payı).
 * Günlük ücret = Aylık brüt / 30 | Haftalık ücret = Aylık brüt × 12 / 52
 */
export function buildEffectiveGross(data) {
  const grossSalary = data.grossSalary || 0;
  const monthlyMeal = data.mealAllowance || 0;
  const monthlyTravel = data.travelAllowance || 0;
  const performanceBonus = data.performanceBonus || 0;
  const bonusPaymentsPerYear = data.bonusPaymentsPerYear || BONUS_PAYMENTS_PER_YEAR;
  const annualBonus =
    data.annualBonus > 0 ? data.annualBonus : performanceBonus * bonusPaymentsPerYear;
  const monthlyBonus = annualBonus / 12;
  const adjustedGross = grossSalary + monthlyMeal + monthlyTravel + monthlyBonus;

  return {
    grossSalary,
    monthlyMeal,
    monthlyTravel,
    monthlyBonus,
    annualBonus,
    performanceBonus,
    bonusPaymentsPerYear,
    adjustedGross,
    dailyGross: adjustedGross / 30,
    weeklyGross: (adjustedGross * 12) / 52
  };
}

export function getNoticePeriod(totalMonths) {
  return CONFIG.NOTICE_PERIODS.find((p) => totalMonths <= p.maxMonths) || CONFIG.NOTICE_PERIODS[3];
}

function getServiceDuration(start, end) {
  const totalDays = Math.floor((end - start) / 86400000);

  let yr = end.getFullYear() - start.getFullYear();
  let mo = end.getMonth() - start.getMonth();
  let dy = end.getDate() - start.getDate();
  if (dy < 0) {
    mo -= 1;
    dy += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (mo < 0) {
    yr -= 1;
    mo += 12;
  }

  const fullYears = Math.floor(totalDays / 365);
  const remDays = totalDays % 365;
  const totalYears = fullYears + remDays / 365;
  const totalMonths = totalDays / 30.4375;

  return { totalDays, calismaSuresi: { yil: yr, ay: mo, gun: dy }, totalYears, totalMonths };
}

/**
 * Kıdem ve ihbar hesabı — İş Kanunu Md. 17 ve 4857.
 * Kıdem = 30 günlük brüt ücret × hizmet yılı (tavan uygulanır).
 * İhbar = günlük ücret × ihbar süresi (gün).
 */
export function calculateCompensation(data, options = {}) {
  const { kidemUseAdjustedGross = true } = options;
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const service = getServiceDuration(start, end);
  const { totalDays, calismaSuresi, totalYears, totalMonths } = service;

  if (totalDays < 0) return { error: "Cikis tarihi giris tarihinden sonra olmalidir." };

  const eligibility = {
    haksiz_fesih: {
      kidem: true,
      ihbar: true,
      note: "Isveren tarafindan haksiz fesih - kidem ve ihbar tazminati hak edilir."
    },
    istifa_haksiz: {
      kidem: false,
      ihbar: false,
      note: "Hakli neden olmaksizin istifa - kidem ve ihbar tazminati hak edilmez."
    },
    istifa_hakli: {
      kidem: true,
      ihbar: false,
      note: "Hakli nedenle istifa (Is Kanunu Md. 24) - kidem tazminati hak edilir."
    },
    emeklilik: {
      kidem: true,
      ihbar: false,
      note: "Emeklilik/Askerlik/Evlilik - kidem tazminati hak edilir."
    },
    belirli_sureli: {
      kidem: false,
      ihbar: false,
      note: "Belirli sureli sozlesmenin dogal sona ermesi - tazminat hak edilmez."
    },
    anlasma: {
      kidem: true,
      ihbar: false,
      note: "Karsilikli anlasma (ikale) - kidem genellikle hak edilir."
    },
    olum: {
      kidem: true,
      ihbar: false,
      note: "Vefat - kidem tazminati yasal mirascilara odenir."
    }
  };

  const wages = buildEffectiveGross(data);
  const eligibilityResult = eligibility[data.reason] || eligibility.haksiz_fesih;
  const ceiling = CONFIG.CEILING.current;
  const kidemBase = kidemUseAdjustedGross ? wages.adjustedGross : wages.grossSalary;
  const ceilingApplied = kidemBase > ceiling;
  const effectiveRate = Math.min(kidemBase, ceiling);
  const kidem =
    eligibilityResult.kidem && totalDays >= 365 ? effectiveRate * totalYears : 0;

  const notice = getNoticePeriod(totalMonths);
  const ihbar = eligibilityResult.ihbar ? wages.dailyGross * notice.days : 0;
  const leavePay = wages.dailyGross * (data.unusedLeaveDays || 0);
  const total = kidem + ihbar + leavePay + (data.overtime || 0) + (data.otherReceivables || 0);

  return {
    iseGirisTarihi: TR.date(data.startDate),
    istenCikisTarihi: TR.date(data.endDate),
    calismaSuresi,
    totalDays,
    totalYears,
    totalMonths,
    brutMaas: wages.grossSalary,
    duzenlenmisBrutMaas: wages.adjustedGross,
    gunlukUcret: wages.dailyGross,
    haftalikUcret: wages.weeklyGross,
    kidemBazTutari: effectiveRate,
    cikisSebebi: data.reason,
    eligNote: eligibilityResult.note,
    kidemTazminati: kidem,
    ihbarTazminati: ihbar,
    ihbarSuresi: notice.days,
    ihbarSuresiLabel: notice.label,
    tavanUygulandi: ceilingApplied && eligibilityResult.kidem && totalDays >= 365,
    tavanTutari: ceiling,
    unusedLeavePay: leavePay,
    unusedLeaveDays: data.unusedLeaveDays || 0,
    overtime: data.overtime || 0,
    otherReceivables: data.otherReceivables || 0,
    toplamTazminat: total,
    wages
  };
}

export function calculateNoticePay({ startDate, endDate, totalMonthsInput, grossSalary, mealAllowance = 0, travelAllowance = 0, performanceBonus = 0, annualBonus = 0 }) {
  const wages = buildEffectiveGross({
    grossSalary,
    mealAllowance,
    travelAllowance,
    performanceBonus,
    annualBonus
  });
  let totalMonths = totalMonthsInput || 0;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.floor((end - start) / 86400000);
    if (totalDays <= 0) return { error: "Cikis tarihi giris tarihinden sonra olmalidir." };
    totalMonths = totalDays / 30.4375;
  }

  const notice = getNoticePeriod(totalMonths);
  const amount = wages.dailyGross * notice.days;
  return {
    totalMonths,
    noticeDays: notice.days,
    noticeLabel: notice.label,
    noticePay: amount,
    dailyGross: wages.dailyGross,
    weeklyGross: wages.weeklyGross
  };
}

export function calculateUnusedLeavePay({ grossSalary, unusedLeaveDays, mealAllowance = 0, travelAllowance = 0, performanceBonus = 0, annualBonus = 0 }) {
  const wages = buildEffectiveGross({
    grossSalary,
    mealAllowance,
    travelAllowance,
    performanceBonus,
    annualBonus
  });
  const amount = wages.dailyGross * unusedLeaveDays;
  return {
    dailyGross: wages.dailyGross,
    amount
  };
}

/**
 * Toplam tazminat değeri = Yıllık maaş + Bonuslar + Ödenekler + Kıdem tazminatı.
 * Kıdem satırı tablo örneğine uygun olarak temel maaş üzerinden hesaplanır.
 */
export function calculateTotalCompensation(data) {
  const base = calculateCompensation(data, { kidemUseAdjustedGross: false });
  if (base.error) return base;

  const { wages } = base;
  const yillikMaas = wages.grossSalary * 12;
  const yillikYemek = wages.monthlyMeal * 12;
  const yillikUlasim = wages.monthlyTravel * 12;
  const bonuslar = wages.annualBonus;
  const cikisOdemePaketi = base.toplamTazminat;
  const toplamTazminatDegeri =
    yillikMaas + bonuslar + yillikYemek + yillikUlasim + base.kidemTazminati;

  return {
    ...base,
    performanceBonus: wages.performanceBonus,
    bonusPaymentsPerYear: wages.bonusPaymentsPerYear,
    bonuslar,
    monthlyMeal: wages.monthlyMeal,
    monthlyTravel: wages.monthlyTravel,
    yillikMaas,
    yillikYemek,
    yillikUlasim,
    cikisOdemePaketi,
    toplamTazminatDegeri
  };
}
