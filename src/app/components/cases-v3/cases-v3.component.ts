import { CaseV2 } from './../../types/case-v2.d';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, map, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cases-v3',
  templateUrl: './cases-v3.component.html',
  styleUrls: ['./cases-v3.component.scss']
})
export class CasesV3Component implements OnInit, AfterViewInit {

  search = new FormControl('');
  cases$ = this.getCasesObservable();

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
    this.cases$.subscribe(res => this.loading$.next(false));
  }

  private getCasesObservable(): Observable<CaseV2[]> {
    return this.search.valueChanges.pipe(
      startWith(''),
      switchMap(searchText => {
        return this.db.collection<CaseV2>('cases', ref => ref.orderBy('name', 'asc')).valueChanges({ idField: 'id' }).pipe(
          map((cases: CaseV2[]) => {
            return cases.filter(cs => cs.name.toLowerCase().includes(searchText.toLowerCase()));
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
