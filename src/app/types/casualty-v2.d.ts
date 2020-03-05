import { InjuryV2 } from 'src/app/types/injury-v2';

export interface CasualtyV2 {
    id?: string,
    name: string,
    age: number,
    injuries: { [key: string]: string } | InjuryV2[],
    details?: string,
    editable?: boolean,
    visible?: boolean,
    chief?: boolean
}