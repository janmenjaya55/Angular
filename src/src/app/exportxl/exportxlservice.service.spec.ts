import { TestBed } from '@angular/core/testing';

import { ExportxlserviceService } from './exportxlservice.service';

describe('ExportxlserviceService', () => {
  let service: ExportxlserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportxlserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
