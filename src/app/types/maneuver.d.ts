export interface Maneuver {
    _id?: string;
    description: string;
    score: {
        average?: number;
        maximum: number;
    }
}