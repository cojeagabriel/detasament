import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaseV2Component } from './create-case-v2.component';

describe('CreateCaseV2Component', () => {
  let component: CreateCaseV2Component;
  let fixture: ComponentFixture<CreateCaseV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCaseV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaseV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
