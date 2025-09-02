/**
 * Companion State types and simple loader/saver helpers.
 * This file is a lightweight TypeScript stub. For runtime schema
 * validation you can wire in `zod` and call `validate(state)`.
 */
import fs from 'fs';
import path from 'path';

// Optional runtime schema validation using `zod`. Projects that do not
// install zod can still import the types; validate() will be a noop.
let z: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  z = require('zod');
} catch (e) {
  // zod not installed; that's okay for the scaffolding phase
}

export type Traits = { clarity: number; warmth: number; entropy: number; autonomy: number };
export type Bond = { trust: number; rupture: number; repair: number; timeDays: number };
export type Voice = { tempo: number; brightness: number; grain: number; glitch: number };
export type Memory = { id: string; type: string; affect: string; ts: string };
export type AdaptationEntry = { ts: string; event: string; delta: Record<string, number> };
export type Safety = { allowPushback: boolean; maxIntensity: number };

export type CompanionStage = 'mask' | 'fracture' | 'reflection' | 'divergence' | 'becoming';

export interface CompanionState {
  id?: string;
  userId: string;
  sigil?: string;
  name?: string;
  archetypeSeed: 'echo-scribe' | 'sparkmonger' | 'fractoracle' | 'rustchanter' | 'voxclad' | 'hollowkin';
  stage: CompanionStage;
  traits: Traits;
  bond: Bond;
  voice: Voice;
  memories: Memory[];
  adaptationLog: AdaptationEntry[];
  safety: Safety;
}

export type TCompanionState = CompanionState;

export const DEFAULT_PATH = path.resolve(process.cwd(), 'apps', 'core', 'state', 'companion_state.json');

export const CompanionStateSchema = z
  ? z.object({
      id: z.string().uuid().optional(),
      userId: z.string().uuid(),
      sigil: z.string().optional(),
      name: z.string().optional(),
      archetypeSeed: z.enum(['echo-scribe', 'sparkmonger', 'fractoracle', 'rustchanter', 'voxclad', 'hollowkin']),
      stage: z.enum(['mask', 'fracture', 'reflection', 'divergence', 'becoming']),
      traits: z.object({ clarity: z.number(), warmth: z.number(), entropy: z.number(), autonomy: z.number() }),
      bond: z.object({ trust: z.number(), rupture: z.number(), repair: z.number(), timeDays: z.number() }),
      voice: z.object({ tempo: z.number(), brightness: z.number(), grain: z.number(), glitch: z.number() }),
      memories: z.array(z.object({ id: z.string(), type: z.string(), affect: z.string(), ts: z.string() })),
      adaptationLog: z.array(z.object({ ts: z.string(), event: z.string(), delta: z.record(z.number()) })),
      safety: z.object({ allowPushback: z.boolean(), maxIntensity: z.number() })
    })
  : null;

export function validate(state: unknown): CompanionState {
  if (!CompanionStateSchema) return state as CompanionState;
  return CompanionStateSchema.parse(state) as CompanionState;
}

export function loadState(filePath?: string): CompanionState | null {
  const p = filePath || DEFAULT_PATH;
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, 'utf8');
  try {
    const obj = JSON.parse(raw) as CompanionState;
    return obj;
  } catch (err) {
    return null;
  }
}

export function saveState(state: CompanionState, filePath?: string) {
  const p = filePath || DEFAULT_PATH;
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(state, null, 2), 'utf8');
}

export function makeEmptyState(userId: string): CompanionState {
  return {
    userId,
    archetypeSeed: 'echo-scribe',
    stage: 'mask',
    traits: { clarity: 0.5, warmth: 0.5, entropy: 0.5, autonomy: 0.5 },
    bond: { trust: 0.5, rupture: 0, repair: 0, timeDays: 0 },
    voice: { tempo: 0.5, brightness: 0.5, grain: 0.5, glitch: 0.2 },
    memories: [],
    adaptationLog: [],
    safety: { allowPushback: true, maxIntensity: 0.7 }
  };
}
