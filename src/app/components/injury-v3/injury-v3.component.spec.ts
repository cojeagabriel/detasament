import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryV3Component } from './injury-v3.component';

describe('InjuryV3Component', () => {
  let component: InjuryV3Component;
  let fixture: ComponentFixture<InjuryV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjuryV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjuryV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
