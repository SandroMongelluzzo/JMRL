import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerVehicleListComponent } from './manufacturer-vehicle-list.component';

describe('ManufacturerVehicleListComponent', () => {
  let component: ManufacturerVehicleListComponent;
  let fixture: ComponentFixture<ManufacturerVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerVehicleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
