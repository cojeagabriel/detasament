import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CasualtyV2 } from 'src/app/types/casualty-v2';

@Component({
  selector: 'app-casualties-v2',
  templateUrl: './casualties-v2.component.html',
  styleUrls: ['./casualties-v2.component.scss']
})
export class CasualtiesV2Component implements OnInit, AfterViewInit {

  casualties$ = this.getCasualtiesObservable();

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(true);

  constructor(
    private db: AngularFirestore,
    private location: Location
  ) { }

  ngOnInit() {
    this.casualties$.subscribe(res => this.loading$.next(false));
  }

  back() {
    this.location.back();
  }

  private getCasualtiesObservable(): Observable<CasualtyV2[]> {
    return this.db.collection<CasualtyV2>('casualties', ref => ref.where('visible', '==', true)).valueChanges({ idField: 'id' });
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
