import { TestBed } from '@angular/core/testing';

import { LoginpageserviceService } from './loginpageservice.service';

describe('LoginpageserviceService', () => {
  let service: LoginpageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginpageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
