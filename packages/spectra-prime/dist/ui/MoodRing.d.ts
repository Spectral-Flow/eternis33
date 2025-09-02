declare const PALETTES: Record<string, string[]>;
export declare function MoodRing({ targetMood, intensity }: {
    targetMood?: keyof typeof PALETTES | string;
    intensity?: number;
}): import("react/jsx-runtime").JSX.Element;
export {};
