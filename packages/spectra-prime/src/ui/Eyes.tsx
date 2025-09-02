import React from "react";

export function Eyes({ color = "#A3F7E0", shimmer = 0.2 }: { color?: string; shimmer?: number }) {
  const glow = Math.max(0, Math.min(1, shimmer));
  return (
    <svg viewBox="0 0 200 100" className="spectra-eyes">
      <defs>
        <filter id="eyeGlow"><feGaussianBlur stdDeviation={1 + 3 * glow} /></filter>
      </defs>
      <ellipse cx="60" cy="50" rx="28" ry="18" fill="none" stroke={color} strokeWidth={3} filter="url(#eyeGlow)" />
      <ellipse cx="140" cy="50" rx="28" ry="18" fill="none" stroke={color} strokeWidth={3} filter="url(#eyeGlow)" />
      <circle cx="60" cy="50" r={4 + 3 * glow} fill={color} />
      <circle cx="140" cy="50" r={4 + 3 * glow} fill={color} />
  </svg>
  );
}
