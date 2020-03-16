import { Timer } from 'src/app/types/timer';
import { InjuryV2 } from "./injury-v2";

export interface CasualtyRecord {
    timer?: Timer,
    arbitrator?: string,
    participant?: string,
    name: string,
    age: number,
    details?: string,
    injuries: InjuryV2[],
    date?: string
}
