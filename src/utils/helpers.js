export const CONFIG = {
  CEILING: { current: 41828.42, lastUpdated: "01.07.2024" },
  MIN_WAGE_2024: 17002.12,
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

export function calculateCompensation(data) {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const msDay = 86400000;
  const totalDays = Math.floor((end - start) / msDay);
  if (totalDays < 0) return { error: "Cikis tarihi giris tarihinden sonra olmalidir." };

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

  const eligibilityResult = eligibility[data.reason] || eligibility.haksiz_fesih;
  const ceiling = CONFIG.CEILING.current;
  const ceilingApplied = data.grossSalary > ceiling;
  const effectiveRate = Math.min(data.grossSalary, ceiling);
  const kidem = eligibilityResult.kidem && totalDays >= 365 ? effectiveRate * totalYears : 0;

  const months = totalDays / 30.4375;
  const notice = CONFIG.NOTICE_PERIODS.find((p) => months <= p.maxMonths) || CONFIG.NOTICE_PERIODS[3];
  const dailyGross = data.grossSalary / 30;
  const ihbar = eligibilityResult.ihbar ? dailyGross * notice.days : 0;
  const leavePay = dailyGross * (data.unusedLeaveDays || 0);
  const total = kidem + ihbar + leavePay + (data.overtime || 0) + (data.otherReceivables || 0);

  return {
    iseGirisTarihi: TR.date(data.startDate),
    istenCikisTarihi: TR.date(data.endDate),
    calismaSuresi: { yil: yr, ay: mo, gun: dy },
    totalDays,
    totalYears,
    brutMaas: data.grossSalary,
    cikisSebebi: data.reason,
    eligNote: eligibilityResult.note,
    kidemTazminati: kidem,
    ihbarTazminati: ihbar,
    ihbarSuresi: notice.days,
    tavanUygulandi: ceilingApplied && eligibilityResult.kidem && totalDays >= 365,
    tavanTutari: ceiling,
    unusedLeavePay: leavePay,
    unusedLeaveDays: data.unusedLeaveDays || 0,
    overtime: data.overtime || 0,
    otherReceivables: data.otherReceivables || 0,
    toplamTazminat: total
  };
}

export function getNoticePeriod(totalMonths) {
  return CONFIG.NOTICE_PERIODS.find((p) => totalMonths <= p.maxMonths) || CONFIG.NOTICE_PERIODS[3];
}

export function calculateNoticePay({ startDate, endDate, totalMonthsInput, grossSalary }) {
  const dailyGross = grossSalary / 30;
  let totalMonths = totalMonthsInput || 0;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.floor((end - start) / 86400000);
    if (totalDays <= 0) return { error: "Cikis tarihi giris tarihinden sonra olmalidir." };
    totalMonths = totalDays / 30.4375;
  }

  const notice = getNoticePeriod(totalMonths);
  const amount = dailyGross * notice.days;
  return {
    totalMonths,
    noticeDays: notice.days,
    noticeLabel: notice.label,
    noticePay: amount
  };
}

export function calculateUnusedLeavePay({ grossSalary, unusedLeaveDays }) {
  const dailyGross = grossSalary / 30;
  const amount = dailyGross * unusedLeaveDays;
  return {
    dailyGross,
    amount
  };
}
