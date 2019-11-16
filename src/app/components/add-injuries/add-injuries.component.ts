import { untilDestroyed } from 'ngx-take-until-destroy';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { Injury } from 'src/app/types/injury';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { startWith, switchMap, map, shareReplay, tap } from 'rxjs/operators';
import { InjuryService } from 'src/app/services/injury.service';

@Component({
  selector: 'app-add-injuries',
  templateUrl: './add-injuries.component.html',
  styleUrls: ['./add-injuries.component.scss']
})
export class AddInjuriesComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  set injuries(injuries: Injury[]) {
    this.initialSelectedInjuries$.next(cloneDeep(injuries));
    this.selectedInjuries$.next(cloneDeep(injuries));
  }

  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  initialSelectedInjuries$ = new BehaviorSubject<Injury[]>([]);
  selectedInjuries$ = new BehaviorSubject<Injury[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(true);
  injuries$!: Observable<Injury[]>;
  search = new FormControl('');
  search$ = new BehaviorSubject<string>('');
  placeholder = 'Cauta...';

  @ViewChild('screen', { static: false }) screen: ElementRef;
  @ViewChild('content', { static: false }) content: ElementRef;
  scrolling$ = new BehaviorSubject<boolean>(false);
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  searching$ = new BehaviorSubject<boolean>(false);

  @Output() setSelectedInjuries = new EventEmitter<Injury[]>();
  @Output() backEmitter = new EventEmitter<boolean>();

  constructor(
    private injuryService: InjuryService
  ) { }

  ngOnInit() {
    this.injuries$ = this.getInjuries();
    this.search.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(() => this.content.nativeElement.scrollTop = 0);
  }

  private getInjuries(): Observable<Injury[]> {
    return this.search.valueChanges.pipe(
      startWith(''),
      switchMap(searchText => this.injuryService.getInjuries().pipe(
        map(injuries => injuries.filter(injury => injury.name.toLowerCase().includes(searchText.toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name)))
      )),
      tap(() => this.isLoading$.next(false)),
      shareReplay(1)
    );
  }

  onInjuryClick(injury: Injury) {
    if (!this.selectedInjuries$.getValue().find(selectedInjury => selectedInjury._id === injury._id)) {
      this.addInjury(injury);
    } else {
      this.removeInjury(injury);
    }
  }

  addInjury(injury: Injury) {
    const injuries = this.selectedInjuries$.getValue();
    injuries.push(injury);
    this.selectedInjuries$.next(injuries);
    this.clearSearchInput();
  }

  removeInjury(injury: Injury) {
    const injuries = this.selectedInjuries$.getValue().filter(selectedInjury => selectedInjury._id !== injury._id);
    this.selectedInjuries$.next(injuries);
    this.clearSearchInput();
  }

  select() {
    this.setSelectedInjuries.emit(this.selectedInjuries$.getValue());
    this.back();
  }

  isSelected(injury: Injury): boolean {
    if (this.selectedInjuries$.getValue().find(selectedInjury => selectedInjury._id === injury._id)) {
      return true;
    }
    return false;
  }

  compareObjects(o1: any, o2: any) {
    return o1._id === o2._id;
  }

  clearSearchInput() {
    this.search.setValue('');
  }

  focusSearchInput() {
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }

  back() {
    setTimeout(() => {
      this.resetSelectedInjuries();
    }, 300);
    this.backEmitter.emit();
  }

  resetSelectedInjuries() {
    this.selectedInjuries$.next(cloneDeep(this.initialSelectedInjuries$.getValue()));
  }

  ngAfterViewInit() {
    this.content.nativeElement.addEventListener('scroll', () => {
      const scrollTop = this.content.nativeElement.scrollTop;
      const scrolling = this.scrolling$.getValue();
      if (scrollTop > 0 && scrolling === false) {
        this.scrolling$.next(true);
      } else if (scrollTop === 0 && scrolling === true) {
        this.scrolling$.next(false);
      }
    }, true);
  }

  ngOnDestroy(): void {
  }

}
