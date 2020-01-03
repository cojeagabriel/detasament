import { CasualtyV2 } from './../../types/casualty-v2.d';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-casualty-v2',
  templateUrl: './casualty-v2.component.html',
  styleUrls: ['./casualty-v2.component.scss']
})
export class CasualtyV2Component implements OnInit, OnDestroy, AfterViewInit {

  objectKeys = Object.keys;
  casualty$!: Observable<any>;

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);

  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.casualty$ = this.route.params.pipe(
      switchMap(params => this.db.collection('casualties').doc<CasualtyV2>(params.id).valueChanges()),
      map(casualty => {
        const injuries = Object.keys(casualty.injuries).map(id => {
          return {
            id,
            name: casualty.injuries[id]
          };
        });
        return {
          ...casualty,
          injuries
        };
      }),
      shareReplay(1)
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
