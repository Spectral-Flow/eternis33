import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
export function Eyes({ color = '#A3F7E0', shimmer = 0.2 }) {
  const glow = Math.max(0, Math.min(1, shimmer));
  return _jsxs('svg', {
    viewBox: '0 0 200 100',
    className: 'spectra-eyes',
    children: [
      _jsx('defs', {
        children: _jsx('filter', {
          id: 'eyeGlow',
          children: _jsx('feGaussianBlur', { stdDeviation: 1 + 3 * glow }),
        }),
      }),
      _jsx('ellipse', {
        cx: '60',
        cy: '50',
        rx: '28',
        ry: '18',
        fill: 'none',
        stroke: color,
        strokeWidth: 3,
        filter: 'url(#eyeGlow)',
      }),
      _jsx('ellipse', {
        cx: '140',
        cy: '50',
        rx: '28',
        ry: '18',
        fill: 'none',
        stroke: color,
        strokeWidth: 3,
        filter: 'url(#eyeGlow)',
      }),
      _jsx('circle', { cx: '60', cy: '50', r: 4 + 3 * glow, fill: color }),
      _jsx('circle', { cx: '140', cy: '50', r: 4 + 3 * glow, fill: color }),
    ],
  });
}
