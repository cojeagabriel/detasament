import { CasualtyService } from './../../services/casualty.service';
import { CaseService } from './../../services/case.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, tap, switchMap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Case } from 'src/app/types/case';
import { InjuryService } from 'src/app/services/injury.service';
import { Injury } from 'src/app/types/injury';
import { Casualty } from 'src/app/types/casualty';

@Component({
  selector: 'app-barem',
  templateUrl: './barem.component.html',
  styleUrls: ['./barem.component.scss']
})
export class BaremComponent implements OnInit {

  chief = false;
  case$: Observable<Case>;
  victim$: Observable<Casualty>;
  baremStart$: Observable<Injury[]>;
  baremEnd$: Observable<Injury[]>;

  score: number = 0;
  totalScore: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private casualtyService: CasualtyService,
    private caseService: CaseService,
    private injuryService: InjuryService
  ) { }

  ngOnInit() {
    this.case$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        return this.caseService.getCaseByCode(params.id);
      })
    );

    this.victim$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        if( params.victimId === "chief" ) {
          this.chief = true;
          return this.casualtyService.getChief().pipe(
            tap(victim => {
              this.calculateTotalScore(victim.injuries);
            })
          );
        }
        return this.casualtyService.getCasualty(params.victimId).pipe(
          tap(victim => {
            this.calculateTotalScore(victim.injuries);
          })
        );
      }),
      shareReplay(1)
    );

    this.baremStart$ = this.injuryService.getDefaultInjuries().pipe(
      map(injuries => {
        injuries.splice(2,2);
        this.calculateTotalScore(injuries);
        return injuries;
      }),
      shareReplay(1)
    );

    this.baremEnd$ = this.injuryService.getDefaultInjuries().pipe(
      map(injuries => {
        injuries.splice(0,2);
        this.calculateTotalScore(injuries);
        return injuries;
      }),
      shareReplay(1)
    );
  }

  calculateScore(score: number): void {
    this.score += score;
  }

  calculateTotalScore(injuries: Injury[]): void{
    injuries.map(injury => injury.maneuvers.map(maneuver => this.totalScore += maneuver.score.maximum));
  }

}
