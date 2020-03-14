import { BottomNavigationService } from './services/bottom-navigation.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, query, group, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('0 => 1, 1 => 2, 1 => 3, 2 => 3, 2 => 4, 3 => 4, 4 => 5', [
        query(':enter', style({ transform: 'translateX(100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        // animate the leave page away
        group([
          query(':leave', [
            animate('0.3s ease', style({ transform: 'translateX(-100%)' })),
          ]),
          // and now reveal the enter
          query(':enter', animate('0.3s ease', style({ transform: 'translateX(0)' }))),
        ]),
        // animate('1s', style({ height: '*'})),
        query('router-outlet ~ *', [style({}), animate(1, style({}))], { optional: true }),
      ]),
      transition('5 => 4, 4 => 3, 4 => 2, 3 => 2, 3 => 1, 2 => 1, 1 => 0', [
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        // animate the leave page away
        group([
          query(':leave', [
            animate('0.3s ease', style({ transform: 'translateX(100%)' })),
          ]),
          // and now reveal the enter
          query(':enter', animate('0.3s ease', style({ transform: 'translateX(0)' }))),
        ]),
        // animate('1s', style({ height: '*'})),
        query('router-outlet ~ *', [style({}), animate(1, style({}))], { optional: true }),
      ]),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'barem-app';
  bottomNavigationVisible$ = this.bottomNavigationService.visible$;

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    private bottomNavigationService: BottomNavigationService
  ) {}

  getState(outlet) {
    return outlet.activatedRouteData['state'];
  }
}
