export interface CaseV2 {
    id?: string,
    name: string,
    details?: string,
    casualties: string[],
    new?: boolean,
    timer?: string,
    status?: string,
    started?: boolean,
    stopped?: boolean
}