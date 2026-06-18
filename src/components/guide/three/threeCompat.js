"use client";

let applied = false;

const SUPPRESSED_WARNINGS = [
  "THREE.Clock",
  "Clock: This module has been deprecated",
  "PCFSoftShadowMap has been deprecated",
  "THREE.WebGLProgram",
  "Program Info Log",
  "X4122"
];

function shouldSuppressWarn(args) {
  const message = args.map((arg) => (typeof arg === "string" ? arg : String(arg))).join(" ");
  return SUPPRESSED_WARNINGS.some((pattern) => message.includes(pattern));
}

export function applyThreeCompat() {
  if (applied || typeof window === "undefined") return;
  applied = true;

  const nativeWarn = console.warn.bind(console);
  const nativeError = console.error.bind(console);

  console.warn = (...args) => {
    if (shouldSuppressWarn(args)) return;
    nativeWarn(...args);
  };

  console.error = (...args) => {
    if (shouldSuppressWarn(args)) return;
    nativeError(...args);
  };
}

applyThreeCompat();
