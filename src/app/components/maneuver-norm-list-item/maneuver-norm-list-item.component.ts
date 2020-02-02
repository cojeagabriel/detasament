import { ManeuverV2 } from 'src/app/types/maneuver-v2.d';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { isNil } from 'lodash';

@Component({
  selector: 'app-maneuver-norm-list-item',
  templateUrl: './maneuver-norm-list-item.component.html',
  styleUrls: ['./maneuver-norm-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManeuverNormListItemComponent implements OnInit {

  @Input() maneuver: ManeuverV2;
  @Output() scoreChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onScoreChange(value: number) {
    const oldScore = this.maneuver.selectedScore;
    if (!isNil(oldScore) && oldScore === value) {
      this.scoreChange.next(null);
    } else {
      this.scoreChange.next(value);
    }
  }

  isSelected(): boolean {
    return !isNil(this.maneuver.selectedScore);
  }

}
