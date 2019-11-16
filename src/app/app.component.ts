import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, query, group, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('0 => 1, 1 => 2, 2 => 3, 3 => 4', [
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
      ]),
      transition('4 => 3, 3 => 2, 2 => 1, 1 => 0', [
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
      ]),
    ])
  ]
})
export class AppComponent {
  title = 'barem-app';

  constructor(router: Router, activatedRoute: ActivatedRoute) {
  }

  getState(outlet) {
    // console.log(outlet.activatedRouteData['state']);
    return outlet.activatedRouteData['state'];
  }
}
