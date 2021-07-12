import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleeditComponent } from './vehicleedit/vehicleedit.component';
import { VehiclelayoutComponent } from './vehiclelayout/vehiclelayout.component';
import { VehiclelistComponent } from './vehiclelist/vehiclelist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    VehicleeditComponent,
    VehiclelayoutComponent,
    VehiclelistComponent,
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatAutocompleteModule
    

  ]
})
export class VehiclesModule { }
