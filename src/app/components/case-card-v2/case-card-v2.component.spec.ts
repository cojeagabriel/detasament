import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCardV2Component } from './case-card-v2.component';

describe('CaseCardV2Component', () => {
  let component: CaseCardV2Component;
  let fixture: ComponentFixture<CaseCardV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseCardV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCardV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
