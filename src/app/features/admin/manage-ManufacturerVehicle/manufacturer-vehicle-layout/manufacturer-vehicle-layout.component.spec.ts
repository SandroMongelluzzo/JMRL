import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerVehicleLayoutComponent } from './manufacturer-vehicle-layout.component';

describe('ManufacturerVehicleLayoutComponent', () => {
  let component: ManufacturerVehicleLayoutComponent;
  let fixture: ComponentFixture<ManufacturerVehicleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerVehicleLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerVehicleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
