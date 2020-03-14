import { shareReplay, map, distinctUntilChanged, startWith, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavigationComponent implements OnInit {

  currentUrl$ = this.getCurrentUrlObservable();

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goTo(url: string) {
    if (url === '/cases') {
      this.location.back();
    } else {
      this.currentUrl$.pipe(
        take(1)
      ).subscribe(currentUrl => {
        this.router.navigate([url], { replaceUrl: currentUrl !== '/cases' ? true : false });
      });
    }
  }

  private getCurrentUrlObservable(): Observable<string> {
    return this.router.events.pipe(
      startWith(null),
      map(res => {
        return this.router.url;
      }),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

}
