import { ManeuverV2 } from './../../types/maneuver-v2.d';
import { InjuryV2 } from 'src/app/types/injury-v2';
import { CasualtyV2 } from './../../types/casualty-v2.d';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Location } from '@angular/common';
import { switchMap, map, tap, filter } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-casualty-norm',
  templateUrl: './casualty-norm.component.html',
  styleUrls: ['./casualty-norm.component.scss']
})
export class CasualtyNormComponent implements OnInit, OnDestroy, AfterViewInit {

  casualty$ = new BehaviorSubject<CasualtyV2 | null>(null);
  injuries$ = new BehaviorSubject<InjuryV2[] | null>(null);

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);

  totalScore = 0;
  score = 0;
  count = {};

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => params.id),
      switchMap(params => {
        return this.db.collection('casualties').doc<CasualtyV2>(params.id).snapshotChanges().pipe(
          map(actions => {
            const data = actions.payload.data();
            const id = actions.payload.id;
            return { ...data, id };
          })
        );
      }),
      tap(casualty => this.casualty$.next(casualty)),
      switchMap(casualty => {
        const injuries$ = Object.keys(casualty.injuries).map(injuryId => {
          return this.db.collection('injuries').doc<InjuryV2>(injuryId).snapshotChanges().pipe(
            map(actions => {
              const data = actions.payload.data();
              const id = actions.payload.id;
              return { ...data, id };
            })
          );
        });
        return combineLatest(injuries$);
      }),
      untilDestroyed(this)
    ).subscribe(injuries => {
      this.injuries$.next(injuries);
      this.initScores(injuries);
    });
  }
  ngOnDestroy() {}

  initScores(injuries: InjuryV2[]) {
    injuries.forEach(injury => {
      this.totalScore += injury.maneuvers
        .map((value: ManeuverV2) => value.score)
        .reduce((total: number, value: number) => total + value);
      this.count[injury.id] = {
        maximum: injury.maneuvers.length,
        value: 0
      };
    });

    console.log(this.totalScore);
  }


  canFinish(): boolean {
    if (!Object.values(this.count).length) {
      return;
    }
    const count = Object.values(this.count)
      .map((value: { maximum: number, value: number }) => value.value)
      .reduce((total: number, value: number) => total + value);
    const maximum = Object.values(this.count)
      .map((value: { maximum: number, value: number }) => value.maximum)
      .reduce((total: number, value: number) => total + value);
    return count === maximum;
  }

  countSelection(selected: boolean, injuryId: string) {
    if (selected) {
      this.count[injuryId].value++;
    } else {
      this.count[injuryId].value--;
    }
  }

  changeScore(change: number) {
    this.score += change;
  }

  back() {
    this.location.back();
  }

  ngAfterViewInit() {
    this.screen.nativeElement.addEventListener('scroll', () => {
      const scrollTop = this.screen.nativeElement.scrollTop;
      if (scrollTop > 0 && this.scrolling$.getValue() === false) {
        this.scrolling$.next(true);
      } else if (scrollTop === 0 && this.scrolling$.getValue() === true) {
        this.scrolling$.next(false);
      }
    }, true);
  }

}
