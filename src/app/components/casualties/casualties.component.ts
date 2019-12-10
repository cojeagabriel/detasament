import { CasualtyService } from './../../services/casualty.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Casualty } from 'src/app/types/casualty';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-casualties',
  templateUrl: './casualties.component.html',
  styleUrls: ['./casualties.component.scss']
})
export class CasualtiesComponent implements OnInit, AfterViewInit {

  casualties$ = this.getCasualtiesObservable();
  isLoading$ = new BehaviorSubject(true);

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);

  constructor(
    private casualtyService: CasualtyService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  private getCasualtiesObservable(): Observable<Casualty[]> {
    return this.casualtyService.getCasualties();
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

  back() {
    this.location.back();
  }

  openSearch() {}

}
