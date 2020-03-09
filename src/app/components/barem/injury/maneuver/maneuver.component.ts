import { Maneuver } from './../../../../types/maneuver.d';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: ['./maneuver.component.scss']
})
export class ManeuverComponent implements OnInit {

  @Input() maneuver: Maneuver;
  @Output() scoreEmitter = new EventEmitter<number>();

  score: Number = null;

  constructor() { }

  ngOnInit() {
  }

  selectScore(score: number): void {
    if(this.score != score) {
      if (this.score != null)
        this.scoreEmitter.emit(-this.score + score);
      else
        this.scoreEmitter.emit(score);
      this.score = score;
    } else {
      this.scoreEmitter.emit(-this.score);
      this.score = null;
    }
  }

}
