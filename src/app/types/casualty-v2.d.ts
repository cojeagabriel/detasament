export interface CasualtyV2 {
    id?: string,
    name: string;
    age: number;
    injuries: { [key: string]: string }[];
    details?: string;
}