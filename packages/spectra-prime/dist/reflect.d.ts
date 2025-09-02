import { MemoryTrace, SelfModel } from "./types";
type DB = {
    topRecentTraces: (n: number) => Promise<MemoryTrace[]>;
    saveSelfModel: (m: SelfModel) => Promise<void>;
};
export declare function nightlyReflect(db: DB, selfModel: SelfModel): Promise<SelfModel>;
export {};
