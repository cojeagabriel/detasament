import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManeuverNormListItemComponent } from './maneuver-norm-list-item.component';

describe('ManeuverNormListItemComponent', () => {
  let component: ManeuverNormListItemComponent;
  let fixture: ComponentFixture<ManeuverNormListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManeuverNormListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManeuverNormListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
