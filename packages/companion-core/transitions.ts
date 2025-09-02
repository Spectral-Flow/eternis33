import { TCompanionState } from './state';

export function evaluateStage(state: TCompanionState): TCompanionState['stage'] {
  const { memories, bond, traits } = state;
  const meaningful = memories.length;
  const days = bond.timeDays || 0;
  if (state.stage === 'mask') {
    if (meaningful >= 3 && bond.rupture > 0) return 'fracture';
    if (days >= 7) return 'fracture';
    return 'mask';
  }

  if (state.stage === 'fracture') {
    if (bond.repair >= 2 && bond.trust >= 0.6) return 'reflection';
    return 'fracture';
  }

  if (state.stage === 'reflection') {
    const disagreeCount = state.memories.filter((m) => m.type === 'disagree').length;
    if (disagreeCount >= 2 && traits.autonomy >= 0.55) return 'divergence';
    return 'reflection';
  }

  if (state.stage === 'divergence') {
    if (bond.trust >= 0.75) return 'becoming';
    return 'divergence';
  }

  return state.stage;
}

export function applyDelta(state: TCompanionState, delta: Partial<TCompanionState['traits']> & Partial<TCompanionState['bond']>) {
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const traits = { ...state.traits } as any;
  for (const k of Object.keys(delta)) if (k in traits) traits[k] = clamp((delta as any)[k]);
  const bond = { ...state.bond } as any;
  for (const k of ['trust', 'rupture', 'repair']) if ((delta as any)[k] !== undefined) bond[k] = clamp((delta as any)[k]);
  const next = { ...state, traits, bond } as TCompanionState;
  const nextStage = evaluateStage(next);
  return { ...next, stage: nextStage } as TCompanionState;
}
