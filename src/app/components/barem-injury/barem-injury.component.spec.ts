import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaremInjuryComponent } from './barem-injury.component';

describe('BaremInjuryComponent', () => {
  let component: BaremInjuryComponent;
  let fixture: ComponentFixture<BaremInjuryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaremInjuryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaremInjuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
