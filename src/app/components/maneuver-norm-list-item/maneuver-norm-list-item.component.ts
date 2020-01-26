import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ManeuverV2 } from './../../types/maneuver-v2.d';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-maneuver-norm-list-item',
  templateUrl: './maneuver-norm-list-item.component.html',
  styleUrls: ['./maneuver-norm-list-item.component.scss']
})
export class ManeuverNormListItemComponent implements OnInit {

  @Input() maneuver: ManeuverV2;
  @Output() scoreChange = new EventEmitter<number>();
  @Output() selected = new EventEmitter<boolean>();

  score$ = new BehaviorSubject<number | null>(null);

  constructor() { }

  ngOnInit() {
  }

  onScoreChange(value: number) {
    if (value === this.maneuver.score / 2 && !this.maneuver.average) {
      return;
    }

    const score = this.score$.getValue();
    if (score !== value) {
      if (score !== null) {
        this.scoreChange.emit(-score + value);
      } else {
        this.scoreChange.emit(value);
        this.selected.emit(true);
      }
      this.score$.next(value);
    } else {
      this.scoreChange.emit(-score);
      this.score$.next(null);
      this.selected.emit(false);
    }
  }

}
