import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInjuryV2Component } from './create-injury-v2.component';

describe('CreateInjuryV2Component', () => {
  let component: CreateInjuryV2Component;
  let fixture: ComponentFixture<CreateInjuryV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInjuryV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInjuryV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
