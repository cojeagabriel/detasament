import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesV3Component } from './cases-v3.component';

describe('CasesV3Component', () => {
  let component: CasesV3Component;
  let fixture: ComponentFixture<CasesV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
