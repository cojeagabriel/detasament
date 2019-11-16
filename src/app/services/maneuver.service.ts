import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maneuver } from '../types/maneuver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManeuverService {

  constructor(
    private http: HttpClient
  ) { }

}
