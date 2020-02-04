import { CasualtyRecord } from 'src/app/types/casualty-record.d';
import { ScreenService } from 'src/app/services/screen.service';
import { DialogNormReviewComponent } from './../dialog-norm-review/dialog-norm-review.component';
import { MatDialog } from '@angular/material';
import { defaultInjuriesAfter } from 'src/app/constants/default-injuries-after.contants';
import { InjuryV2 } from 'src/app/types/injury-v2';
import { CasualtyV2 } from 'src/app/types/casualty-v2.d';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Location } from '@angular/common';
import { switchMap, map, tap, filter } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { defaultInjuriesBefore } from 'src/app/constants/default-injuries-before.constant';
import { isNil } from 'lodash';

@Component({
  selector: 'app-casualty-norm',
  templateUrl: './casualty-norm.component.html',
  styleUrls: ['./casualty-norm.component.scss']
})
export class CasualtyNormComponent implements OnInit, OnDestroy, AfterViewInit {

  casualty$ = new BehaviorSubject<CasualtyV2 | null>(null);
  injuries$ = new BehaviorSubject<InjuryV2[] | null>(null);

  @ViewChild('screen', { static: false }) screen: ElementRef;
  @ViewChild('content', { static: false }) content: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);
  additionalInfoExpanded$ = new BehaviorSubject(false);
  disableAnimation = true;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private matDialog: MatDialog,
    private screenService: ScreenService
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
        casualty.injuries = {
          ...defaultInjuriesBefore,
          ...casualty.injuries,
          ...defaultInjuriesAfter
        };
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
    });
  }
  ngOnDestroy() {}

  toggleAdditionalInfo() {
    this.additionalInfoExpanded$.next(!this.additionalInfoExpanded$.getValue());
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
    const casualty = this.casualty$.getValue();
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
