import { Consent } from './types';
import { Mode } from './tenets';

export async function dualConsentRequest(
  mode: Mode,
  ctx: Record<string, unknown>
): Promise<Consent> {
  // In-sim only: route through Companion UI. Here, return permissive default for testing.
  return { military: true, ethics: true };
}

export function consentOK(
  mode: Mode,
  consent: Consent,
  proportionality: number,
  civilianRisk: number
): boolean {
  if (!consent.military || !consent.ethics) return false;
  if (mode === Mode.OFFENSIVE) return proportionality <= 0.2;
  if (mode === Mode.ATTACK) return civilianRisk === 0;
  return true;
}
