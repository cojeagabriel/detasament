import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InjuriesCardComponent} from './injuries-card.component';

describe('InjuriesCardComponent', () => {
  let component: InjuriesCardComponent;
  let fixture: ComponentFixture<InjuriesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InjuriesCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjuriesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
