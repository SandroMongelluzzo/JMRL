import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturerVehicleAddEditComponent } from './manufacturer-vehicle-add-edit/manufacturer-vehicle-add-edit.component';
import { ManufacturerVehicleListComponent } from './manufacturer-vehicle-list/manufacturer-vehicle-list.component';
import { ManufacturerVehicleLayoutComponent } from './manufacturer-vehicle-layout/manufacturer-vehicle-layout.component';
import { ManufacturerVehicleRoutingModule } from './manufacturer-vehicle-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
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
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule
  ]
})
export class ManufacturerVehicleModule { }
