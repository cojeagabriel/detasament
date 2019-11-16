import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { Location } from '@angular/common';
import { Injury } from 'src/app/types/injury';

@Component({
  selector: 'app-create-casualty',
  templateUrl: './create-casualty.component.html',
  styleUrls: ['./create-casualty.component.scss']
})
export class CreateCasualtyComponent implements OnInit, AfterViewInit {

  casualtyForm: FormGroup;
  scrolling$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    this.casualtyForm = this.getCasualtyForm();
  }

  private getCasualtyForm(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control(''),
      age: this.formBuilder.control(undefined),
      injuries: this.formBuilder.array([]),
      details: this.formBuilder.control('')
    });
  }

  get injuries() {
    return this.casualtyForm.controls.injuries.value;
  }

  setInjuries(injuries: Injury[]) {
    this.clearInjuries();
    injuries.forEach(injury => this.addInjury(injury));
  }

  clearInjuries() {
    const injuries = this.casualtyForm.controls.injuries as FormArray;
    while (injuries.length !== 0) {
      injuries.removeAt(0);
    }
  }

  addInjury(injury: Injury) {
    (this.casualtyForm.controls.injuries as FormArray).push(new FormControl(injury));
  }

  log() {
    console.log(this.casualtyForm.value);
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

}
