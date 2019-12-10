import { Casualty } from 'src/app/types/casualty';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-casualty-card-v2',
  templateUrl: './casualty-card-v2.component.html',
  styleUrls: ['./casualty-card-v2.component.scss']
})
export class CasualtyCardV2Component implements OnInit {

  @Input() casualty: Casualty;

  constructor() { }

  ngOnInit() {
  }

}
