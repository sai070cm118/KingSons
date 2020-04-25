import { TestBed } from '@angular/core/testing';

import { RandomstringService } from './randomstring.service';

describe('RandomstringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomstringService = TestBed.get(RandomstringService);
    expect(service).toBeTruthy();
  });
});
