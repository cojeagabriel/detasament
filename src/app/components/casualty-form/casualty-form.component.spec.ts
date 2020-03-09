import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualtyFormComponent } from './casualty-form.component';

describe('CasualtyFormComponent', () => {
  let component: CasualtyFormComponent;
  let fixture: ComponentFixture<CasualtyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasualtyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualtyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
