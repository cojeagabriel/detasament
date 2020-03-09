import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInjuriesComponent } from './add-injuries.component';

describe('AddInjuriesComponent', () => {
  let component: AddInjuriesComponent;
  let fixture: ComponentFixture<AddInjuriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInjuriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
