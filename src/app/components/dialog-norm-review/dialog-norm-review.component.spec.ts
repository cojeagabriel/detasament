import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNormReviewComponent } from './dialog-norm-review.component';

describe('DialogNormReviewComponent', () => {
  let component: DialogNormReviewComponent;
  let fixture: ComponentFixture<DialogNormReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNormReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNormReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
