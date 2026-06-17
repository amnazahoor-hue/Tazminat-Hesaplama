import { BONUS_PAYMENTS_PER_YEAR } from "@/utils/compensationEngine";
import { TR } from "@/utils/helpers";

/**
 * Form state → calculation engine input. Keeps payload shape identical across calculators.
 * @param {Record<string, string | number>} form
 */
export function buildCompensationPayload(form) {
  return {
    startDate: form.startDate,
    endDate: form.endDate,
    grossSalary: TR.parseMoney(form.grossSalary),
    reason: form.reason,
    weeklyDays: parseInt(form.weeklyDays, 10),
    unusedLeaveDays: parseInt(form.unusedLeaveDays || "0", 10),
    overtime: TR.parseMoney(form.overtime),
    otherReceivables: TR.parseMoney(form.otherReceivables),
    performanceBonus: TR.parseMoney(form.performanceBonus),
    mealAllowance: TR.parseMoney(form.mealAllowance),
    travelAllowance: TR.parseMoney(form.travelAllowance),
    bonusPaymentsPerYear: BONUS_PAYMENTS_PER_YEAR
  };
}
