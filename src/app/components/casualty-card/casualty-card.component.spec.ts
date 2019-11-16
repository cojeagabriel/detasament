import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualtyCardComponent } from './casualty-card.component';

describe('CasualtyCardComponent', () => {
  let component: CasualtyCardComponent;
  let fixture: ComponentFixture<CasualtyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasualtyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualtyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
