import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-injuries-v3',
  templateUrl: './injuries-v3.component.html',
  styleUrls: ['./injuries-v3.component.scss']
})
export class InjuriesV3Component implements OnInit, AfterViewInit {

  injuries$ = this.db.collection('injuries').valueChanges({idField: 'id'});

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(true);


  constructor(
    private db: AngularFirestore,
    private location: Location
  ) { }

  ngOnInit() {
    this.injuries$.subscribe(res => this.loading$.next(false));
  }

  back() {
    this.location.back();
  }

  ngAfterViewInit() {
    this.screen.nativeElement.addEventListener(
      'scroll',
      () => {
        const scrollTop = this.screen.nativeElement.scrollTop;
        if (scrollTop > 0 && this.scrolling$.getValue() === false) {
          this.scrolling$.next(true);
        } else if (scrollTop === 0 && this.scrolling$.getValue() === true) {
          this.scrolling$.next(false);
        }
      },
      true
    );
  }

}
