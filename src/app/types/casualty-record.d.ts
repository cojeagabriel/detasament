import { InjuryV2 } from "./injury-v2";

export interface CasualtyRecord {
    arbitrator?: string,
    participant?: string,
    name: string,
    age: number,
    details?: string,
    injuries: InjuryV2[],
    date?: string
}
