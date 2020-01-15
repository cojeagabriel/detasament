import { ScreenService } from './../../services/screen.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { InjuryV2 } from 'src/app/types/injury-v2';
import { startWith, switchMap, shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-injuries-v2',
  templateUrl: './add-injuries-v2.component.html',
  styleUrls: ['./add-injuries-v2.component.scss']
})
export class AddInjuriesV2Component implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  set injuries(injuries: any[]) {
    this.initialSelectedInjuries$.next(cloneDeep(injuries));
    this.selectedInjuries$.next(cloneDeep(injuries));
  }

  search = new FormControl('');
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  initialSelectedInjuries$ = new BehaviorSubject<any[]>([]);
  selectedInjuries$ = new BehaviorSubject<any[]>([]);
  injuries$ = this.getInjuriesObservable();
  placeholder = 'Cauta...';

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(true);
  searching$ = new BehaviorSubject(false);

  @Output() setSelectedInjuries = new EventEmitter<any[]>();

  constructor(
    private screenService: ScreenService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.injuries$.subscribe(res => this.loading$.next(false));
  }
  ngOnDestroy() {}

  private getInjuriesObservable(): Observable<InjuryV2[]> {
    return this.search.valueChanges.pipe(
      startWith(''),
      switchMap(searchText => {
        return this.db.collection<InjuryV2>('injuries', ref => ref.orderBy('name', 'asc')).valueChanges({ idField: 'id' })
          .pipe(
            map(injuries => {
              return injuries.filter(injury => injury.name.toLowerCase().includes(searchText.toLowerCase()));
            })
          );
      }),
      shareReplay(1)
    );
  }

  clearSearchInput() {
    this.search.setValue('');
  }

  select() {
    this.setSelectedInjuries.emit(this.selectedInjuries$.getValue());
    this.back();
  }

  isSelected(injury: any): boolean {
    if (this.selectedInjuries$.getValue().find(selectedInjury => selectedInjury.id === injury.id)) {
      return true;
    }
    return false;
  }

  compareObjects(o1: any, o2: any) {
    return o1.id === o2.id;
  }

  onInjuryClick(injury: InjuryV2) {
    if (!this.selectedInjuries$.getValue().find(selectedInjury => selectedInjury.id === injury.id)) {
      this.addInjury(injury);
    } else {
      this.removeInjury(injury);
    }
  }

  addInjury(injury: InjuryV2) {
    const injuries = this.selectedInjuries$.getValue();
    injuries.push({
      id: injury.id,
      name: injury.name
    });
    this.selectedInjuries$.next(injuries);
    this.clearSearchInput();
  }

  removeInjury(injury: InjuryV2) {
    const injuries = this.selectedInjuries$.getValue().filter(selectedInjury => selectedInjury.id !== injury.id);
    this.selectedInjuries$.next(injuries);
    this.clearSearchInput();
  }

  back() {
    setTimeout(() => {
      this.resetSelectedInjuries();
    }, 300);
    this.screenService.close();
  }

  resetSelectedInjuries() {
    this.selectedInjuries$.next(cloneDeep(this.initialSelectedInjuries$.getValue()));
  }

  ngAfterViewInit() {
    this.content.nativeElement.addEventListener(
      'scroll',
      () => {
        const scrollTop = this.content.nativeElement.scrollTop;
        if (scrollTop > 0 && this.scrolling$.getValue() === false) {
          this.scrolling$.next(true);
        } else if (scrollTop === 0 && this.scrolling$.getValue() === true) {
          this.scrolling$.next(false);
        }
      },
      true
    );
  }

}
