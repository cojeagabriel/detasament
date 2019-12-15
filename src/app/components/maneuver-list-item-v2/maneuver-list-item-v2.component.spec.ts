import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManeuverListItemV2Component } from './maneuver-list-item-v2.component';

describe('ManeuverListItemV2Component', () => {
  let component: ManeuverListItemV2Component;
  let fixture: ComponentFixture<ManeuverListItemV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManeuverListItemV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManeuverListItemV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
