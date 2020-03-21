import { Pipe, PipeTransform } from '@angular/core';
import { InjuryV2 } from '../types/injury-v2';

@Pipe({
  name: 'injuriesToString'
})
export class InjuriesToStringPipe implements PipeTransform {

  transform(injuries: InjuryV2[]): any {
    let str = '';
    if (injuries != null) {
      for (let i = 0; i < injuries.length; i++) {
        if (i < injuries.length - 1) {
          str += injuries[i].name + ', ';
        } else {
          str += injuries[i].name;
        }
      }
    }
    return str;
  }

}
