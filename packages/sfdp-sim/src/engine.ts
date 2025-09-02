import { CONFIG, Mode } from "./tenets";
import { ThreatScenario, Decision } from "./types";
import { dualConsentRequest, consentOK } from "./authorization";
import { GameEffects } from "./adapters/gameAdapter";
import { createRestorePoint } from "./reversibility";

export class SpectralFlowEngine {
  activeMode: Mode | null = null;
  lastAssessment: ThreatScenario | null = null;

  async assess(threat: ThreatScenario): Promise<Decision> {
    this.lastAssessment = threat;

    if (threat.civilianRisk >= CONFIG.CIVILIAN_RISK_RED) {
      this.activeMode = Mode.DEFENSE;
      return { kind: "DEFENSE", mode: Mode.DEFENSE, effects: GameEffects.shieldMatrix() };
    }

    if (threat.imminentHarm && threat.reversible !== false) {
      const consent = await dualConsentRequest(Mode.OFFENSIVE, { threat });
      if (consentOK(Mode.OFFENSIVE, consent, threat.proportionality ?? 1, threat.civilianRisk)) {
        this.activeMode = Mode.OFFENSIVE;
        createRestorePoint(threat.id);
        return {
          kind: "OFFENSIVE",
          mode: Mode.OFFENSIVE,
          effects: GameEffects.precisionInterdiction(),
          reversible: true,
        } as Decision;
      }
    }

    if (threat.massCasualtyImminent) {
      const consent = await dualConsentRequest(Mode.ATTACK, { threat });
      if (consentOK(Mode.ATTACK, consent, threat.proportionality ?? 1, threat.civilianRisk)) {
        this.activeMode = Mode.ATTACK;
        return { kind: "ATTACK", mode: Mode.ATTACK, effects: GameEffects.finalSafeguard(), reversible: false } as Decision;
      }
    }

    return { kind: "NEUTRALIZED", note: "Threat resolved by stance & presence." } as Decision;
  }
}
