import { Casualty } from './../../types/casualty.d';
import { Case } from './../../types/case.d';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-casualty-card',
  templateUrl: './casualty-card.component.html',
  styleUrls: ['./casualty-card.component.scss']
})
export class CasualtyCardComponent implements OnInit {

  @Input() casualty: Casualty;
  @Input() case: Case;
  @Input() arbitrate: boolean;
  @Input() chief: boolean = false;

  panelOpenState = false;

  constructor() { }

  ngOnInit() {
  }

  showNote(): void {
    this.panelOpenState = !this.panelOpenState;
  }

}
