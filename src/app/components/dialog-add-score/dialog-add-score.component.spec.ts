import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddScoreComponent } from './dialog-add-score.component';

describe('DialogAddScoreComponent', () => {
  let component: DialogAddScoreComponent;
  let fixture: ComponentFixture<DialogAddScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
