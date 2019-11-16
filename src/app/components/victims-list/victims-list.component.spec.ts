import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VictimsListComponent } from './victims-list.component';

describe('VictimsListComponent', () => {
  let component: VictimsListComponent;
  let fixture: ComponentFixture<VictimsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VictimsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VictimsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
