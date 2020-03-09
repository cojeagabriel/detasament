import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualtyCardV2Component } from './casualty-card-v2.component';

describe('CasualtyCardV2Component', () => {
  let component: CasualtyCardV2Component;
  let fixture: ComponentFixture<CasualtyCardV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasualtyCardV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualtyCardV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
