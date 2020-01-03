import { Location } from '@angular/common';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { map, filter, switchMap } from 'rxjs/operators';
import { Casualty } from 'src/app/types/casualty';
import { MatSidenav } from '@angular/material';
import { Injury } from 'src/app/types/injury';

@Component({
  selector: 'app-casualty-form',
  templateUrl: './casualty-form.component.html',
  styleUrls: ['./casualty-form.component.scss']
})
export class CasualtyFormComponent implements OnInit, OnDestroy, AfterViewInit {

  id$ = new BehaviorSubject<string | null>(null);

  form = this.fb.group({
    name: [undefined, Validators.required],
    age: [undefined, Validators.required],
    injuries: this.fb.array([]),
    details: undefined
  });

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => params.id),
      switchMap(params => {
        return this.db.collection('casualties').doc<Casualty>(params.id).snapshotChanges().pipe(
          map(actions => {
            const data = actions.payload.data();
            const id = actions.payload.id;
            return { ...data, id};
          })
        );
      }),
      untilDestroyed(this)
    ).subscribe(casualty => {
      this.id$.next(casualty.id);
      if (casualty.name) {
        this.setFormFromcasualty(casualty);
      }
    });
  }
  ngOnDestroy() {}

  private setFormFromcasualty(casualty: any) {
    // console.log(casualty);
    this.form.patchValue({
      name: casualty.name,
      age: casualty.age,
      details: casualty.details
    });

    const injuries = Object.keys(casualty.injuries).map(id => {
      return {
        id,
        name: casualty.injuries[id]
      };
    });
    this.setInjuries(injuries);
  }

  get hasInjuries(): boolean {
    return this.form.value.injuries.length ? true : false;
  }

  get injuries() {
    return this.form.controls.injuries.value;
  }

  setInjuries(injuries: any[]) {
    this.clearInjuries();
    injuries.forEach(injury => this.addInjury(injury));
  }

  clearInjuries() {
    const injuries = this.form.controls.injuries as FormArray;
    while (injuries.length !== 0) {
      injuries.removeAt(0);
    }
  }

  addInjury(injury: any) {
    (this.form.controls.injuries as FormArray).push(new FormControl(injury));
  }

  save() {
    const id = this.id$.getValue();
    const formValue = this.prepareToSave();
    this.loading$.next(true);

    if (id) {
      this.db.collection('casualties').doc(id).update(formValue)
        .then(casualty => {
          this.loading$.next(false);
          this.back();
        })
        .catch(error => this.loading$.next(false));
    } else {
      this.db.collection('casualties').add(formValue)
        .then(casualty => {
          this.loading$.next(false);
          this.router.navigate(['/casualties/' + casualty.id], { replaceUrl: true });
        })
        .catch(error => this.loading$.next(false));
    }
  }

  delete() {
    const id = this.id$.getValue();
    this.loading$.next(true);

    this.db.collection('casualties').doc(id).delete()
      .then(() => {
        window.history.go(-2);
      })
      .catch(error => this.loading$.next(false));
  }

  prepareToSave() {
    const formValue = this.form.value;
    const injuries = {};
    formValue.injuries.forEach(injury => {
      injuries[injury.id] = injury.name;
    });
    return {
      ...formValue,
      injuries
    };
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
