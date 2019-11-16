import { Injury } from './injury';
export interface Casualty {
  _id?: any;
  name?: string;
  age?: number;
  contexts?: string[];
  injuries?: Injury[];
  details?: string;
}