import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injury } from 'src/app/types/injury';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { InjuryService } from 'src/app/services/injury.service';

@Component({
  selector: 'app-injury-v2',
  templateUrl: './injury-v2.component.html',
  styleUrls: ['./injury-v2.component.scss']
})
export class InjuryV2Component implements OnInit, AfterViewInit {

  injury$ = new Observable<Injury>();

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject<boolean>(false);

  constructor(
    private injuryService: InjuryService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.injury$ = this.route.params.pipe(
      switchMap(params => this.injuryService.getInjury(params.id))
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
