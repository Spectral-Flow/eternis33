import React from 'react';

export function ConsentPanel({
  onCamera,
  onMic,
  cameraEnabled,
  micEnabled,
}: {
  onCamera: () => void;
  onMic: () => void;
  cameraEnabled: boolean;
  micEnabled: boolean;
}) {
  return (
    <div role="group" aria-label="Consent controls" className="spectra-consent">
      <button onClick={onCamera}>
        {cameraEnabled ? 'Disable' : 'Enable'} Camera
      </button>
      <button onClick={onMic}>{micEnabled ? 'Disable' : 'Enable'} Mic</button>
      <small>
        All processing on-device. No raw media stored. You can revoke anytime.
      </small>
    </div>
  );
}
