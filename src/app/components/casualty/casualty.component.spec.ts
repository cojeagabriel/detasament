import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualtyComponent } from './casualty.component';

describe('CasualtyComponent', () => {
  let component: CasualtyComponent;
  let fixture: ComponentFixture<CasualtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasualtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
