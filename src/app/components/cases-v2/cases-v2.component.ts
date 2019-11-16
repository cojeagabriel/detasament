import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cases-v2',
  templateUrl: './cases-v2.component.html',
  styleUrls: ['./cases-v2.component.scss']
})
export class CasesV2Component implements OnInit, AfterViewInit {

  isLoading$ = new BehaviorSubject<boolean>(true);
  search = new FormControl('');
  search$ = new BehaviorSubject<string>('');

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject<boolean>(false);
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  searching$ = new BehaviorSubject<boolean>(false);

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
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
