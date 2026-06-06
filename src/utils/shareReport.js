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
    inputLines.push(`Kullanılmamış Yıllık İzin: ${form.unusedLeaveDays || "0"} gün`);
    if (form.overtime) inputLines.push(`Fazla Mesai Alacağı: ₺${form.overtime}`);
    if (form.otherReceivables) inputLines.push(`Diğer Alacaklar: ₺${form.otherReceivables}`);
  }

  const outputLines = [
    `Çalışma Süresi: ${formatDurationText(result.calismaSuresi)}`,
    `Kıdem Tazminatı: ₺${TR.money(result.kidemTazminati)}`,
    `İhbar Tazminatı: ₺${TR.money(result.ihbarTazminati)}`,
    `Toplam Tazminat: ₺${TR.money(result.toplamTazminat)}`
  ];

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
