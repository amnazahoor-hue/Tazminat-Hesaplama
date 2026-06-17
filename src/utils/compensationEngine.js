/**
 * Turkish severance & notice compensation engine (İş Kanunu 4857).
 * Single source of truth — all calculators must use these functions.
 */

/** Güncel kıdem tazminatı tavanı (aylık brüt) — dönem değişince burayı güncelleyin. */
export const KIDEM_TAVANI = 41200.0;

/** Kıdem brüt hesabında kullanılan yıl gün sayısı (tam gün / 365,25). */
export const SEVERANCE_DAYS_DIVISOR = 365.25;

export const STAMP_TAX_RATE = 0.00759;
export const INCOME_TAX_RATE_DEFAULT = 0.15;
export const BONUS_PAYMENTS_PER_YEAR = 3;

export const CONFIG = {
  CEILING: { current: KIDEM_TAVANI, lastUpdated: "01.01.2026" },
  MIN_WAGE_2024: 22104.67,
  NOTICE_PERIODS: [
    { maxMonths: 6, days: 14, label: "2 hafta" },
    { maxMonths: 18, days: 28, label: "4 hafta" },
    { maxMonths: 36, days: 42, label: "6 hafta" },
    { maxMonths: Infinity, days: 56, label: "8 hafta" }
  ],
  TAX: {
    STAMP_RATE: STAMP_TAX_RATE,
    INCOME_TAX_RATE_DEFAULT
  }
};

/** @typedef {'haksiz_fesih'|'istifa_haksiz'|'istifa_hakli'|'emeklilik'|'belirli_sureli'|'anlasma'|'olum'} LeavingReason */

/**
 * @typedef {Object} CompensationInput
 * @property {string} startDate
 * @property {string} endDate
 * @property {number} grossSalary
 * @property {LeavingReason} reason
 * @property {number} [mealAllowance]
 * @property {number} [travelAllowance]
 * @property {number} [performanceBonus]
 * @property {number} [annualBonus]
 * @property {number} [bonusPaymentsPerYear]
 * @property {number} [unusedLeaveDays]
 * @property {number} [overtime]
 * @property {number} [otherReceivables]
 */

/**
 * @typedef {Object} WageBreakdown
 * @property {number} grossSalary
 * @property {number} monthlyMeal
 * @property {number} monthlyTravel
 * @property {number} monthlyBonus
 * @property {number} annualBonus
 * @property {number} performanceBonus
 * @property {number} bonusPaymentsPerYear
 * @property {number} integratedGross
 * @property {number} dailyGross
 * @property {number} weeklyGross
 */

/**
 * @typedef {Object} CompensationResult
 * @property {string} iseGirisTarihi
 * @property {string} istenCikisTarihi
 * @property {{ yil: number, ay: number, gun: number }} calismaSuresi
 * @property {number} totalDays
 * @property {number} totalYears
 * @property {number} totalMonths
 * @property {number} brutMaas
 * @property {number} entegreBrutMaas
 * @property {number} duzenlenmisBrutMaas
 * @property {number} gunlukUcret
 * @property {number} haftalikUcret
 * @property {number} kidemBazTutari
 * @property {LeavingReason} cikisSebebi
 * @property {string} eligNote
 * @property {string|null} compensationWarning
 * @property {number} brutKidemTazminati
 * @property {number} netKidemTazminati
 * @property {number} kidemDamgaVergisi
 * @property {number} brutIhbarTazminati
 * @property {number} netIhbarTazminati
 * @property {number} ihbarDamgaVergisi
 * @property {number} ihbarGelirVergisi
 * @property {number} ihbarSuresi
 * @property {string} ihbarSuresiLabel
 * @property {boolean} tavanUygulandi
 * @property {number} tavanTutari
 * @property {number} unusedLeavePay
 * @property {number} unusedLeaveDays
 * @property {number} overtime
 * @property {number} otherReceivables
 * @property {number} ekAlacaklarToplami
 * @property {number} toplamTazminat
 * @property {WageBreakdown} wages
 * @property {number} kidemTazminati
 * @property {number} ihbarTazminati
 */

const ELIGIBILITY = {
  haksiz_fesih: {
    kidem: true,
    ihbar: true,
    note: "İşten çıkarılma (işveren feshi) — kıdem ve ihbar tazminatı hak edilir."
  },
  istifa_haksiz: {
    kidem: false,
    ihbar: false,
    note: "Haklı neden olmaksızın istifa — kıdem ve ihbar tazminatı hak edilmez.",
    warning:
      "İstifa - haklı neden olmaksızın seçildiği için kıdem ve ihbar tazminatı 0,00 TL olarak hesaplanmıştır."
  },
  istifa_hakli: {
    kidem: true,
    ihbar: false,
    note: "Haklı nedenle istifa (İş Kanunu Md. 24) — kıdem tazminatı hak edilir; ihbar tazminatı ödenmez."
  },
  emeklilik: {
    kidem: true,
    ihbar: false,
    note: "Emeklilik / askerlik / evlilik — kıdem tazminatı hak edilir."
  },
  belirli_sureli: {
    kidem: false,
    ihbar: false,
    note: "Belirli süreli sözleşmenin doğal sona ermesi — tazminat hak edilmez.",
    warning:
      "Belirli süreli sözleşme sonu seçildiği için kıdem ve ihbar tazminatı 0,00 TL olarak hesaplanmıştır."
  },
  anlasma: {
    kidem: true,
    ihbar: false,
    note: "Karşılıklı anlaşma (ikale) — kıdem genellikle hak edilir."
  },
  olum: {
    kidem: true,
    ihbar: false,
    note: "Vefat — kıdem tazminatı yasal mirasçılara ödenir."
  }
};

function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

/**
 * Giydirilmiş (entegre) aylık brüt ücret.
 * @param {CompensationInput} data
 * @returns {WageBreakdown}
 */
export function buildIntegratedWages(data) {
  const grossSalary = data.grossSalary || 0;
  const monthlyMeal = data.mealAllowance || 0;
  const monthlyTravel = data.travelAllowance || 0;
  const performanceBonus = data.performanceBonus || 0;
  const bonusPaymentsPerYear = data.bonusPaymentsPerYear || BONUS_PAYMENTS_PER_YEAR;
  const annualBonus =
    data.annualBonus > 0 ? data.annualBonus : performanceBonus * bonusPaymentsPerYear;
  const monthlyBonus = annualBonus / 12;
  const integratedGross = grossSalary + monthlyMeal + monthlyTravel + monthlyBonus;

  return {
    grossSalary,
    monthlyMeal,
    monthlyTravel,
    monthlyBonus,
    annualBonus,
    performanceBonus,
    bonusPaymentsPerYear,
    integratedGross,
    dailyGross: integratedGross / 30,
    weeklyGross: (integratedGross * 12) / 52
  };
}

/** @deprecated Use buildIntegratedWages */
export const buildEffectiveGross = buildIntegratedWages;

export function getNoticePeriod(totalMonths) {
  if (totalMonths < 6) return CONFIG.NOTICE_PERIODS[0];
  if (totalMonths < 18) return CONFIG.NOTICE_PERIODS[1];
  if (totalMonths < 36) return CONFIG.NOTICE_PERIODS[2];
  return CONFIG.NOTICE_PERIODS[3];
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

  return {
    totalDays,
    calismaSuresi: { yil: yr, ay: mo, gun: dy },
    totalYears: totalDays / SEVERANCE_DAYS_DIVISOR,
    totalMonths: totalDays / 30.4375
  };
}

function calcStampTax(gross) {
  return roundMoney(gross * STAMP_TAX_RATE);
}

function calcNetKidem(brut) {
  if (brut <= 0) return { brut: 0, damga: 0, net: 0 };
  const damga = calcStampTax(brut);
  return { brut, damga, net: roundMoney(brut - damga) };
}

function calcNetIhbar(brut) {
  if (brut <= 0) return { brut: 0, damga: 0, gelir: 0, net: 0 };
  const damga = calcStampTax(brut);
  const gelir = roundMoney(brut * INCOME_TAX_RATE_DEFAULT);
  return { brut, damga, gelir, net: roundMoney(brut - damga - gelir) };
}

/**
 * @param {{ eligible: boolean, totalDays: number, severanceBase: number }} params
 */
function calcGrossKidem({ eligible, totalDays, severanceBase }) {
  if (!eligible || totalDays < 365) return 0;
  return roundMoney((severanceBase * totalDays) / SEVERANCE_DAYS_DIVISOR);
}

/**
 * @param {CompensationInput} data
 * @returns {CompensationResult | { error: string }}
 */
export function calculateCompensation(data) {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const service = getServiceDuration(start, end);
  const { totalDays, calismaSuresi, totalYears, totalMonths } = service;

  if (totalDays < 0) return { error: "Çıkış tarihi giriş tarihinden sonra olmalıdır." };

  const wages = buildIntegratedWages(data);
  const eligibilityResult = ELIGIBILITY[data.reason] || ELIGIBILITY.haksiz_fesih;
  const integratedGross = wages.integratedGross;
  const ceilingApplied = integratedGross > KIDEM_TAVANI;
  const severanceBase = ceilingApplied ? KIDEM_TAVANI : integratedGross;

  const brutKidem = calcGrossKidem({
    eligible: eligibilityResult.kidem,
    totalDays,
    severanceBase
  });

  const notice = getNoticePeriod(totalMonths);
  const brutIhbar = roundMoney(eligibilityResult.ihbar ? wages.dailyGross * notice.days : 0);

  const kidemTax = calcNetKidem(brutKidem);
  const ihbarTax = calcNetIhbar(brutIhbar);

  const unusedLeaveDays = data.unusedLeaveDays || 0;
  const leavePay = roundMoney(wages.dailyGross * unusedLeaveDays);
  const overtime = data.overtime || 0;
  const otherReceivables = data.otherReceivables || 0;
  const ekAlacaklarToplami = roundMoney(leavePay + overtime + otherReceivables);

  /** Çıkış ödeme paketi: yalnızca net kıdem + net ihbar */
  const toplamTazminat = roundMoney(kidemTax.net + ihbarTax.net);

  return {
    iseGirisTarihi: formatTrDate(data.startDate),
    istenCikisTarihi: formatTrDate(data.endDate),
    calismaSuresi,
    totalDays,
    totalYears,
    totalMonths,
    brutMaas: wages.grossSalary,
    entegreBrutMaas: integratedGross,
    duzenlenmisBrutMaas: integratedGross,
    gunlukUcret: wages.dailyGross,
    haftalikUcret: wages.weeklyGross,
    kidemBazTutari: severanceBase,
    cikisSebebi: data.reason,
    eligNote: eligibilityResult.note,
    compensationWarning: eligibilityResult.warning || null,
    brutKidemTazminati: kidemTax.brut,
    netKidemTazminati: kidemTax.net,
    kidemDamgaVergisi: kidemTax.damga,
    brutIhbarTazminati: ihbarTax.brut,
    netIhbarTazminati: ihbarTax.net,
    ihbarDamgaVergisi: ihbarTax.damga,
    ihbarGelirVergisi: ihbarTax.gelir,
    ihbarSuresi: notice.days,
    ihbarSuresiLabel: notice.label,
    tavanUygulandi: ceilingApplied && eligibilityResult.kidem && totalDays >= 365,
    tavanTutari: KIDEM_TAVANI,
    unusedLeavePay: leavePay,
    unusedLeaveDays,
    overtime,
    otherReceivables,
    ekAlacaklarToplami,
    toplamTazminat,
    kidemTazminati: kidemTax.brut,
    ihbarTazminati: ihbarTax.brut,
    wages
  };
}

/**
 * @param {CompensationInput} data
 */
export function calculateTotalCompensation(data) {
  const base = calculateCompensation(data);
  if (base.error) return base;

  const { wages } = base;
  const toplamTazminatDegeri = base.toplamTazminat;

  return {
    ...base,
    performanceBonus: wages.performanceBonus,
    bonusPaymentsPerYear: wages.bonusPaymentsPerYear,
    bonuslar: wages.annualBonus,
    monthlyMeal: wages.monthlyMeal,
    monthlyTravel: wages.monthlyTravel,
    yillikMaas: wages.grossSalary * 12,
    yillikYemek: wages.monthlyMeal * 12,
    yillikUlasim: wages.monthlyTravel * 12,
    cikisOdemePaketi: toplamTazminatDegeri,
    toplamTazminatDegeri
  };
}

export function calculateNoticePay({
  startDate,
  endDate,
  totalMonthsInput,
  grossSalary,
  mealAllowance = 0,
  travelAllowance = 0,
  performanceBonus = 0,
  annualBonus = 0
}) {
  const wages = buildIntegratedWages({
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
    if (totalDays <= 0) return { error: "Çıkış tarihi giriş tarihinden sonra olmalıdır." };
    totalMonths = totalDays / 30.4375;
  }

  const notice = getNoticePeriod(totalMonths);
  const brut = roundMoney(wages.dailyGross * notice.days);
  const ihbarTax = calcNetIhbar(brut);

  return {
    totalMonths,
    noticeDays: notice.days,
    noticeLabel: notice.label,
    noticePay: ihbarTax.net,
    brutNoticePay: brut,
    dailyGross: wages.dailyGross,
    weeklyGross: wages.weeklyGross
  };
}

export function calculateUnusedLeavePay({
  grossSalary,
  unusedLeaveDays,
  mealAllowance = 0,
  travelAllowance = 0,
  performanceBonus = 0,
  annualBonus = 0
}) {
  const wages = buildIntegratedWages({
    grossSalary,
    mealAllowance,
    travelAllowance,
    performanceBonus,
    annualBonus
  });
  return {
    dailyGross: wages.dailyGross,
    amount: roundMoney(wages.dailyGross * unusedLeaveDays)
  };
}

function formatTrDate(d) {
  if (!d) return "";
  const dt = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  return `${String(dt.getDate()).padStart(2, "0")}.${String(dt.getMonth() + 1).padStart(2, "0")}.${dt.getFullYear()}`;
}

export function validateCompensationInput(data) {
  const errors = {};
  if (!data.startDate) errors.giris = "Lütfen işe giriş tarihini girin.";
  if (!data.endDate) errors.cikis = "Lütfen işten çıkış tarihini girin.";
  if (data.startDate && data.endDate && new Date(data.endDate) <= new Date(data.startDate)) {
    errors.cikis = "İşten çıkış tarihi işe giriş tarihinden sonra olmalıdır.";
  }
  if (!data.grossSalary || data.grossSalary <= 0) {
    errors.maas = "Lütfen geçerli bir brüt maaş tutarı girin.";
  }
  return errors;
}
