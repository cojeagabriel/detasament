import { TestBed } from '@angular/core/testing';

import { CasualtyService } from './casualty.service';

describe('CasualtyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CasualtyService = TestBed.get(CasualtyService);
    expect(service).toBeTruthy();
  });
});
