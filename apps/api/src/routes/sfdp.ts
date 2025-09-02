import { Router } from "express";
import { SpectralFlowEngine } from "@spectral-flow/sfdp-sim/src/engine";

export const sfdpRouter = Router();
const engine = new SpectralFlowEngine();

sfdpRouter.post("/assess", async (req, res) => {
  const decision = await engine.assess(req.body);
  res.json(decision);
});
