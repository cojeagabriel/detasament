import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-casualties',
  templateUrl: './casualties.component.html',
  styleUrls: ['./casualties.component.scss']
})
export class CasualtiesComponent implements OnInit, AfterViewInit {

  isLoading$ = new BehaviorSubject(true);

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);

  constructor() { }

  ngOnInit() {
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

  back() {}

  openSearch() {}

}
