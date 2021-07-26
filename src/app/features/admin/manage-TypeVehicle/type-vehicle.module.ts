import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeVehicleLayoutComponent } from './type-vehicle-layout/type-vehicle-layout.component';
import { TypeVehicleListComponent } from './type-vehicle-list/type-vehicle-list.component';
import { TypeVehicleAddEditComponent } from './type-vehicle-add-edit/type-vehicle-add-edit.component';
import { TypeVehicleRoutingModule } from './type-vehicle-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TypeVehicleLayoutComponent,
    TypeVehicleListComponent,
    TypeVehicleAddEditComponent
  ],
  imports: [
    CommonModule,
    TypeVehicleRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
  ]
})
export class TypeVehicleModule { }
