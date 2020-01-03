import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInjuriesV2Component } from './add-injuries-v2.component';

describe('AddInjuriesV2Component', () => {
  let component: AddInjuriesV2Component;
  let fixture: ComponentFixture<AddInjuriesV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInjuriesV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInjuriesV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
