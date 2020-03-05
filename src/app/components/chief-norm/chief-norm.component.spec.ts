import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefNormComponent } from './chief-norm.component';

describe('ChiefNormComponent', () => {
  let component: ChiefNormComponent;
  let fixture: ComponentFixture<ChiefNormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiefNormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiefNormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
