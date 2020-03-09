import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualtiesComponent } from './casualties.component';

describe('CasualtiesComponent', () => {
  let component: CasualtiesComponent;
  let fixture: ComponentFixture<CasualtiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasualtiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
