import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { InjuryService } from 'src/app/services/injury.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Injury } from 'src/app/types/injury';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap, shareReplay, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-injuries-v2',
  templateUrl: './injuries-v2.component.html',
  styleUrls: ['./injuries-v2.component.scss']
})
export class InjuriesV2Component implements OnInit, AfterViewInit {

  injuries$!: Observable<Injury[]>;
  isLoading$ = new BehaviorSubject<boolean>(true);
  search = new FormControl('');
  search$ = new BehaviorSubject<string>('');

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject<boolean>(false);
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  searching$ = new BehaviorSubject<boolean>(false);

  constructor(
    private injuryService: InjuryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.injuries$ = this.getInjuries();
  }

  private getInjuries(): Observable<Injury[]> {
    return this.search.valueChanges.pipe(
      startWith(''),
      switchMap(searchText => this.injuryService.getInjuries().pipe(
        map(injuries => injuries.filter(injury => injury.name.toLowerCase().includes(searchText.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name)))
      )),
      tap(() => this.isLoading$.next(false)),
      shareReplay(1)
    );
  }

  openSearch() {
    this.searching$.next(true);
    this.focusSearchInput();
  }

  clearSearchInput() {
    this.search.setValue('');
  }

  closeSearch() {
    this.clearSearchInput();
    this.searching$.next(false);
  }

  focusSearchInput() {
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
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
