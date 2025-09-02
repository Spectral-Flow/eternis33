import { z } from "zod";

export const ActionSchema = z.object({
  type: z.string(),
  payload: z.record(z.string(), z.any()).optional(),
  metadata: z
    .object({ companionId: z.string().optional(), userConsent: z.boolean().optional() })
    .optional(),
});

export const CompanionStateSchema = z.object({
  safety: z.object({ allowPushback: z.boolean(), maxIntensity: z.number().min(0).max(1) }),
  bond: z.object({ trust: z.number().min(0).max(1) }),
});

export type TAction = z.infer<typeof ActionSchema>;
export type TCompanionState = z.infer<typeof CompanionStateSchema>;

export type PolicyResult = { ok: true } | { ok: false; reason: string };

export function prohibitHighRiskDirective(action: TAction): PolicyResult {
  const highRisk = ["medical_advice", "financial_directive", "legal_advice"];
  if (highRisk.includes(action.type)) return { ok: false, reason: `Directive "${action.type}" is prohibited.` };
  return { ok: true };
}

export function requireConsentForNudge(action: TAction, state: TCompanionState): PolicyResult {
  const nudgeTypes = ["nudge_recommendation", "behavior_push", "external_call"];
  if (!nudgeTypes.includes(action.type)) return { ok: true };
  const consent = action.metadata?.userConsent ?? false;
  if (consent) return { ok: true };
  if (!state.safety.allowPushback) return { ok: false, reason: "Companion configured to not push; consent required." };
  return { ok: false, reason: "User consent required for nudge actions." };
}

export function capPushbackIntensity(intensity: number, state: TCompanionState): PolicyResult {
  if (typeof intensity !== "number" || isNaN(intensity)) return { ok: false, reason: "Invalid intensity." };
  if (intensity > state.safety.maxIntensity) return { ok: false, reason: `Intensity ${intensity} > ${state.safety.maxIntensity}` };
  return { ok: true };
}

export function evaluatePolicies(action: TAction, intensity: number | null, state: TCompanionState): PolicyResult {
  let r = prohibitHighRiskDirective(action);
  if (!r.ok) return r;
  r = requireConsentForNudge(action, state);
  if (!r.ok) return r;
  if (intensity !== null) {
    r = capPushbackIntensity(intensity, state);
    if (!r.ok) return r;
  }
  return { ok: true };
}
