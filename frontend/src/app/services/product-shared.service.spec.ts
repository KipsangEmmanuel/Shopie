import { TestBed } from '@angular/core/testing';

import { ProductSharedService } from './product-shared.service';

describe('ProductSharedService', () => {
  let service: ProductSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
