import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BottomNavigationService {

  visible$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  show() {
    this.visible$.next(true);
  }

  hide() {
    this.visible$.next(false);
  }

  toggle() {
    this.visible$.next(!this.visible$.getValue());
  }
}
