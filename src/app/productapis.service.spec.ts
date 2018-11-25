/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductapisService } from './productapis.service';

describe('ProductapisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductapisService]
    });
  });

  it('should ...', inject([ProductapisService], (service: ProductapisService) => {
    expect(service).toBeTruthy();
  }));
});
