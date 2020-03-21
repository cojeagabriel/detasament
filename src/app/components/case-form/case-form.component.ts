import { CaseV2 } from './../../types/case-v2.d';
import { CasualtyV2 } from './../../types/casualty-v2.d';
import { ScreenService } from './../../services/screen.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { isNil } from 'lodash';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseFormComponent implements OnInit, OnDestroy, AfterViewInit {

  id$ = new BehaviorSubject<string | null>(null);
  initialCasualties$ = new BehaviorSubject<CasualtyV2[]>([]);

  form = this.fb.group({
    name: [undefined, Validators.required],
    details: undefined,
    casualties: this.fb.array([]),
  });

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);
  edit$ = new BehaviorSubject<{ casualty: CasualtyV2, index: number } | null>(null);
  hasCasualties$ = this.getHasCasualtiesObservable();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public screenService: ScreenService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => params.id),
      switchMap(params => {
        return this.db.collection('cases').doc<CaseV2>(params.id).snapshotChanges().pipe(
          map(actions => {
            const data = actions.payload.data();
            const id = actions.payload.id;
            return { ...data, id };
          })
        );
      }),
      filter(cs => !isNil(cs.name)),
      tap(cs => {
        this.id$.next(cs.id);
        this.setForm(cs);
      }),
      switchMap(cs => {
        const casualties$ = cs.casualties.map(casualtyId => {
          return this.db.collection('casualties').doc<CasualtyV2>(casualtyId).snapshotChanges();
        });
        return combineLatest(casualties$).pipe(
          map(casualtiesActions => {
            return casualtiesActions
              .filter(actions => actions.payload.data())
              .map(actions => {
                const data = actions.payload.data();
                const id = actions.payload.id;
                return { ...data, id };
              });
          })
        );
      }),
      untilDestroyed(this)
    ).subscribe(casualties => {
      this.initialCasualties$.next(casualties);
      this.setCasualties(casualties);
    });
  }
  ngOnDestroy() {}

  private setForm(cs: CaseV2) {
    this.form.patchValue({
      name: cs.name,
      details: cs.details,
    });
  }

  private setCasualties(casualties: CasualtyV2[]) {
    this.clearCasualties();
    casualties.forEach(injury => this.addCasualty(injury));
  }

  private clearCasualties() {
    const casualties = this.form.controls.casualties as FormArray;
    while (casualties.length !== 0) {
      casualties.removeAt(0);
    }
  }

  addCasualty(injury: any) {
    this.casualtiesFormArray.push(this.fb.group(injury));
  }

  save() {
    const id = this.id$.getValue();
    const formValue = this.form.value;
    this.loading$.next(true);

    this.saveCasualties().pipe(
      switchMap(casualtiesRef => {
        const updatedCasualtiesIds = formValue.casualties.filter(casualty => casualty.id).map(casualty => casualty.id);
        const casualties = [
          ...casualtiesRef.filter(casualty => !!casualty).map(casualty => casualty.id),
          ...updatedCasualtiesIds
        ];
        if (id) {
          return this.db.collection('cases').doc(id).update({
            ...formValue,
            casualties
          });
        }
        return this.db.collection('cases').add({
          ...formValue,
          casualties,
          new: true
        });
      })
    ).subscribe(cs => {
      this.loading$.next(false);
      if (id) {
        this.back();
      } else if (cs && cs.id) {
        this.router.navigate(['/cases/' + cs.id], { replaceUrl: true });
      }
    });
  }

  private saveCasualties(): Observable<any> {
    const casualties = (this.form.controls.casualties as FormArray).value;
    let initialCasualties = this.initialCasualties$.getValue();
    const updates$ = casualties.map(casualty => {
      if (casualty.id) {
        initialCasualties = initialCasualties.filter(initialCasualty => initialCasualty.id !== casualty.id);
        return this.db.collection('casualties').doc(casualty.id).update(casualty);
      } else {
        return this.db.collection('casualties').add({
          ...casualty,
          visible: false
        });
      }
    });

    initialCasualties.forEach(initialCasualty => {
      if (initialCasualty.visible === false) {
        updates$.push(this.db.collection('casualties').doc(initialCasualty.id).delete());
      }
    });

    return combineLatest(updates$);
  }

  delete() {
    const id = this.id$.getValue();
    this.loading$.next(true);

    this.deleteCasualties().pipe(
      switchMap(() => {
        return this.db.collection('cases').doc(id).delete();
      })
    ).subscribe(() => {
      window.history.go(-2);
    });
  }

  private deleteCasualties(): Observable<any> {
    const initialCasualties = this.initialCasualties$.getValue();
    const updates$ = initialCasualties.filter(initialCasualty => !initialCasualty.visible).map(initialCasualty => {
      return this.db.collection('casualties').doc(initialCasualty.id).delete();
    });

    return combineLatest(updates$);
  }

  private getHasCasualtiesObservable(): Observable<boolean> {
    return this.form.controls.casualties.valueChanges.pipe(
      map(casualties => {
        return casualties.length ? true : false;
      })
    );
  }

  get casualtiesFormArray() {
    return this.form.controls.casualties as FormArray;
  }

  getCasualties(): CasualtyV2[] {
    return (this.form.controls.casualties as FormArray).value;
  }

  setCasualty(casualty: CasualtyV2 | null) {
    const edit = this.edit$.getValue();
    if (casualty) {
      if (edit) {
        this.casualtiesFormArray.at(edit.index).patchValue(casualty);
      } else {
        this.casualtiesFormArray.push(this.fb.group(casualty));
      }
    } else {
      this.casualtiesFormArray.removeAt(edit.index);
    }
    this.screenService.close();
  }

  close() {
    this.screenService.close();
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
