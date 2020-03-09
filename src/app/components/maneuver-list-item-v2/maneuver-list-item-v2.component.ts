import { ManeuverV2 } from './../../types/maneuver-v2.d';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-maneuver-list-item-v2',
  templateUrl: './maneuver-list-item-v2.component.html',
  styleUrls: ['./maneuver-list-item-v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManeuverListItemV2Component implements OnInit {

  @Input() maneuver!: ManeuverV2;

  constructor() { }

  ngOnInit() {
  }

}
