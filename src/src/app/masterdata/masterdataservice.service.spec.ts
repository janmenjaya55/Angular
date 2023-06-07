import { TestBed } from '@angular/core/testing';

import { MasterdataserviceService } from './masterdataservice.service';

describe('MasterdataserviceService', () => {
  let service: MasterdataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterdataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
