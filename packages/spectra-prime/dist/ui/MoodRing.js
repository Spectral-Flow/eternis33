import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
const PALETTES = {
    calm: ["#A3D9FF", "#7AC7B7", "#C9E4CA"],
    joy: ["#FF6F61", "#FFC1B6", "#FFA07A"],
    passion: ["#E63946", "#9D0191", "#7B2FF7"],
    anxiety: ["#4A6FA5", "#6B5876", "#7A7D7D"],
    jealousy: ["#7D8B2C", "#C9B037", "#A68A00"],
    creative: ["#7AC7B7", "#7B2FF7", "#FF6F61"],
};
export function MoodRing({ targetMood = "calm", intensity = 0.2 }) {
    const [mood, setMood] = useState(targetMood);
    useEffect(() => { setMood(targetMood); }, [targetMood]);
    const t = useRef(0);
    const [, force] = useState(0);
    useEffect(() => {
        const id = setInterval(() => { t.current += 0.002 + intensity * 0.003; force(x => x + 1); }, 16);
        return () => clearInterval(id);
    }, [intensity]);
    const [c1, c2, c3] = PALETTES[mood] || PALETTES.calm;
    return (_jsxs("svg", { viewBox: "0 0 200 200", className: "spectra-ring", children: [_jsxs("defs", { children: [_jsxs("radialGradient", { id: "ring", r: "80%", fx: `${50 + 10 * Math.sin(t.current * 2)}%`, fy: `${50 + 10 * Math.cos(t.current * 2)}%`, children: [_jsx("stop", { offset: "0%", stopColor: c1 }), _jsx("stop", { offset: "60%", stopColor: c2 }), _jsx("stop", { offset: "100%", stopColor: c3 })] }), _jsxs("filter", { id: "glow", children: [_jsx("feGaussianBlur", { stdDeviation: 2 + 6 * intensity, result: "b" }), _jsxs("feMerge", { children: [_jsx("feMergeNode", { in: "b" }), _jsx("feMergeNode", { in: "SourceGraphic" })] })] })] }), _jsx("circle", { cx: "100", cy: "100", r: "70", fill: "none", stroke: "url(#ring)", strokeWidth: 12 + intensity * 10, filter: "url(#glow)" }), _jsx("circle", { cx: 100 + 50 * Math.cos(t.current * 1.1), cy: 100 + 50 * Math.sin(t.current * 1.1), r: 1 + intensity * 2, fill: "#ffffff" })] }));
}
