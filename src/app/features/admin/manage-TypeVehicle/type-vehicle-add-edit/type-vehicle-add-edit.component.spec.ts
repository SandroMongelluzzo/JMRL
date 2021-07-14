import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeVehicleAddEditComponent } from './type-vehicle-add-edit.component';

describe('TypeVehicleAddEditComponent', () => {
  let component: TypeVehicleAddEditComponent;
  let fixture: ComponentFixture<TypeVehicleAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeVehicleAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeVehicleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
