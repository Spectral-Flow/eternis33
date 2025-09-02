export const GameEffects = {
  shieldMatrix(): string[] {
    return [
      'apply:shield+30s',
      'debuff:hostiles-accuracy-15%',
      'spawn:evac-corridors',
    ];
  },
  precisionInterdiction(): string[] {
    return [
      'mark:hostile-cores (weakpoints)',
      'stagger:elite-entities-5s',
      'flag:reversible',
    ];
  },
  finalSafeguard(): string[] {
    return [
      'time-dilate:zone-10s',
      'purge:hazard-fields',
      'lockout:high-yield-abilities-60s',
    ];
  },
};
