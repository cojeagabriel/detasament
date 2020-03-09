import { Timer } from 'src/app/types/timer';
export interface CaseV2 {
    id?: string,
    name: string,
    details?: string,
    casualties: string[],
    new?: boolean,
    status?: string,
    started?: boolean,
    stopped?: boolean
    timer?: Timer
}