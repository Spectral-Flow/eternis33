export type ExperienceEvent = {
    id: string;
    ts: number;
    channel: "text" | "voice" | "camera" | "system" | "env";
    payload: any;
    tags?: string[];
};
export type EmotionVector = {
    calm: number;
    joy: number;
    curiosity: number;
    tenderness: number;
    anxiety: number;
    irritation: number;
    awe: number;
    passion: number;
};
export type EmotionState = EmotionVector & {
    intensity: number;
    lastUpdate: number;
};
export type MemoryTrace = {
    id: string;
    fromEventIds: string[];
    summary: string;
    affect: EmotionVector;
    salience: number;
    confidence: number;
    ts?: number;
};
export type SelfModel = {
    version: number;
    traits: {
        tempo: number;
        playfulness: number;
        extroversion: number;
        sensitivity: number;
        restraint: number;
    };
    style: {
        colorBias: string[];
        voiceTimbre: number;
        textProsody: number;
    };
    provenance: string[];
};
