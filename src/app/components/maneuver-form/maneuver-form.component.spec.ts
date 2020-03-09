import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManeuverFormComponent } from './maneuver-form.component';

describe('ManeuverFormComponent', () => {
  let component: ManeuverFormComponent;
  let fixture: ComponentFixture<ManeuverFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManeuverFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManeuverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
