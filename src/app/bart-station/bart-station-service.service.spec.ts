import { TestBed } from '@angular/core/testing';

import { BartStationServiceService } from './bart-station-service.service';

describe('BartStationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BartStationServiceService = TestBed.get(BartStationServiceService);
    expect(service).toBeTruthy();
  });
});
