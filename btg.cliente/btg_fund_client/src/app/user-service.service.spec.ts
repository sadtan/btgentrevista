import { TestBed } from '@angular/core/testing';

import { UserServiceService } from './services/user-service';

describe('UserServiceService', () => {
  let service: UserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
