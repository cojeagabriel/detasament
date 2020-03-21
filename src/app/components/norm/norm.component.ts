import { BehaviorSubject } from 'rxjs';
import { InjuryV2 } from 'src/app/types/injury-v2';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { isNil } from 'lodash';

@Component({
  selector: 'app-norm',
  templateUrl: './norm.component.html',
  styleUrls: ['./norm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NormComponent implements OnInit, OnDestroy {

  objectKeys = Object.keys;

  @Input() injuries: InjuryV2[];
  @Input() showCounting = true;
  @Input()
  set expandedMap(expandedMap: { [key: number]: boolean }) {
    this.expandedMap$.next(expandedMap);
  }
  expandedMap$ = new BehaviorSubject<{ [key: number]: boolean }>({});

  @Output() scoreChange = new EventEmitter<{
    injuryIndex: number,
    maneuverIndex: number,
    selectedScore: number
  }>();
  @Output() expandedChanged = new EventEmitter<{ index: number, value: boolean }>();

  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy() {}

  onScoreChange(injuryIndex: number, maneuverIndex: number, selectedScore: number) {
    this.scoreChange.emit({ injuryIndex, maneuverIndex, selectedScore});
  }

  onExpandedChange(index: number, value: boolean) {
    this.expandedChanged.emit({ index, value });
  }

  getCount(injuryIndex: number): number {
    return this.injuries[injuryIndex].maneuvers.filter(maneuver => !isNil(maneuver.selectedScore))
      .map(maneuver => maneuver.selectedScore)
      .reduce((total: number, score: number) => total + 1, 0);
  }

}
