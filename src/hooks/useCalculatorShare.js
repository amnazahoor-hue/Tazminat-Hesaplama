"use client";

import { useState } from "react";
import { exportResultPdf } from "@/utils/exportPdf";
import { getEmailShareUrl, getWhatsAppShareUrl } from "@/utils/shareReport";

export function useCalculatorShare({ form, result, activeTab, buildReport, pdfRef, pdfFilename }) {
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

  const shareWhatsApp = () => {
    if (!result) return;
    window.open(getWhatsAppShareUrl(getReportText()), "_blank", "noopener,noreferrer");
  };

  const shareEmail = (subject) => {
    if (!result) return;
    window.location.href = getEmailShareUrl({ text: getReportText(), subject });
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

  return { pdfLoading, copy, shareWhatsApp, shareEmail, downloadPdf };
}
