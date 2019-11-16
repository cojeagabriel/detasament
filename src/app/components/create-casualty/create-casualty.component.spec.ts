import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCasualtyComponent } from './create-casualty.component';

describe('CreateCasualtyComponent', () => {
  let component: CreateCasualtyComponent;
  let fixture: ComponentFixture<CreateCasualtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCasualtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCasualtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
