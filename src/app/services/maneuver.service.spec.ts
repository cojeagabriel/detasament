import { TestBed } from '@angular/core/testing';

import { ManeuverService } from './maneuver.service';

describe('ManeuverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManeuverService = TestBed.get(ManeuverService);
    expect(service).toBeTruthy();
  });
});
