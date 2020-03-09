import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManeuverListItemComponent } from './maneuver-list-item.component';

describe('ManeuverListItemComponent', () => {
  let component: ManeuverListItemComponent;
  let fixture: ComponentFixture<ManeuverListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManeuverListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManeuverListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
