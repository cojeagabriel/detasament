import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesV2Component } from './cases-v2.component';

describe('CasesV2Component', () => {
  let component: CasesV2Component;
  let fixture: ComponentFixture<CasesV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
