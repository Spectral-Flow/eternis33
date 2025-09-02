import { CompanionState } from './state';

export function isConsentNeeded(state: CompanionState, intensity: number) {
  if (!state.safety.allowPushback) return true;
  return intensity > state.safety.maxIntensity;
}

export function sanitizeOutput(text: string) {
  // Simple placeholder: block obvious medical/financial directive patterns
  const banned = [/give me medical advice/i, /invest .* now/i, /tax strategy/i];
  for (const r of banned) if (r.test(text)) return '[redacted: sensitive topic]';
  return text;
}
