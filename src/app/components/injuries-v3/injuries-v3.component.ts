import { InjuryV2 } from './../../types/injury-v2.d';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-injuries-v3',
  templateUrl: './injuries-v3.component.html',
  styleUrls: ['./injuries-v3.component.scss']
})
export class InjuriesV3Component implements OnInit, AfterViewInit {

  search = new FormControl('');
  injuries$ = this.getInjuriesObservable();

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(true);
  searching$ = new BehaviorSubject(false);


  constructor(
    private db: AngularFirestore,
    private location: Location
  ) { }

  ngOnInit() {
    this.injuries$.subscribe(res => this.loading$.next(false));
  }

  private getInjuriesObservable(): Observable<InjuryV2[]> {
    return this.search.valueChanges.pipe(
      startWith(''),
      switchMap(searchText => {
        return this.db.collection<InjuryV2>('injuries', ref => ref.orderBy('name', 'asc')).valueChanges({ idField: 'id' })
          .pipe(
            map(injuries => {
              return injuries.filter(injury => injury.name.toLowerCase().includes(searchText.toLowerCase()));
            })
          );
      }),
      shareReplay(1)
    );
  }

  openSearch() {
    this.searching$.next(true);
    this.focusSearchInput();
  }

  focusSearchInput() {
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }

  clearSearchInput() {
    this.search.setValue('');
  }

  closeSearch() {
    this.clearSearchInput();
    this.searching$.next(false);
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
