import { Injury } from './injury';
export interface CasualtyResponse {
    _id?: any;
    name?: string;
    age?: number;
    contexts?: string[];
    injuries?: string[];
    details?: string;
}