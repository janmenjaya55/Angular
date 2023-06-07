import { TestBed } from '@angular/core/testing';

import { UploadDocServiceService } from './upload-doc-service.service';

describe('UploadDocServiceService', () => {
  let service: UploadDocServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadDocServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
