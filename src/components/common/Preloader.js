"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 420;
const MAX_VISIBLE_MS = 900;
const FADE_MS = 280;

export default function Preloader() {
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = Date.now();
    let hideTimer;
    let doneTimer;
    let finished = false;

    document.body.classList.add("is-preloading");

    const finish = () => {
      if (finished) return;
      finished = true;

      const elapsed = Date.now() - startedAt;
      const wait = reducedMotion ? 0 : Math.max(0, MIN_VISIBLE_MS - elapsed);
      const fadeDuration = reducedMotion ? 0 : FADE_MS;

      hideTimer = window.setTimeout(() => setPhase("hiding"), wait);
      doneTimer = window.setTimeout(() => {
        setPhase("done");
        document.body.classList.remove("is-preloading");
      }, wait + fadeDuration);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const maxTimer = window.setTimeout(finish, reducedMotion ? 0 : MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener("load", finish);
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
      style={{ "--preloader-duration": `${MAX_VISIBLE_MS}ms` }}
    >
      <div className="site-preloader-backdrop" aria-hidden="true" />

      <div className="site-preloader-panel">
        <div className="site-preloader-logo-stage">
          <Image
            src="/logo.png"
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
