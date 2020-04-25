import { TestBed } from '@angular/core/testing';

import { AuditlogserviceService } from './auditlogservice.service';

describe('AuditlogserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditlogserviceService = TestBed.get(AuditlogserviceService);
    expect(service).toBeTruthy();
  });
});
