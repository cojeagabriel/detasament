import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Case } from '../types/case';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  case: Case = {
    count: 3,
    context: 'cutremur',
    casualties: []
  }

  constructor(
    private http: HttpClient
  ) { }

  getCase(): Observable<Case> {
    return of(this.case);
  }

  getCases(): Observable<Case> {
    return this.http.get('https://barem-dezastre.herokuapp.com/cases/');
  }

  getCaseByCode(caseCode: string): Observable<Case> {
    return this.http.get(`https://barem-dezastre.herokuapp.com/cases/${caseCode}`).pipe(map(cs => cs[0]));
  }

  postCase(cs: Case): Observable<Case> {
    return this.http.post(`https://barem-dezastre.herokuapp.com/cases`, cs);
  }

  patchCase(caseUpdate: Partial<Case>): Observable<Case> {

    this.case = {
      ...this.case,
      ...caseUpdate
    };

    return of(this.case);
  }

  deleteCase(casecode) {
    return this.http.delete(`https://barem-dezastre.herokuapp.com/cases/${casecode}`);
  }

}
