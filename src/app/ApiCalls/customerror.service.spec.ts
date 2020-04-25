import { TestBed } from '@angular/core/testing';

import { CustomerrorService } from './customerror.service';

describe('CustomerrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerrorService = TestBed.get(CustomerrorService);
    expect(service).toBeTruthy();
  });
});
