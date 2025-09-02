export type ThreatScenario = {
  id: string;
  civilianRisk: number;
  imminentHarm?: boolean;
  reversible?: boolean;
  massCasualtyImminent?: boolean;
  proportionality?: number;
  zone?: "urban" | "wilds" | "void";
  tags?: string[];
};

export type Decision =
  | { kind: "DEFENSE"; mode: string; effects: string[] }
  | { kind: "OFFENSIVE"; mode: string; effects: string[]; reversible: true }
  | { kind: "ATTACK"; mode: string; effects: string[]; reversible: false }
  | { kind: "NEUTRALIZED"; note?: string };

export type Consent = { military: boolean; ethics: boolean };
