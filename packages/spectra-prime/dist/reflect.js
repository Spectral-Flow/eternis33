function decay(ts, now) {
  return Math.exp(-(now - ts) / (1000 * 60 * 60 * 24));
}
function weightedMean(vectors, weights) {
  const acc = {};
  let wsum = 0;
  vectors.forEach((v, i) => {
    const w = weights[i];
    wsum += w;
    for (const k of Object.keys(v)) acc[k] = (acc[k] || 0) + v[k] * w;
  });
  for (const k of Object.keys(acc)) acc[k] /= Math.max(1e-6, wsum);
  return acc;
}
function feedbackGain(_id) {
  return 1;
}
function proposeTraitAdjustments(affectCentroid, traits) {
  const d = { ...traits };
  if ((affectCentroid.passion ?? 0) > 0.3)
    d.playfulness = Math.min(1, traits.playfulness + 0.05);
  if ((affectCentroid.anxiety ?? 0) > 0.3)
    d.restraint = Math.min(1, traits.restraint + 0.05);
  if ((affectCentroid.joy ?? 0) > 0.3)
    d.extroversion = Math.min(1, traits.extroversion + 0.05);
  return d;
}
function blend(a, b, alpha) {
  const o = { ...a };
  for (const k of Object.keys(b)) {
    const av = a[k];
    const bv = b[k];
    if (typeof av === 'number' && typeof bv === 'number')
      o[k] = av + (bv - av) * alpha;
    else o[k] = bv;
  }
  return o;
}
export async function nightlyReflect(db, selfModel) {
  const traces = await db.topRecentTraces(200);
  const now = Date.now();
  const weights = traces.map(
    (t) => t.salience * decay(t.ts ?? now, now) * feedbackGain(t.id)
  );
  const centroid = weightedMean(
    traces.map((t) => t.affect),
    weights
  );
  const deltaTraits = proposeTraitAdjustments(centroid, selfModel.traits);
  const updated = {
    ...selfModel,
    traits: blend(selfModel.traits, deltaTraits, 0.05),
    style: selfModel.style,
    provenance: [
      ...selfModel.provenance,
      ...traces.slice(0, 5).map((t) => t.id),
    ].slice(-100),
  };
  await db.saveSelfModel(updated);
  return updated;
}
