import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-injuries-card',
  templateUrl: './injuries-card.component.html',
  styleUrls: ['./injuries-card.component.scss']
})
export class InjuriesCardComponent implements OnInit {
  @Input() injury;

  constructor() {
  }

  ngOnInit() {
  }

}
