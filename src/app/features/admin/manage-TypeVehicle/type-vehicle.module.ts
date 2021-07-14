import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeVehicleLayoutComponent } from './type-vehicle-layout/type-vehicle-layout.component';
import { TypeVehicleListComponent } from './type-vehicle-list/type-vehicle-list.component';
import { TypeVehicleAddEditComponent } from './type-vehicle-add-edit/type-vehicle-add-edit.component';
import { TypeVehicleRoutingModule } from './type-vehicle-routing.module';
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
    TypeVehicleLayoutComponent,
    TypeVehicleListComponent,
    TypeVehicleAddEditComponent
  ],
  imports: [
    CommonModule,
    TypeVehicleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule
  ]
})
export class TypeVehicleModule { }
