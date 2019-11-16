import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryListItemComponent } from './injury-list-item.component';

describe('InjuryListItemComponent', () => {
  let component: InjuryListItemComponent;
  let fixture: ComponentFixture<InjuryListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjuryListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjuryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
