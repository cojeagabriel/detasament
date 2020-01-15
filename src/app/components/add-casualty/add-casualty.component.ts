import { AngularFirestore } from '@angular/fire/firestore';
import { CasualtyV2 } from './../../types/casualty-v2.d';
import { ScreenService } from './../../services/screen.service';
import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-casualty',
  templateUrl: './add-casualty.component.html',
  styleUrls: ['./add-casualty.component.scss']
})
export class AddCasualtyComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  set casualty(casualty: CasualtyV2 | null) {
    if (casualty) {
      this.form.patchValue({
        name: casualty.name,
        age: casualty.age,
        details: casualty.details
      });
      this.setInjuries(this.parseInjuriesToArray(casualty.injuries));
      this.casualty$.next(casualty);
    } else {
      this.reset();
    }
  }
  casualty$ = new BehaviorSubject<CasualtyV2 | null>(null);

  form = this.fb.group({
    name: ['test', Validators.required],
    age: [22, Validators.required],
    injuries: this.fb.array([]),
    details: undefined
  });

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);

  @Output() setCasualty = new EventEmitter<CasualtyV2 | null>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public screenService: ScreenService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {}
  ngOnDestroy() {}

  save() {
    const formValue = this.prepareToSave();
    this.setCasualty.emit(formValue);
    setTimeout(() => {
      this.reset();
    }, 300);
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

  delete() {
    this.setCasualty.emit(null);
  }

  reset() {
    this.clearInjuries();
    this.form.reset();
    this.casualty$.next(null);
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

  parseInjuriesToArray(injuries): any[] {
    return Object.keys(injuries).map(key => {
      return {
        id: key,
        name: injuries[key]
      };
    });
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
