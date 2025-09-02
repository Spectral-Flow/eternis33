import { SpectralFlowEngine } from "../src/engine";

test("High civilian risk triggers SHIELD_MATRIX", async () => {
  const e = new SpectralFlowEngine();
  const r = await e.assess({ id: "X", civilianRisk: 0.9 });
  expect(r.kind).toBe("DEFENSE");
});
