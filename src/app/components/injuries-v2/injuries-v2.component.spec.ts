import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuriesV2Component } from './injuries-v2.component';

describe('InjuriesV2Component', () => {
  let component: InjuriesV2Component;
  let fixture: ComponentFixture<InjuriesV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjuriesV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjuriesV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
