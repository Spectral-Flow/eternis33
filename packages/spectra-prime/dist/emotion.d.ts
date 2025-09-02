import { EmotionState, ExperienceEvent, EmotionVector } from './types';
export declare function normalize(v: EmotionState): EmotionState;
export declare function blendAffect(
  base: EmotionState,
  delta: Partial<EmotionVector>,
  alpha: number
): EmotionState;
export declare function deriveAffect(
  event: ExperienceEvent
): Partial<EmotionVector>;
export declare function updateEmotion(
  prev: EmotionState,
  event: ExperienceEvent
): EmotionState;
