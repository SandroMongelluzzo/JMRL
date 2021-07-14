import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeVehicleListComponent } from './type-vehicle-list.component';

describe('TypeVehicleListComponent', () => {
  let component: TypeVehicleListComponent;
  let fixture: ComponentFixture<TypeVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeVehicleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
