import { CompanionState } from './state';

export function mixVoiceParams(state: CompanionState) {
  // Early: higher glitch, lower grain, neutral tempo.
  // With trust up: glitch down, grain up, adopt user rhythm (not modelled here).
  const base = state.voice;
  const trust = state.bond.trust || 0.5;
  const glitch = Math.max(0, base.glitch * (1 - trust * 0.8));
  const grain = Math.min(1, base.grain + trust * 0.3);
  const tempo = Math.max(0, Math.min(1, base.tempo + (state.traits.autonomy - 0.5) * 0.1));
  const brightness = Math.max(0, Math.min(1, base.brightness + (state.traits.clarity - 0.5) * 0.1));
  return { tempo, brightness, grain, glitch };
}
