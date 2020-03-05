import { untilDestroyed } from 'ngx-take-until-destroy';
import { CaseV2 } from './../../types/case-v2.d';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { CasualtyV2 } from 'src/app/types/casualty-v2';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ScreenService } from 'src/app/services/screen.service';
import { Timer } from 'src/app/types/timer';
import { map, switchMap, tap, shareReplay, take, filter } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Case } from 'src/app/types/case';
import { chiefInjuries } from 'src/app/constants/chief-injuries.constant';
import { InjuryV2 } from 'src/app/types/injury-v2';

@Component({
  selector: 'app-chief-norm',
  templateUrl: './chief-norm.component.html',
  styleUrls: ['./chief-norm.component.scss']
})
export class ChiefNormComponent implements OnInit, OnDestroy, AfterViewInit {
  
  casualty$ = this.getCasualtyObservable();
  caseRef: AngularFirestoreDocument<CaseV2>;
  case$ = this.getCase();
  timer$ = this.getTimer();
  timerId$ = new BehaviorSubject<string | null>(null);
  time = 0;
  timerRef;

  @ViewChild('screen', { static: false }) screen: ElementRef;
  @ViewChild('content', { static: false }) content: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);
  additionalInfoExpanded$ = new BehaviorSubject(false);
  disableAnimation = true;

  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private location: Location,
    private matDialog: MatDialog,
    private screenService: ScreenService
  ) { }

  ngOnInit() {

  }
  ngOnDestroy() {}

  private getCasualtyObservable(): Observable<CasualtyV2> {
    return this.route.params.pipe(
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
      switchMap(casualty => {
        casualty.injuries = chiefInjuries;
        const injuries$ = Object.keys(casualty.injuries).map(injuryId => {
          return this.db.collection('injuries').doc<InjuryV2>(injuryId).snapshotChanges().pipe(
            map(actions => {
              const data = actions.payload.data();
              const id = actions.payload.id;
              return { ...data, id };
            })
          );
        });
        return combineLatest(injuries$).pipe(
          map(injuries => {
            return {
              ...casualty,
              injuries
            }
          })
        );
      }),
      untilDestroyed(this)
    );
  }

  private getCase(): Observable<CaseV2> {
    return this.route.parent.parent.params.pipe(
      map(params => params.id),
      switchMap(caseId => {
        this.caseRef = this.db.collection('cases').doc<CaseV2>(caseId);
        return this.db.collection('cases').doc<CaseV2>(caseId).snapshotChanges().pipe(
          map(actions => {
            const data = actions.payload.data();
            const id = actions.payload.id;
            return { ...data, id };
          })
        );
      }),
      shareReplay(1)
    );
  }

  private getTimer() {
    return this.case$.pipe(
      switchMap(cs => {
        return this.db.collection<Timer>('timers', ref => ref.where('caseId', '==', cs.id)).valueChanges({ idField: 'id' });
      }),
      map(cases => cases[0]),
      tap(timer => {
        this.timerId$.next(timer.id),
        this.time = timer.time;
      }),
      shareReplay(1)
    );
  }

  start() {
    this.timer();
    this.caseRef.update({ started: true });
  }

  stop() {
    clearInterval(this.timerRef);
    this.caseRef.update({ stopped: true });
  }

  lap() {
    this.db.collection<Timer>('timers').doc(this.timerId$.getValue()).update({
      laps: firebase.firestore.FieldValue.arrayUnion(this.time)
    });
  }

  reset() {
    this.time = 0;
    this.update();
  }

  finish() {
    this.stop();
    this.reset();
    this.db.collection<Timer>('timers').doc(this.timerId$.getValue()).update(
      {
        time: this.time,
        laps: []
      }
    );
    this.caseRef.update(
      {
        started: false,
        stopped: false
      }
    );
  }

  timer() {
    this.timerRef = setInterval(() => {
      this.time ++;
      this.update()
    }, 1000);
  }

  update() {
    this.db.collection<Timer>('timers').doc(this.timerId$.getValue()).update({ time: this.time })
  }

  toggleAdditionalInfo() {
    this.additionalInfoExpanded$.next(!this.additionalInfoExpanded$.getValue());
  }

  back() {
    this.location.back();
  }

  ngAfterViewInit() {
    setTimeout(() => this.disableAnimation = false);
    this.content.nativeElement.addEventListener('scroll', () => {
      const scrollTop = this.content.nativeElement.scrollTop;
      if (scrollTop > 0 && this.scrolling$.getValue() === false) {
        this.scrolling$.next(true);
      } else if (scrollTop === 0 && this.scrolling$.getValue() === true) {
        this.scrolling$.next(false);
      }
    }, true);
  }

  canDeactivate(): boolean {
    this.finish();
    return true;
  }

}
