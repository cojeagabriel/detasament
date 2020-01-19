import { CasualtyV2 } from './../../types/casualty-v2.d';
import { ScreenService } from './../../services/screen.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { filter, switchMap, map } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})
export class CaseFormComponent implements OnInit, OnDestroy, AfterViewInit {

  id$ = new BehaviorSubject<string | null>(null);

  form = this.fb.group({
    name: [undefined, Validators.required],
    details: [undefined, Validators.required],
    casualties: this.fb.array([]),
  });

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);
  edit$ = new BehaviorSubject<{ casualty: CasualtyV2, index: number } | null>(null);

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
        return this.db.collection('casualties').doc<any>(params.id).snapshotChanges().pipe(
          map(actions => {
            const data = actions.payload.data();
            const id = actions.payload.id;
            return { ...data, id };
          })
        );
      }),
      untilDestroyed(this)
    ).subscribe(casualty => {
      this.id$.next(casualty.id);
    });

  }
  ngOnDestroy() {}

  save() {
    console.log(this.form.value);
    const formValue = this.form.value;
    this.loading$.next(true);

    this.saveCasualties().subscribe(casualtiesRef => {
      const casualties = casualtiesRef.map((casualty: any) => casualty.id);
      this.db.collection('cases').add({
        ...formValue,
        casualties,
        new: true
      }).then(res => {
        this.loading$.next(false);
        this.location.back();
      });
    });

  }

  saveCasualties() {
    const uploads$ = this.casualties.map(casualty => {
      return this.db.collection('casualties').add(casualty);
    });

    return combineLatest(uploads$);
  }

  get hasCasualties(): boolean {
    return this.form.value.casualties.length ? true : false;
  }

  get casualtiesFormArray() {
    return this.form.get('casualties') as FormArray;
  }

  get casualties() {
    return this.casualtiesFormArray.value;
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
