import { CasualtyV2 } from './../../types/casualty-v2.d';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-casualty-card-v2',
  templateUrl: './casualty-card-v2.component.html',
  styleUrls: ['./casualty-card-v2.component.scss']
})
export class CasualtyCardV2Component implements OnInit {

  objectKeys = Object.keys;

  @Input() casualty: CasualtyV2;
  @Input() baseRoute = '';

  constructor() { }

  ngOnInit() {
  }

  getCasualtyRoute() {
    return `${this.baseRoute}${this.baseRoute ? '/' : ''}${this.casualty.id}`;
  }

}
