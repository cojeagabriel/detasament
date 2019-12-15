import { Maneuver } from "./maneuver";

export interface InjuryV2 {
  id?: string;
  name: string;
  maneuvers: Maneuver[];
}
