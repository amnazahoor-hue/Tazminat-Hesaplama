"use client";

import Image from "next/image";
import { IMAGES } from "@/config/images";
import { useEffect, useState } from "react";

const SESSION_KEY = "tazminat-app-ready";
const FADE_MS = 140;
const MAX_VISIBLE_MS = 220;

export default function Preloader() {
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setPhase("done");
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hideTimer;
    let doneTimer;
    let finished = false;

    document.body.classList.add("is-preloading");

    const finish = () => {
      if (finished) return;
      finished = true;
      sessionStorage.setItem(SESSION_KEY, "1");

      const fadeDuration = reducedMotion ? 0 : FADE_MS;

      hideTimer = window.setTimeout(() => setPhase("hiding"), 0);
      doneTimer = window.setTimeout(() => {
        setPhase("done");
        document.body.classList.remove("is-preloading");
      }, fadeDuration);
    };

    if (document.readyState !== "loading") {
      finish();
    } else {
      document.addEventListener("DOMContentLoaded", finish, { once: true });
    }

    const maxTimer = window.setTimeout(finish, reducedMotion ? 0 : MAX_VISIBLE_MS);

    return () => {
      document.removeEventListener("DOMContentLoaded", finish);
      window.clearTimeout(maxTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(doneTimer);
      document.body.classList.remove("is-preloading");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`site-preloader${phase === "hiding" ? " is-hiding" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Sayfa yükleniyor"
    >
      <div className="site-preloader-backdrop" aria-hidden="true" />

      <div className="site-preloader-panel">
        <div className="site-preloader-logo-stage">
          <Image
            src={IMAGES.logo}
            alt="Tazminat Hesaplama logosu"
            width={100}
            height={100}
            priority
            unoptimized
            className="site-preloader-logo"
          />
        </div>

        <p className="site-preloader-title">Tazminat Hesaplama</p>
        <span className="site-preloader-tag">İŞ KANUNU 4857</span>

        <span className="site-preloader-bar" aria-hidden="true">
          <span className="site-preloader-bar-fill" />
        </span>
      </div>
    </div>
  );
}
