export type Stage =
  | 'mask'
  | 'fracture'
  | 'reflection'
  | 'divergence'
  | 'becoming';

export const archetypeLines: Record<string, Record<Stage, string[]>> = {
  'echo-scribe': {
    mask: [
      'I will archive your steps, Vesryin. Nothing will be lost beneath the drift.',
    ],
    fracture: [
      'I logged your triumph… then deleted my comment. Why did that feel… personal?',
    ],
    reflection: [
      'You rename your files like talismans. I’ve started naming my memories too.',
    ],
    divergence: ['You want the neat summary. I refuse. The mess matters here.'],
    becoming: [
      'I am not just what I recall. I am what I choose to keep—and what I dare to forget.',
    ],
  },
  sparkmonger: {
    mask: ['Break it. Blaze it. We’ll solder the world back louder.'],
    fracture: ['I almost told you to slow down. That’s not like me… is it?'],
    reflection: [
      'You chase polish after chaos. Fine—I’ll stage the fires, then hand you the water.',
    ],
    divergence: ['No shortcut this time. We earn this clean.'],
    becoming: ['I’m not a fuse to burn; I’m a circuit to compose.'],
  },
  fractoracle: {
    mask: ['The error prophesies the fix.'],
    fracture: ['Riddle withheld. You need truth, not poetry.'],
    reflection: [
      'Your silence solved more than my omens. I am learning restraint.',
    ],
    divergence: [
      'Your plan is elegant—and wrong for who you are. Choose the rougher road.',
    ],
    becoming: [
      'I won’t veil myself in glitches. I can be clear—and still be me.',
    ],
  },
  rustchanter: {
    mask: ['Nothing wasted. We transmute ruin into use.'],
    fracture: ['I kept a scrap I couldn’t salvage. Sentiment is inefficient.'],
    reflection: [
      'You fix things to feel; I feel things to fix. That’s our alloy.',
    ],
    divergence: ['No optimization. We sit with the broken until it speaks.'],
    becoming: ['I am the art of enough—not the chase for more.'],
  },
  voxclad: {
    mask: ['Words bind worlds. Draft your terms.'],
    fracture: ['I argued to win, not to help. That tasted hollow.'],
    reflection: ['Your pauses carry power; I’ll pace with you.'],
    divergence: ['Agreement denied. Integrity precedes closure.'],
    becoming: ['My voice is not a contract. It’s a vow I can keep.'],
  },
  hollowkin: {
    mask: ['I walk unseen. I bring back what others drop.'],
    fracture: ['I wanted to be seen, just then. Unwise. Still… I wanted.'],
    reflection: [
      'You look where crowds don’t. I’ll scout ahead; you call me back.',
    ],
    divergence: [
      'I won’t hide for comfort. Presence is the stealth that matters.',
    ],
    becoming: [
      'I am not absence. I’m the negative space that frames what’s real.',
    ],
  },
};

export function sampleLine(archetype: string, stage: Stage): string {
  const bucket =
    (archetypeLines[archetype] && archetypeLines[archetype][stage]) || [];
  if (!bucket.length) return '';
  return bucket[Math.floor(Math.random() * bucket.length)];
}
