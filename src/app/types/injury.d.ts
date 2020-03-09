import { Maneuver } from "./maneuver";

export interface Injury {
  _id?: any;
  name: string;
  maneuvers: Maneuver[];
}