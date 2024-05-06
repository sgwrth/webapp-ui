import { TestBed } from '@angular/core/testing';

import { NavRouteService } from './nav-route.service';

describe('NavRouteService', () => {
  let service: NavRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
