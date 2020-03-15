import { trigger, transition, style, animate, state } from '@angular/animations';
import { Lap } from './../../types/lap.d';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CaseV2 } from './../../types/case-v2.d';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { CasualtyV2 } from 'src/app/types/casualty-v2';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreDocument, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';
import { chiefInjuries } from 'src/app/constants/chief-injuries.constant';
import { InjuryV2 } from 'src/app/types/injury-v2';
import { isNil } from 'lodash';
import { CasualtyRecord } from 'src/app/types/casualty-record';
import { MatDialog } from '@angular/material';
import { ScreenService } from 'src/app/services/screen.service';
import { DialogNormReviewComponent } from '../dialog-norm-review/dialog-norm-review.component';

@Component({
  selector: 'app-chief-norm',
  templateUrl: './chief-norm.component.html',
  styleUrls: ['./chief-norm.component.scss'],
  animations: [
    trigger('split', [
      state('split', style({
        width: 'calc(50% - 8px)'
      })),
      transition(':enter', [
        style({
          width: '100%'
        }),
        animate('0.3s cubic-bezier(0.215, 0.61, 0.355, 1)')
      ]),
      transition(':leave', [
        animate('0.3s cubic-bezier(0.215, 0.61, 0.355, 1)', style({
          opacity: 0,
          width: '100%'
        }))
      ])
    ]),
    trigger('fade', [
      state('fade', style({
        opacity: 1
      })),
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('0.3s cubic-bezier(0.215, 0.61, 0.355, 1)')
      ]),
      transition(':leave', [
        animate('0.3s cubic-bezier(0.215, 0.61, 0.355, 1)', style({
          opacity: 0
        }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiefNormComponent implements OnInit, OnDestroy, AfterViewInit {

  objectKeys = Object.keys;

  casualtyRef: AngularFirestoreDocument<CasualtyV2>;
  casualty$: Observable<CasualtyV2>;
  caseRef: AngularFirestoreDocument;
  case$: Observable<any>;
  casualties$: Observable<CasualtyV2[]>;
  casualtySubject$ = new BehaviorSubject<CasualtyV2 | null>(null);
  injuries$ = new BehaviorSubject<InjuryV2[] | null>(null);

  time$ = new BehaviorSubject<number>(0);
  timerInterval;
  laps$ = new BehaviorSubject<Lap[]>([]);
  started$ = new BehaviorSubject<boolean>(false);
  stopped$ = new BehaviorSubject<boolean>(false);

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
    this.route.parent.parent.params.pipe(
      filter(params => params.id),
      map(params => params.id),
      untilDestroyed(this)
    ).subscribe(caseId => {
      this.caseRef = this.db.collection('cases').doc<CaseV2>(caseId);
      this.case$ = this.getCaseObservable();
      this.casualties$ = this.getCasualtiesObservable();
    });

    this.route.params.pipe(
      filter(params => params.id),
      map(params => params.id),
      untilDestroyed(this)
    ).subscribe(casualtyId => {
      this.casualtyRef = this.db.collection('casualties').doc<CasualtyV2>(casualtyId);
      this.casualty$ = this.getCasualtyObservable();
    });

    this.casualty$.pipe(
      filter(casualty => !!casualty),
      untilDestroyed(this)
    ).subscribe(casualty => {
      this.casualtySubject$.next(casualty);
      this.injuries$.next(casualty.injuries as InjuryV2[]);
    });
  }
  ngOnDestroy() {}

  start() {
    this.started$.next(true);
    this.timerInterval = setInterval(() => {
      this.time$.next(this.time$.getValue() + 1);
    }, 1000);
  }

  stop() {
    clearInterval(this.timerInterval);
    this.stopped$.next(true);
  }

  lap() {
    this.laps$.next([
      ...this.laps$.getValue(),
      {
        time: this.time$.getValue()
      }
    ]);
  }

  finish() {
    this.reset();
  }

  reset() {
    this.time$.next(0);
    this.laps$.next([]);
    this.started$.next(false);
    this.stopped$.next(false);
  }

  openNormReview() {
    const dialogRef = this.matDialog.open(DialogNormReviewComponent, {
      closeOnNavigation: false,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      autoFocus: false,
      data: {
        record: this.getRecord()
      }
    });
    this.screenService.push(dialogRef);
  }

  getRecord(): CasualtyRecord {
    const casualty = this.casualtySubject$.getValue();
    const injuries = this.injuries$.getValue();
    return {
      name: casualty.name,
      age: casualty.age,
      details: casualty.details || null,
      injuries
    };
  }

  canFinish(): boolean {
    const injuries = this.injuries$.getValue();
    if (!injuries) {
      return false;
    }

    for (const injury of injuries) {
      if (injury.maneuvers.find(maneuver => isNil(maneuver.selectedScore))) {
        return false;
      }
    }
    return true;
  }

  setSelectedScore(injuryIndex: number, maneuverIndex: number, selectedScore: number) {
    const injuries = this.injuries$.getValue();
    injuries[injuryIndex].maneuvers[maneuverIndex].selectedScore = selectedScore;
    this.injuries$.next(injuries);
  }

  private getCaseObservable(): Observable<any> {
    return this.caseRef.snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data();
        const id = actions.payload.id;
        return { ...data, id };
      })
    );
  }

  private getCasualtyObservable(): Observable<CasualtyV2> {
    return this.casualtyRef.snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data();
        const id = actions.payload.id;
        return { ...data, id };
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
            };
          })
        );
      }),
    );
  }

  private getCasualtiesObservable(): Observable<CasualtyV2[]> {
    return this.case$.pipe(
      switchMap(cs => {
        const casualties$ = cs.casualties.map(casualtyId => {
          return this.db.collection('casualties').doc<CasualtyV2>(casualtyId).snapshotChanges();
        });
        return combineLatest(casualties$);
      }),
      map(casualtiesActions => {
        return casualtiesActions
          .filter((actions: Action<DocumentSnapshot<CasualtyV2>>) => actions.payload.data())
          .map((actions: Action<DocumentSnapshot<CasualtyV2>>) => {
            const data = actions.payload.data();
            const id = actions.payload.id;
            return { ...data, id };
          });
      }),
    );
  }

  getCounter(index: number): string {
    index ++;
    return index.toString().padStart(2, '0');
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

}
