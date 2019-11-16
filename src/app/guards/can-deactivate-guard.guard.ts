import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, Router } from '@angular/router';
import { Location } from '@angular/common';

interface CanDeactivateComponent {
  canDeactivate(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardGuard implements CanDeactivate<CanDeactivateComponent>  {

  constructor(
    private location: Location,
  ) { }

  canDeactivate(
    component: CanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    const canDeactivateResult = component.canDeactivate();
    if (!canDeactivateResult) {
      // window.history.pushState({}, '', currentState.url);
      // const currentUrlTree = this.router.createUrlTree([], currentRoute);
      // const currentUrl = currentUrlTree.toString();
      // this.location.go(currentUrl);
      this.location.go(currentState.url);
      // window.history.pushState({}, '', currentState.url);
    }
    return canDeactivateResult;
  }

}
