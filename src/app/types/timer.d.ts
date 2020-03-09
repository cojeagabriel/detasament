import { Lap } from './lap.d';
export interface Timer {
    caseId?: string,
    time?: number,
    started?: boolean,
    stopped?: boolean,
    laps?: Lap[]
}