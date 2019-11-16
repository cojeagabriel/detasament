import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryV2Component } from './injury-v2.component';

describe('InjuryV2Component', () => {
  let component: InjuryV2Component;
  let fixture: ComponentFixture<InjuryV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjuryV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjuryV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
