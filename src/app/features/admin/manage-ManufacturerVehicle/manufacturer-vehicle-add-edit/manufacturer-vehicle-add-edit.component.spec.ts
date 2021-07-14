import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerVehicleAddEditComponent } from './manufacturer-vehicle-add-edit.component';

describe('ManufacturerVehicleAddEditComponent', () => {
  let component: ManufacturerVehicleAddEditComponent;
  let fixture: ComponentFixture<ManufacturerVehicleAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerVehicleAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerVehicleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
