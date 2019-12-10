import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Casualty } from 'src/app/types/casualty';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-casualty-card-v2',
  templateUrl: './casualty-card-v2.component.html',
  styleUrls: ['./casualty-card-v2.component.scss']
})
export class CasualtyCardV2Component implements OnInit {

  @Input() casualty: Casualty;

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);

  constructor() { }

  ngOnInit() {
  }

}
