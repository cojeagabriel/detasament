import { untilDestroyed } from 'ngx-take-until-destroy';
import { BehaviorSubject, SubscriptionLike, of } from 'rxjs';
import { InjuryService } from './../../services/injury.service';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Injury } from 'src/app/types/injury';
import { tap, shareReplay, switchMap, filter } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Maneuver } from 'src/app/types/maneuver';
import { cloneDeep } from 'lodash';
import { Location } from '@angular/common';
import { CanDeactivateGuardGuard } from 'src/app/guards/can-deactivate-guard.guard';
import { RouterStateSnapshot, ActivatedRoute, UrlTree, Router } from '@angular/router';

@Component({
  selector: 'app-create-injury-v2',
  templateUrl: './create-injury-v2.component.html',
  styleUrls: ['./create-injury-v2.component.scss']
})
export class CreateInjuryV2Component implements OnInit, OnDestroy, AfterViewInit {

  isEdit$ = new BehaviorSubject<boolean>(false);
  editInjury$ = new BehaviorSubject<Injury | null>(null);
  editManeuver$ = new BehaviorSubject<{ maneuver: Maneuver, index: number } | null>(null);
  injuryForm: FormGroup;
  scrolling$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;

  locationSubscription!: SubscriptionLike;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private injuryService: InjuryService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.injuryForm = this.getInjuryForm();
    this.route.params.pipe(
      filter(params => params.id),
      switchMap(params => {
        return this.injuryService.getInjury(params.id);
      }),
      tap(injury => {
        if (injury) {
          this.editInjury$.next(injury);
          this.setFormFromInjury(injury);
        }
      }),
      untilDestroyed(this)
    ).subscribe();
  }

  private getInjuryForm(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control(''),
      maneuvers: this.formBuilder.array([])
    });
  }

  private setFormFromInjury(injury: Injury) {
    this.injuryForm.patchValue({ name: injury.name });
    this.emptyManeuvers();
    if (injury.maneuvers) {
      for (const maneuver of injury.maneuvers) {
        this.maneuversForms.push(new FormControl(maneuver));
      }
    }
  }

  private emptyManeuvers() {
    while (this.maneuversForms.controls.length > 0) {
      this.maneuversForms.removeAt(0);
    }
  }

  get maneuversForms() {
    return this.injuryForm.get('maneuvers') as FormArray;
  }

  setManeuver(value): void {
    if (value && value.maneuver) {
      const maneuver = this.formBuilder.group({
        description: value.maneuver.description,
        score: this.formBuilder.group(value.maneuver.score)
      });

      if (value.index == null) {
        this.maneuversForms.push(maneuver);
      } else {
        this.maneuversForms.at(value.index).value.description = value.maneuver.description;
        this.maneuversForms.at(value.index).value.score = value.maneuver.score;
      }
    } else if (value && !value.maneuver && value.index != null) {
      this.maneuversForms.removeAt(value.index);
    }
    this.sidenav.close();
  }

  save() {
    this.loading$.next(true);
    const editInjury = this.editInjury$.getValue();
    if (editInjury) {
      const injuryWithId: Injury = { ...this.injuryForm.value, _id: editInjury._id };
      this.injuryService.updateInjury(injuryWithId)
        .subscribe(injury => {
          this.back();
        });
    } else {
      this.injuryService.postInjury(this.injuryForm.value)
        .subscribe(injury => {
          this.router.navigate(['/injuries/' + injury._id], { replaceUrl: true });
        });
    }
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: ' Ești sigur că vrei să ștergi leziunea?',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading$.next(true);
        const editInjury = this.editInjury$.getValue();
        this.injuryService.deleteInjury(editInjury._id).pipe(
          untilDestroyed(this)
        )
        .subscribe(res => {
          window.history.go(-2);
        });
      }
    });
  }

  editManeuver(index: number) {
    this.editManeuver$.next({
      maneuver: this.maneuversForms.at(index).value,
      index: index
    });
  }

  close() {
    this.sidenav.close();
  }

  back() {
    this.location.back();
  }

  canDeactivate(): boolean {
    if (this.sidenav.opened) {
      this.close();
      return false;
    }
    return true;
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

  ngOnDestroy() {

  }

}
