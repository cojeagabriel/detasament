import { Injury } from './injury';
export interface Casualty {
  _id?: any;
  id?: string,
  name?: string;
  age?: number;
  contexts?: string[];
  injuries?: Injury[];
  details?: string;
}