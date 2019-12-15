import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryFormComponent } from './injury-form.component';

describe('InjuryFormComponent', () => {
  let component: InjuryFormComponent;
  let fixture: ComponentFixture<InjuryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjuryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjuryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
