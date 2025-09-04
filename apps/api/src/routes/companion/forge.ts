import { Request, Response } from 'express';
import {
  makeEmptyState,
  validate,
  saveState,
} from '../../../../packages/companion-core/state';
import { v4 as uuidv4 } from 'uuid';

export async function postCreateCompanion(req: Request, res: Response) {
  const { userId, seed, name, sigil } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  const base = makeEmptyState(userId);
  base.id = uuidv4();
  base.archetypeSeed = seed || base.archetypeSeed;
  base.name = name || 'Companion';
  base.sigil = sigil || '◈';
  try {
    const parsed = validate(base);
    saveState(parsed);
    return res.status(201).json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'validation failed' });
  }
}

export async function postAdapt(req: Request, res: Response) {
  // applyDelta + evaluateStage + persist. Left as a stub for implementers.
  return res.status(501).json({ error: 'not implemented' });
}

export async function getCompanion(req: Request, res: Response) {
  // Read from the default path
  try {
    const state =
      require('../../../../packages/companion-core/state').loadState();
    if (!state) return res.status(404).json({ error: 'not found' });
    return res.json(state);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'error' });
  }
}
