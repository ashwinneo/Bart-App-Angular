import { TestBed } from '@angular/core/testing';

import { BartStationsServiceService } from './bart-stations-service.service';

describe('BartStationsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BartStationsServiceService = TestBed.get(BartStationsServiceService);
    expect(service).toBeTruthy();
  });
});
