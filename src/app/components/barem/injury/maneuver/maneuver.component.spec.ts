import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManeuverComponent } from './maneuver.component';

describe('ManeuverComponent', () => {
  let component: ManeuverComponent;
  let fixture: ComponentFixture<ManeuverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManeuverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManeuverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
