import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualtyNormComponent } from './casualty-norm.component';

describe('CasualtyNormComponent', () => {
  let component: CasualtyNormComponent;
  let fixture: ComponentFixture<CasualtyNormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasualtyNormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualtyNormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
