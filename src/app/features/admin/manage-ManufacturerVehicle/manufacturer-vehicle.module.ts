import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturerVehicleAddEditComponent } from './manufacturer-vehicle-add-edit/manufacturer-vehicle-add-edit.component';
import { ManufacturerVehicleListComponent } from './manufacturer-vehicle-list/manufacturer-vehicle-list.component';
import { ManufacturerVehicleLayoutComponent } from './manufacturer-vehicle-layout/manufacturer-vehicle-layout.component';
import { ManufacturerVehicleRoutingModule } from './manufacturer-vehicle-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ManufacturerVehicleAddEditComponent,
    ManufacturerVehicleListComponent,
    ManufacturerVehicleLayoutComponent
  ],
  imports: [
    CommonModule,
    ManufacturerVehicleRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
  ]
})
export class ManufacturerVehicleModule { }
