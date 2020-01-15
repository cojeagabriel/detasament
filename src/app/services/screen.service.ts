import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  screens: MatSidenav[] = [];

  constructor() { }

  push(screen: MatSidenav) {
    this.screens.push(screen);
  }

  pop() {
    this.screens.pop();
  }

  close() {
    this.screens.pop().close();
  }

  canDeactivate(): boolean {
    if (this.screens.length) {
      this.close();
      return false;
    }
    return true;
  }
}
