import { Casualty } from 'src/app/types/casualty';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CasualtyService } from 'src/app/services/casualty.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-casualty',
  templateUrl: './casualty.component.html',
  styleUrls: ['./casualty.component.scss']
})
export class CasualtyComponent implements OnInit, AfterViewInit {

  casualty$ = new Observable<Casualty>();

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);

  constructor(
    private casualtyService: CasualtyService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.casualty$ = this.route.params.pipe(
      switchMap(params => this.casualtyService.getCasualty(params.id))
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
