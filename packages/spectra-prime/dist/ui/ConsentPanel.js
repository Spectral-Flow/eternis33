import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export function ConsentPanel({ onCamera, onMic, cameraEnabled, micEnabled }) {
    return (_jsxs("div", { role: "group", "aria-label": "Consent controls", className: "spectra-consent", children: [_jsxs("button", { onClick: onCamera, children: [cameraEnabled ? 'Disable' : 'Enable', " Camera"] }), _jsxs("button", { onClick: onMic, children: [micEnabled ? 'Disable' : 'Enable', " Mic"] }), _jsx("small", { children: "All processing on-device. No raw media stored. You can revoke anytime." })] }));
}
