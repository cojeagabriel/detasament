import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualtiesV2Component } from './casualties-v2.component';

describe('CasualtiesV2Component', () => {
  let component: CasualtiesV2Component;
  let fixture: ComponentFixture<CasualtiesV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasualtiesV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualtiesV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
