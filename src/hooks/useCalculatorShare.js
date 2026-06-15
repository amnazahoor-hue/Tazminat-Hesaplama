"use client";

import { useState } from "react";
import { exportResultPdf } from "@/utils/exportPdf";
import { getEmailShareUrl, getWhatsAppShareUrl } from "@/utils/shareReport";

export function useCalculatorShare({
  form,
  result,
  activeTab,
  buildReport,
  pdfRef,
  pdfFilename,
  shareSubject = "Tazminat Hesaplama Sonuçları"
}) {
  const [pdfLoading, setPdfLoading] = useState(false);

  const getReportText = () => {
    if (!result) return "";
    return buildReport({ form, result, activeTab }).text;
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(getReportText());
    window.alert("Sonuç kopyalandı.");
  };

  const shareNative = async () => {
    if (!result) return;
    const text = getReportText();

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareSubject, text });
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }

    await copy();
  };

  const shareWhatsApp = () => {
    if (!result) return;
    window.open(getWhatsAppShareUrl(getReportText()), "_blank", "noopener,noreferrer");
  };

  const shareEmail = () => {
    if (!result) return;
    window.location.href = getEmailShareUrl({ text: getReportText(), subject: shareSubject });
  };

  const downloadPdf = async () => {
    if (!result || !pdfRef.current) return;
    const sheet = pdfRef.current.querySelector(".pdf-report-sheet");
    if (!sheet) return;

    setPdfLoading(true);
    try {
      await exportResultPdf(sheet, pdfFilename);
    } catch {
      window.alert("PDF oluşturulamadı. Lütfen tekrar deneyin.");
    } finally {
      setPdfLoading(false);
    }
  };

  return { pdfLoading, copy, shareNative, shareWhatsApp, shareEmail, downloadPdf };
}
