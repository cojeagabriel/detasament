import { InjuryV2 } from 'src/app/types/injury-v2';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isNil } from 'lodash';

@Component({
  selector: 'app-norm',
  templateUrl: './norm.component.html',
  styleUrls: ['./norm.component.scss']
})
export class NormComponent implements OnInit {

  @Input() injuries: InjuryV2[];
  @Input() showCounting = true;
  @Output() scoreChange = new EventEmitter<{
    injuryIndex: number,
    maneuverIndex: number,
    selectedScore: number
  }>();

  constructor() { }

  ngOnInit() {
  }

  onScoreChange(injuryIndex: number, maneuverIndex: number, selectedScore: number) {
    this.scoreChange.emit({ injuryIndex, maneuverIndex, selectedScore});
  }

  getCount(injuryIndex: number): number {
    return this.injuries[injuryIndex].maneuvers.filter(maneuver => !isNil(maneuver.selectedScore))
      .map(maneuver => maneuver.selectedScore)
      .reduce((total: number, score: number) => total + 1, 0);
  }

}
