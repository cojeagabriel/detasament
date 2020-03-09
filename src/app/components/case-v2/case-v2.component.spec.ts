import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseV2Component } from './case-v2.component';

describe('CaseV2Component', () => {
  let component: CaseV2Component;
  let fixture: ComponentFixture<CaseV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
