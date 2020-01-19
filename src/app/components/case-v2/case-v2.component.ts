import { CaseV2 } from './../../types/case-v2.d';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-case-v2',
  templateUrl: './case-v2.component.html',
  styleUrls: ['./case-v2.component.scss']
})
export class CaseV2Component implements OnInit, AfterViewInit {

  case$!: Observable<CaseV2>;

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);

  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.case$ = this.route.params.pipe(
      switchMap(params => this.db.collection('casualties').doc<CaseV2>(params.id).valueChanges()),
      shareReplay(1)
    );
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
