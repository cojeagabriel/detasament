import { untilDestroyed } from 'ngx-take-until-destroy';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogAddScoreComponent } from '../dialog-add-score/dialog-add-score.component';
import { Maneuver } from 'src/app/types/maneuver';
import { tap, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-maneuver',
  templateUrl: './add-maneuver.component.html',
  styleUrls: ['./add-maneuver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddManeuverComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  set maneuver(maneuver: { maneuver: Maneuver, index: number }) {
    if (maneuver) {
      this.initManeuver();
      this.setFromManeuver(maneuver.maneuver);
      this.editManeuver$.next(maneuver);
    }
  }
  editManeuver$ = new BehaviorSubject <{ maneuver: Maneuver, index: number } | null>(null);

  description = '';
  score = {
    average: false,
    maximum: {
      1: false,
      2: false,
      4: false,
      8: false
    }
  };

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject<boolean>(false);

  @Output() setManeuver = new EventEmitter<{ maneuver: Maneuver | null, index: number | null }>();
  @Output() backEmitter = new EventEmitter<boolean>();

  locationSubscription!: SubscriptionLike;

  constructor(
    public dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit() {
    // this.preventBackButton();
  }

  private initManeuver(): void {
    this.description = '';
    this.score = {
      average: false,
      maximum: {
        1: false,
        2: false,
        4: false,
        8: false
      }
    };
    this.editManeuver$.next(null);
  }

  private setFromManeuver(maneuver: Maneuver): void {
    this.description = maneuver.description;
    this.setScore(this.score.maximum, maneuver.score.maximum + '');
    if (maneuver.score.average) {
      this.score.average = true;
    }
  }

  save(): void {
    const score = {
      maximum: this.getScore(this.score.maximum)
    };
    if (this.score.average && score.maximum > 1) {
      score['average'] = score.maximum / 2;
    }
    const maneuver = {
      description: this.description,
      score
    };

    const editManeuver = this.editManeuver$.getValue();
    if (!editManeuver) {
      this.setManeuver.emit({
        maneuver,
        index: null
      });
    } else {
      this.setManeuver.emit({
        maneuver,
        index: editManeuver.index
      });
    }
    this.initManeuver();
  }

  delete(): void {
    const editManeuver = this.editManeuver$.getValue();
    this.setManeuver.emit({maneuver: null, index: editManeuver.index});
    this.initManeuver();
  }

  getKeys(object): string[] {
    return Object.keys(object);
  }

  setScore(score: any, selectedScore: string): void {
    this.getKeys(score).map(key => score[key] = false);
    score[selectedScore] = true;

    if (+selectedScore % 2 !== 0) {
      this.score.average = false;
    }
  }

  getScore(score: any): number {
    return parseInt(this.getKeys(score).find(key => score[key] === true), 10);
  }

  openAddScoreDialog(type: string): void {
    const dialogRef = this.dialog.open(DialogAddScoreComponent, {
      width: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setScore(this.score[type], result);
      }
    });
  }

  back(): void {
    this.initManeuver();
    this.backEmitter.emit();
  }

  ngAfterViewInit() {
    this.screen.nativeElement.addEventListener('scroll', () => {
      const scrollTop = this.screen.nativeElement.scrollTop;
      const scrolling = this.scrolling$.getValue();
      if (scrollTop > 0 && scrolling === false) {
        this.scrolling$.next(true);
      } else if (scrollTop === 0 && scrolling === true) {
        this.scrolling$.next(false);
      }
    }, true);
  }

  preventBackButton() {
    this.locationSubscription = this.location.subscribe(() => {
      console.log('add-maneuver back');
      this.backEmitter.emit();
      history.pushState(null, null, location.href);
    });
  }

  ngOnDestroy() {
    // this.locationSubscription.unsubscribe();
  }
}
