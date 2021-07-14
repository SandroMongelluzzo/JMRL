import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeVehicleLayoutComponent } from './type-vehicle-layout.component';

describe('TypeVehicleLayoutComponent', () => {
  let component: TypeVehicleLayoutComponent;
  let fixture: ComponentFixture<TypeVehicleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeVehicleLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeVehicleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
