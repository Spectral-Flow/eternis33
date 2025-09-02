import { EmotionState, ExperienceEvent, EmotionVector } from './types';

export function normalize(v: EmotionState): EmotionState {
  const clamp = (x: number) => Math.max(0, Math.min(1, x));
  return {
    calm: clamp(v.calm),
    joy: clamp(v.joy),
    curiosity: clamp(v.curiosity),
    tenderness: clamp(v.tenderness),
    anxiety: clamp(v.anxiety),
    irritation: clamp(v.irritation),
    awe: clamp(v.awe),
    passion: clamp(v.passion),
    intensity: clamp(v.intensity),
    lastUpdate: v.lastUpdate,
  };
}

export function blendAffect(
  base: EmotionState,
  delta: Partial<EmotionVector>,
  alpha: number
): EmotionState {
  const mix = (a: number, b: number) => a + (b - a) * alpha;
  return normalize({
    ...base,
    calm: mix(base.calm, delta.calm ?? base.calm),
    joy: mix(base.joy, delta.joy ?? base.joy),
    curiosity: mix(base.curiosity, delta.curiosity ?? base.curiosity),
    tenderness: mix(base.tenderness, delta.tenderness ?? base.tenderness),
    anxiety: mix(base.anxiety, delta.anxiety ?? base.anxiety),
    irritation: mix(base.irritation, delta.irritation ?? base.irritation),
    awe: mix(base.awe, delta.awe ?? base.awe),
    passion: mix(base.passion, delta.passion ?? base.passion),
  } as EmotionState);
}

export function deriveAffect(event: ExperienceEvent): Partial<EmotionVector> {
  // Heuristic starter; to be replaced with learned mapping
  const t = (s: string) => event.tags?.includes(s);
  if (t('creative')) return { passion: 0.6, joy: 0.2, calm: 0.1 };
  if (t('calm')) return { calm: 0.5 };
  if (t('anxiety')) return { anxiety: 0.4, calm: 0.1 };
  if (t('tender')) return { tenderness: 0.3, joy: 0.2 };
  return {};
}

export function updateEmotion(
  prev: EmotionState,
  event: ExperienceEvent
): EmotionState {
  const now = Date.now();
  const dt = Math.max(0.016, (now - prev.lastUpdate) / 1000);
  const decay = Math.exp(-dt * 0.15);
  let next: EmotionState = {
    calm: 1 - (1 - prev.calm) * decay,
    joy: prev.joy * decay,
    curiosity: prev.curiosity * decay,
    tenderness: prev.tenderness * decay,
    anxiety: prev.anxiety * decay,
    irritation: prev.irritation * decay,
    awe: prev.awe * decay,
    passion: prev.passion * decay,
    intensity: prev.intensity * decay,
    lastUpdate: now,
  };
  const nudge = deriveAffect(event);
  next = blendAffect(next, nudge, 0.2);
  next.intensity = Math.min(
    1,
    Math.max(
      0,
      0.3 * (next.joy + next.passion + next.anxiety + next.irritation)
    )
  );
  return normalize(next);
}
