import { TestBed } from '@angular/core/testing';

import { DatabasesService } from './databases.service';

describe('DatabasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabasesService = TestBed.get(DatabasesService);
    expect(service).toBeTruthy();
  });
});
