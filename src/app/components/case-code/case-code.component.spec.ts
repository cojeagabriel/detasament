import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCodeComponent } from './case-code.component';

describe('CaseCodeComponent', () => {
  let component: CaseCodeComponent;
  let fixture: ComponentFixture<CaseCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
