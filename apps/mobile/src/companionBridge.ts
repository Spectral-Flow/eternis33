// Mobile bridge stub for Companion prompts and consent gates.
export async function promptUserChoice(prompt: string, choices: string[]) {
  // In React Native this would open a modal / alert. For now, return the first choice for tests.
  console.log('PROMPT:', prompt, 'CHOICES:', choices);
  return Promise.resolve(choices[0]);
}

export function notifyCompanionState(stage: string, trust: number) {
  console.log(`COMPANION_STATE: stage=${stage} trust=${trust}`);
}
