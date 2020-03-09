import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-case-v2',
  templateUrl: './create-case-v2.component.html',
  styleUrls: ['./create-case-v2.component.scss']
})
export class CreateCaseV2Component implements OnInit {

  caseForm: FormGroup;
  scrolling$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    this.caseForm = this.getCaseForm();
  }

  private getCaseForm(): FormGroup {
    return this.formBuilder.group({
      context: this.formBuilder.control(''),
      casualties: this.formBuilder.array([])
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

}
