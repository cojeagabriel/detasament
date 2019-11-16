import { Component, OnInit, Input } from '@angular/core';
import { Maneuver } from 'src/app/types/maneuver';

@Component({
  selector: 'app-maneuver-list-item',
  templateUrl: './maneuver-list-item.component.html',
  styleUrls: ['./maneuver-list-item.component.scss']
})
export class ManeuverListItemComponent implements OnInit {

  @Input() maneuver!: Maneuver;

  constructor() { }

  ngOnInit() {
  }

}
