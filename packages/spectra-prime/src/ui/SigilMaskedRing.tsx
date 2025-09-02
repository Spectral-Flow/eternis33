import React from "react";

export function SigilMaskedRing({ colorA = "#A3D9FF", colorB = "#7B2FF7", width = 200 }: { colorA?: string; colorB?: string; width?: number }) {
  const size = width; const stroke = 12;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="spectra-ring">
      <defs>
        <linearGradient id="mgrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colorA} />
          <stop offset="100%" stopColor={colorB} />
        </linearGradient>
        <mask id="sigmask">
          <rect x="0" y="0" width="200" height="200" fill="black" />
          {/* Simplified sigil strokes */}
          <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="14" />
          <path d="M30,110 Q100,10 170,110" fill="none" stroke="white" strokeWidth="10" />
        </mask>
      </defs>
      <circle cx="100" cy="100" r="80" fill="none" stroke="url(#mgrad)" strokeWidth={stroke} mask="url(#sigmask)" />
    </svg>
  );
}
