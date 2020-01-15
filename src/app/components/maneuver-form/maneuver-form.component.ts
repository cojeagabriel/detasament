import { ScreenService } from './../../services/screen.service';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ManeuverV2 } from './../../types/maneuver-v2.d';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DialogAddScoreComponent } from '../dialog-add-score/dialog-add-score.component';

@Component({
  selector: 'app-maneuver-form',
  templateUrl: './maneuver-form.component.html',
  styleUrls: ['./maneuver-form.component.scss']
})
export class ManeuverFormComponent implements OnInit, AfterViewInit {

  @Input()
  set maneuver(maneuver: { maneuver: ManeuverV2, index: number }) {
    if (maneuver) {
      this.form.patchValue({
        ...maneuver.maneuver,
        index: maneuver.index
      });
      this.setScore(maneuver.maneuver.score);
      this.editing$.next(true);
    }
  }

  form = this.fb.group({
    index: undefined,
    description: [undefined, Validators.required],
    score: [undefined, Validators.required],
    average: false
  });

  scores = this.getInitialScores();

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  editing$ = new BehaviorSubject(false);

  @Output() setManeuver = new EventEmitter<{ maneuver: ManeuverV2 | null, index: number | null }>();

  constructor(
    private fb: FormBuilder,
    private screenService: ScreenService,
    private matDialog: MatDialog
  ) { }

  getKeys(object): string[] {
    return Object.keys(object);
  }

  setScore(score: string | number): void {
    this.getKeys(this.scores).map(key => this.scores[key] = false);
    this.scores[score] = true;
    this.form.patchValue({
      score
    });

    if (+score % 2 !== 0) {
      this.form.patchValue({
        average: false
      });
      this.form.controls.average.disable();
    } else {
      this.form.controls.average.enable();
    }
  }

  openAddScoreDialog(type: string): void {
    const dialogRef = this.matDialog.open(DialogAddScoreComponent, {
      width: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setScore(result);
      }
    });
  }

  save() {
    const { index, ...maneuver} = this.form.getRawValue();
    this.setManeuver.emit({maneuver, index: this.form.value.index});
    this.init();
  }

  delete(): void {
    this.setManeuver.emit({ maneuver: null, index: this.form.value.index });
    this.init();
  }

  getInitialScores() {
    return {
      1: false,
      2: false,
      4: false,
      8: false
    };
  }

  init() {
    this.scores = this.getInitialScores();
    this.form.reset();
  }

  ngOnInit() {
  }

  back() {
    this.init();
    this.screenService.close();
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

}
