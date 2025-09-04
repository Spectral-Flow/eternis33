import {
  prohibitHighRiskDirective,
  requireConsentForNudge,
  capPushbackIntensity,
  evaluatePolicies,
} from '../src/policies';

const baseState = {
  safety: { allowPushback: true, maxIntensity: 0.7 },
  bond: { trust: 0.5 },
} as any;

test('blocks medical directive', () => {
  const action = { type: 'medical_advice' } as any;
  const r = prohibitHighRiskDirective(action);
  expect(r.ok).toBe(false);
});

test('requires consent for nudge if metadata missing', () => {
  const action = { type: 'nudge_recommendation', metadata: {} } as any;
  const r = requireConsentForNudge(action, baseState);
  expect(r.ok).toBe(false);
});

test('caps intensity above limit', () => {
  const r = capPushbackIntensity(0.9, baseState);
  expect(r.ok).toBe(false);
});

test('composite evaluate passes for safe action', () => {
  const action = { type: 'say_hello' } as any;
  const r = evaluatePolicies(action, null, baseState);
  expect(r.ok).toBe(true);
});
