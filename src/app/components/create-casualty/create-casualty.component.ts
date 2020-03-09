import { Router, ActivatedRoute } from '@angular/router';
import { CasualtyService } from './../../services/casualty.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav, MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { Injury } from 'src/app/types/injury';
import { filter, switchMap, tap, map } from 'rxjs/operators';
import { Casualty } from 'src/app/types/casualty';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-create-casualty',
  templateUrl: './create-casualty.component.html',
  styleUrls: ['./create-casualty.component.scss']
})
export class CreateCasualtyComponent implements OnInit, OnDestroy, AfterViewInit {

  casualtyForm: FormGroup;
  scrolling$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);
  edit$ = new BehaviorSubject<Casualty | null>(null);

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private casualtyService: CasualtyService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.casualtyForm = this.getCasualtyForm();
    this.route.params.pipe(
      filter(params => params.id),
      switchMap(params => {
        return this.casualtyService.getCasualty(params.id);
      }),
      tap(casualty => {
        if (casualty) {
          this.edit$.next(casualty);
          this.casualtyForm.patchValue(casualty);
          this.setInjuries(casualty.injuries);
        }
      }),
      untilDestroyed(this)
    ).subscribe();
  }
  ngOnDestroy() {}

  private getCasualtyForm(): FormGroup {
    return this.formBuilder.group({
      _id: undefined,
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

  save() {
    // this.casualtyService.add({
    //   ...this.casualtyForm.value,
    //   injuries: this.casualtyForm.value.injuries.map(injury => injury._id)
    // }).subscribe(res => {
    //   this.router.navigate(['/casualties'], { replaceUrl: true });
    // });

    // this.edit$.pipe(
    //   map(casualty => {
    //     return casualty ? {
    //       ...this.casualtyForm.value,
    //       injuries: this.casualtyForm.value.injuries.map(injury => injury._id)
    //     } : null;
    //   }),
    //   switchMap(casualty => {
    //     if (casualty) {
    //       return this.casualtyService.update(casualty);
    //     }

    //   })
    // ).subscribe(casualty => {
    //   this.router.navigate(['/casualties/' + casualty._id], { replaceUrl: true });
    // });

    // this.loading$.next(true);

    const newCasualty = {
      ...this.casualtyForm.value,
      injuries: this.casualtyForm.value.injuries.map(injury => injury._id)
    };

    console.log()

    // if (newCasualty._id) {
    //   this.casualtyService.update(newCasualty).subscribe(() => this.back());
    // } else {
    //   this.casualtyService.add(newCasualty).subscribe(casualty => {
    //     this.router.navigate(['/casualties/' + casualty._id], { replaceUrl: true });
    //   });
    // }
  }

  delete() {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: ' Ești sigur că vrei să ștergi victima?',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading$.next(true);
        this.casualtyService.delete(this.casualtyForm.value._id).subscribe(res => {
          window.history.go(-2);
        });
      }
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

  

}
