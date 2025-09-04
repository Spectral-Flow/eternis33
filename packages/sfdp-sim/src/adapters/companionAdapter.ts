export function companionSpeak(event: string): string {
  const lines: Record<string, string[]> = {
    request_consent: [
      'This path is sharp but surgical—shall we proceed together?',
      'Shield walls now. Talk later. I need your yes.',
    ],
    deny: ['Not like this. We keep our oath to restraint.'],
    commit: ['Understood. I’ll carry the weight with you.'],
  };
  const pool = lines[event] ?? ['I am here.'];
  return pool[Math.floor(Math.random() * pool.length)];
}
