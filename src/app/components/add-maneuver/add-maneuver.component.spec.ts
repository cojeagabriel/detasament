import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManeuverComponent } from './add-maneuver.component';

describe('AddManeuverComponent', () => {
  let component: AddManeuverComponent;
  let fixture: ComponentFixture<AddManeuverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManeuverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManeuverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
