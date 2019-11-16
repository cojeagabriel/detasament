import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Injury } from '../types/injury';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InjuryService {

  constructor(private http: HttpClient) {
  }

  getInjuries(): Observable<any> {
    return this.http.get('https://barem-dezastre.herokuapp.com/injuries');
  }

  getInjury(id: string): Observable<any> {
    return this.http.get('https://barem-dezastre.herokuapp.com/injuries').pipe(
      map(injuries => (injuries as Injury[]).filter(injury => injury._id === id)[0])
    );
  }

  addVictim(hero) {
    return this.http.post('https://barem-dezastre.herokuapp.com/victims', hero);
  }

  getDefaultInjuries(): Observable<Injury[]> {
    return (this.http.get('../../assets/data/defaultInjuries.json') as Observable<Injury[]>);
  }

  postInjury(injury: Injury): Observable<Injury> {
    return this.http.post(`https://barem-dezastre.herokuapp.com/injuries`, injury) as Observable<Injury>;
  }

  updateInjury(injury: Injury): Observable<Injury> {
    return this.http.patch(`https://barem-dezastre.herokuapp.com/injuries/${injury._id}`, injury) as Observable<Injury>;
  }

  deleteInjury(id: string): Observable<Injury> {
    return this.http.delete(`https://barem-dezastre.herokuapp.com/injuries/${id}`) as Observable<Injury>;
  }
}
