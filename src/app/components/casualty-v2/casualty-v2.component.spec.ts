import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualtyV2Component } from './casualty-v2.component';

describe('CasualtyV2Component', () => {
  let component: CasualtyV2Component;
  let fixture: ComponentFixture<CasualtyV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasualtyV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualtyV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
