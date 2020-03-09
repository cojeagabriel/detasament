import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaremComponent } from './barem.component';

describe('BaremComponent', () => {
  let component: BaremComponent;
  let fixture: ComponentFixture<BaremComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaremComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaremComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
