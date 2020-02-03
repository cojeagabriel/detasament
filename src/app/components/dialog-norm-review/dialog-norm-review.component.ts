import { InjuryV2 } from 'src/app/types/injury-v2';
import { BehaviorSubject } from 'rxjs';
import { CasualtyRecord } from './../../types/casualty-record.d';
import { ScreenService } from './../../services/screen.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, withLatestFrom, filter, take } from 'rxjs/operators';
import { isNil } from 'lodash';

@Component({
  selector: 'app-dialog-norm-review',
  templateUrl: './dialog-norm-review.component.html',
  styleUrls: ['./dialog-norm-review.component.scss']
})
export class DialogNormReviewComponent implements OnInit {

  filter$ = new BehaviorSubject<boolean>(true);
  injuries$ = new BehaviorSubject<InjuryV2[] | null>(null);
  filteredInjuries$ = this.injuries$.pipe(
    filter(injuries => !!injuries),
    withLatestFrom(this.filter$),
    map(([injuries, value]) => {
      console.log(value);
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

  constructor(
    private dialogRef: MatDialogRef<DialogNormReviewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { record: CasualtyRecord },
    private screenService: ScreenService
  ) { }

  ngOnInit() {
    this.injuries$.next(this.data.record.injuries);
    this.filter$.subscribe(res => console.log(res));
  }

  close() {
    this.screenService.close();
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
    // console.log(this.filter$.getValue());
    const filterValue = this.filter$.getValue();
    this.filter$.next(!filterValue);
  }

}
