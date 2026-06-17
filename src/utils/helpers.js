export {
  BONUS_PAYMENTS_PER_YEAR,
  CONFIG,
  INCOME_TAX_RATE_DEFAULT,
  KIDEM_TAVANI,
  SEVERANCE_DAYS_DIVISOR,
  STAMP_TAX_RATE,
  buildEffectiveGross,
  buildIntegratedWages,
  calculateCompensation,
  calculateNoticePay,
  calculateTotalCompensation,
  calculateUnusedLeavePay,
  getNoticePeriod,
  validateCompensationInput
} from "@/utils/compensationEngine";

import { validateCompensationInput } from "@/utils/compensationEngine";

/** @deprecated Use validateCompensationInput */
export const validateForm = validateCompensationInput;

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
