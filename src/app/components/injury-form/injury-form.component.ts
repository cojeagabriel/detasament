import { ManeuverV2 } from './../../types/maneuver-v2.d';
import { AngularFirestore } from '@angular/fire/firestore';
import { InjuryV2 } from './../../types/injury-v2.d';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-injury-form',
  templateUrl: './injury-form.component.html',
  styleUrls: ['./injury-form.component.scss']
})
export class InjuryFormComponent implements OnInit, AfterViewInit {

  form = this.fb.group({
    id: undefined,
    name: [undefined, Validators.required],
    maneuvers: new FormArray([])
  });
  maneuver$ = new BehaviorSubject<{ maneuver: ManeuverV2, index: number } | null>(null);

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  editing$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);

  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        filter(params => params.id),
        switchMap(params => {
          return this.db.collection('injuries').doc<InjuryV2>(params.id).valueChanges().pipe(
            map(injury => {
              return { ...injury, id: params.id };
            })
          );
        }),
        filter(injury => !!injury)
      )
      .subscribe(injury => {
        this.editing$.next(true);
        this.setFormFromInjury(injury);
      });
  }

  save() {
    this.loading$.next(true);

    if (this.form.value.id) {
      this.db.collection('injuries').doc<InjuryV2>(this.form.value.id).update(this.form.value)
        .then(injury => {
          this.loading$.next(false);
          this.back();
        });
    } else {
      this.db.collection('injuries').add(this.form.value)
        .then(injury => {
          this.loading$.next(false);
          this.router.navigate(['/injuries/' + injury.id], { replaceUrl: true });
        });
    }
  }

  delete() {
    this.loading$.next(true);

    this.db.collection('injuries').doc<InjuryV2>(this.form.value.id).delete()
      .then(() => {
        window.history.go(-2);
      });
  }

  private setFormFromInjury(injury: InjuryV2) {
    this.form.patchValue(injury);
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
    return this.form.get('maneuvers') as FormArray;
  }

  editManeuver(index: number) {
    this.maneuver$.next({
      maneuver: this.maneuversForms.at(index).value,
      index: index
    });
    this.sidenav.toggle();
  }

  setManeuver(value): void {
    if (value && value.maneuver) {
      if (value.index === null) {
        this.maneuversForms.push(this.fb.group(value.maneuver));
      } else {
        this.maneuversForms.at(value.index).patchValue(value.maneuver);
      }
    } else if (value && !value.maneuver && value.index !== null) {
      this.maneuversForms.removeAt(value.index);
    }
    this.sidenav.close();
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
      if (scrollTop > 0 && this.scrolling$.getValue() === false) {
        this.scrolling$.next(true);
      } else if (scrollTop === 0 && this.scrolling$.getValue() === true) {
        this.scrolling$.next(false);
      }
    }, true);
  }

}