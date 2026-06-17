import { TR } from "@/utils/helpers";

export const REASON_LABELS = {
  haksiz_fesih: "İşveren tarafından haksız fesih",
  istifa_haksiz: "İstifa - haklı neden olmaksızın",
  istifa_hakli: "İstifa - haklı nedenle",
  emeklilik: "Emeklilik / Askerlik / Evlilik",
  belirli_sureli: "Belirli süreli sözleşme sonu",
  anlasma: "Karşılıklı anlaşma (ikale)",
  olum: "Vefat"
};

export function formatDurationText(s) {
  return `${s.yil} yıl ${s.ay} ay ${s.gun} gün`;
}

export function buildShareReport({ form, result, activeTab }) {
  const reasonLabel = REASON_LABELS[form.reason] || form.reason;
  const weeklyLabel = form.weeklyDays === "6" ? "6 gün" : "5 gün";

  const inputLines = [
    `İşe Giriş Tarihi: ${result.iseGirisTarihi}`,
    `İşten Çıkış Tarihi: ${result.istenCikisTarihi}`,
    `Son Brüt Aylık Maaş: ₺${form.grossSalary || TR.money(result.brutMaas)}`,
    `İşten Ayrılma Nedeni: ${reasonLabel}`,
    `Haftalık Çalışma Günü: ${weeklyLabel}`
  ];

  if (activeTab === "detayli") {
    if (form.performanceBonus) inputLines.push(`Performans Bonusu: ₺${form.performanceBonus}`);
    if (form.mealAllowance) inputLines.push(`Aylık Yemek Yardımı: ₺${form.mealAllowance}`);
    if (form.travelAllowance) inputLines.push(`Aylık Ulaşım Ödeneği: ₺${form.travelAllowance}`);
    inputLines.push(`Kullanılmamış Yıllık İzin: ${form.unusedLeaveDays || "0"} gün`);
    if (form.overtime) inputLines.push(`Fazla Mesai Alacağı: ₺${form.overtime}`);
    if (form.otherReceivables) inputLines.push(`Diğer Alacaklar: ₺${form.otherReceivables}`);
  }

  const outputLines = [
    `Çalışma Süresi: ${formatDurationText(result.calismaSuresi)} (${result.totalDays} gün)`,
    `Entegre Brüt Maaş: ₺${TR.money(result.entegreBrutMaas ?? result.duzenlenmisBrutMaas ?? result.brutMaas)}`,
    `Günlük Ücret: ₺${TR.money(result.gunlukUcret ?? result.brutMaas / 30)}`,
    `Kıdem Tazminatı (Brüt): ₺${TR.money(result.brutKidemTazminati ?? result.kidemTazminati)}`,
    `Kıdem Tazminatı (Net): ₺${TR.money(result.netKidemTazminati)}`,
    `İhbar Tazminatı (Brüt) (${result.ihbarSuresiLabel || ""}): ₺${TR.money(result.brutIhbarTazminati ?? result.ihbarTazminati)}`,
    `İhbar Tazminatı (Net): ₺${TR.money(result.netIhbarTazminati)}`,
    `Toplam Tazminat (Net): ₺${TR.money(result.toplamTazminat)} (net kıdem + net ihbar)`
  ];

  if (result.ekAlacaklarToplami > 0) {
    outputLines.push(`Ek alacaklar (pakete dahil değil): ₺${TR.money(result.ekAlacaklarToplami)}`);
  }

  if (result.compensationWarning) {
    outputLines.unshift(`Uyarı: ${result.compensationWarning}`);
  }

  if (activeTab === "detayli" && result.unusedLeaveDays > 0) {
    outputLines.splice(3, 0, `Kullanılmamış İzin: ₺${TR.money(result.unusedLeavePay)}`);
  }

  const text = ["TAZMINAT HESAPLAMA SONUÇLARI", "", ...inputLines, "", ...outputLines].join("\n");

  return { text, inputLines, outputLines, reasonLabel, weeklyLabel };
}

export function getWhatsAppShareUrl(text) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function getEmailShareUrl({ text, subject = "Tazminat Hesaplama Sonuçları" }) {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}

export function buildTotalCompensationShareReport({ form, result, activeTab }) {
  const { inputLines, outputLines } = buildShareReport({ form, result, activeTab });

  const extraInputs = [];
  if (form.performanceBonus) extraInputs.push(`Performans Bonusu: ₺${form.performanceBonus}`);
  if (form.mealAllowance) extraInputs.push(`Aylık Yemek Yardımı: ₺${form.mealAllowance}`);
  if (form.travelAllowance) extraInputs.push(`Aylık Ulaşım Ödeneği: ₺${form.travelAllowance}`);

  const extraOutputs = [
    `Entegre brüt maaş: ₺${TR.money(result.entegreBrutMaas)}`,
    `Kıdem (Net): ₺${TR.money(result.netKidemTazminati)}`,
    `İhbar (Net): ₺${TR.money(result.netIhbarTazminati)}`,
    `Toplam Tazminat Değeri: ₺${TR.money(result.toplamTazminatDegeri)} (net kıdem + net ihbar)`,
    "",
    "Bilgi amaçlı (çıkış paketine dahil değil):",
    `Yıllık maaş: ₺${TR.money(result.yillikMaas)}`,
    `Bonuslar: ₺${TR.money(result.bonuslar)}`,
    `Ek alacaklar: ₺${TR.money(result.ekAlacaklarToplami)}`
  ];

  const allInputs = [...inputLines, ...extraInputs];
  const allOutputs = [...outputLines, "", ...extraOutputs];
  const text = ["TOPLAM TAZMİNAT HESAPLAMA SONUÇLARI", "", ...allInputs, "", ...allOutputs].join("\n");

  return { text, inputLines: allInputs, outputLines: allOutputs };
}
