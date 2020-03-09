import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ScreenService } from '../services/screen.service';

interface CanDeactivateComponent {
  canDeactivate(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardGuard implements CanDeactivate<CanDeactivateComponent>  {

  constructor(
    private location: Location,
    private screenService: ScreenService
  ) { }

  canDeactivate(
    component: CanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    if (component.canDeactivate) {
      component.canDeactivate();
    }
    const canDeactivateResult = this.screenService.canDeactivate();
    if (!canDeactivateResult) {
      this.location.go(currentState.url);
    }
    return canDeactivateResult;
  }

}
