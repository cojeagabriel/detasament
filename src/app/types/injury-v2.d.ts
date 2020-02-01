import { ManeuverV2 } from './maneuver-v2.d';

export interface InjuryV2 {
  id?: string;
  name: string;
  maneuvers: ManeuverV2[];
  default: boolean
}
