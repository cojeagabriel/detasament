import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuriesV3Component } from './injuries-v3.component';

describe('InjuriesV3Component', () => {
  let component: InjuriesV3Component;
  let fixture: ComponentFixture<InjuriesV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjuriesV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjuriesV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
