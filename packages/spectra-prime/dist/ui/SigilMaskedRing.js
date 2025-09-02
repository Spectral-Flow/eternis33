import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import React from 'react';
export function SigilMaskedRing({
  colorA = '#A3D9FF',
  colorB = '#7B2FF7',
  width = 200,
}) {
  const size = width;
  const stroke = 12;
  return _jsxs('svg', {
    viewBox: '0 0 200 200',
    width: size,
    height: size,
    className: 'spectra-ring',
    children: [
      _jsxs('defs', {
        children: [
          _jsxs('linearGradient', {
            id: 'mgrad',
            x1: '0%',
            y1: '0%',
            x2: '100%',
            y2: '0%',
            children: [
              _jsx('stop', { offset: '0%', stopColor: colorA }),
              _jsx('stop', { offset: '100%', stopColor: colorB }),
            ],
          }),
          _jsxs('mask', {
            id: 'sigmask',
            children: [
              _jsx('rect', {
                x: '0',
                y: '0',
                width: '200',
                height: '200',
                fill: 'black',
              }),
              _jsx('circle', {
                cx: '100',
                cy: '100',
                r: '80',
                fill: 'none',
                stroke: 'white',
                strokeWidth: '14',
              }),
              _jsx('path', {
                d: 'M30,110 Q100,10 170,110',
                fill: 'none',
                stroke: 'white',
                strokeWidth: '10',
              }),
            ],
          }),
        ],
      }),
      _jsx('circle', {
        cx: '100',
        cy: '100',
        r: '80',
        fill: 'none',
        stroke: 'url(#mgrad)',
        strokeWidth: stroke,
        mask: 'url(#sigmask)',
      }),
    ],
  });
}
