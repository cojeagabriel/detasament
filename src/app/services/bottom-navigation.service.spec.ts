import { TestBed } from '@angular/core/testing';

import { BottomNavigationService } from './bottom-navigation.service';

describe('BottomNavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BottomNavigationService = TestBed.get(BottomNavigationService);
    expect(service).toBeTruthy();
  });
});
