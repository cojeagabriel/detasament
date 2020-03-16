import { InjuryV2 } from 'src/app/types/injury-v2';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CasualtyRecord } from './../../types/casualty-record.d';
import { ScreenService } from './../../services/screen.service';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { map, filter, take } from 'rxjs/operators';
import { isNil } from 'lodash';

@Component({
  selector: 'app-dialog-norm-review',
  templateUrl: './dialog-norm-review.component.html',
  styleUrls: ['./dialog-norm-review.component.scss']
})
export class DialogNormReviewComponent implements OnInit, AfterViewInit {

  filter$ = new BehaviorSubject<boolean>(true);
  injuries$ = new BehaviorSubject<InjuryV2[] | null>(null);
  filteredInjuries$ = combineLatest(
    this.injuries$,
    this.filter$
    ).pipe(
      filter(([injuries, value]) => !!injuries),
      map(([injuries, value]) => {
        if (value) {
          return injuries.map(injury => {
            return {
              ...injury,
              maneuvers: injury.maneuvers.filter(maneuver => maneuver.selectedScore !== maneuver.score)
            };
          })
            .filter(filteredInjuries => filteredInjuries.maneuvers.length);
        }
        return injuries;
      })
    );

  totalScore = this.getTotalScore(this.data.record.injuries);
  additionalInfoExpanded$ = new BehaviorSubject(false);
  disableAnimation = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { record: CasualtyRecord },
    private screenService: ScreenService
  ) { }

  ngOnInit() {
    this.injuries$.next(this.data.record.injuries);
  }

  getCounter(index: number): string {
    index++;
    return index.toString().padStart(2, '0');
  }

  toggleAdditionalInfo() {
    this.additionalInfoExpanded$.next(!this.additionalInfoExpanded$.getValue());
  }

  back() {
    this.screenService.close();
  }

  close() {
    this.screenService.close();
    window.history.go(-1);
  }

  setSelectedScore(injuryIndex: number, maneuverIndex: number, selectedScore: number) {
    const injuries = this.injuries$.getValue();
    this.filteredInjuries$.pipe(
      take(1)
    ).subscribe(filteredInjuries => {
      this.injuries$.next(injuries.map(injury => {
        if (filteredInjuries[injuryIndex].id === injury.id) {
          return {
            ...injury,
            maneuvers: injury.maneuvers.map(maneuver => {
              if (filteredInjuries[injuryIndex].maneuvers[maneuverIndex].description === maneuver.description) {
                return {
                  ...maneuver,
                  selectedScore
                };
              }
              return maneuver;
            })
          };
        }
        return injury;
      }));
    });
  }

  getScore(): number {
    return this.injuries$.getValue().map(injury => {
      return injury.maneuvers.filter(maneuver => !isNil(maneuver.selectedScore))
        .map(maneuver => maneuver.selectedScore)
        .reduce((total: number, score: number) => total + score, 0);
    })
    .reduce((total: number, sum: number) => total + sum, 0);
  }

  getTotalScore(injuries: InjuryV2[]): number {
    return injuries.map(injury => {
      return injury.maneuvers
        .map(maneuver => maneuver.score)
        .reduce((total: number, score: number) => total + score, 0);
    })
      .reduce((total: number, sum: number) => total + sum, 0);
  }

  toggleShowAll() {
    this.filter$.next(!this.filter$.getValue());
  }

  ngAfterViewInit() {
    setTimeout(() => this.disableAnimation = false);
  }

}
