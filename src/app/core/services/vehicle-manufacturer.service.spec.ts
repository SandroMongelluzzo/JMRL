import { TestBed } from '@angular/core/testing';

import { VehicleManufacturerService } from './vehicle-manufacturer.service';

describe('VehicleManufacturerService', () => {
  let service: VehicleManufacturerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleManufacturerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});