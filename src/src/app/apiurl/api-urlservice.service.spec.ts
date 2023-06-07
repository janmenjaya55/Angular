import { TestBed } from '@angular/core/testing';

import { ApiUrlserviceService } from './api-urlservice.service';

describe('ApiUrlserviceService', () => {
  let service: ApiUrlserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUrlserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
