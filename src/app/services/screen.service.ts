import { Injectable } from '@angular/core';
import { MatSidenav, MatDialogRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  screens: (MatSidenav | MatDialogRef<any>)[] = [];

  constructor() { }

  push(screen: MatSidenav | MatDialogRef<any>) {
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

  log() {
    console.log(this.screens);
  }
}
