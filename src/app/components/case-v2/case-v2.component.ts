import { untilDestroyed } from 'ngx-take-until-destroy';
import { CasualtyV2 } from './../../types/casualty-v2.d';
import { CaseV2 } from './../../types/case-v2.d';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap, map, shareReplay, filter, catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-case-v2',
  templateUrl: './case-v2.component.html',
  styleUrls: ['./case-v2.component.scss']
})
export class CaseV2Component implements OnInit, OnDestroy, AfterViewInit {

  case$!: Observable<CaseV2>;
  casualties$!: Observable<CasualtyV2[]>;

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);

  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.case$ = this.route.params.pipe(
      switchMap(params => this.db.collection('cases').doc<CaseV2>(params.id).snapshotChanges()),
      map(actions => {
        const data = actions.payload.data();
        const id = actions.payload.id;
        return {
          ...data,
          id
        };
      }),
      shareReplay(1)
    );

    this.casualties$ = this.case$.pipe(
      filter(cs => !!cs),
      switchMap(cs => {
        const casualties$ = cs.casualties.map(casualtyId => {
          return this.db.collection('casualties').doc<CasualtyV2>(casualtyId).snapshotChanges();
        });
        return combineLatest(casualties$);
      }),
      map(casualtiesActions => {
        return casualtiesActions
          .filter(actions => actions.payload.data())
          .map(actions => {
            const data = actions.payload.data();
            const id = actions.payload.id;
            return { ...data, id };
          });
      }),
    );
  }
  ngOnDestroy() {}

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
