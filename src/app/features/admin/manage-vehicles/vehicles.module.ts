import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleeditComponent } from './vehicleedit/vehicleedit.component';
import { VehiclelayoutComponent } from './vehiclelayout/vehiclelayout.component';
import { VehiclelistComponent } from './vehiclelist/vehiclelist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    VehicleeditComponent,
    VehiclelayoutComponent,
    VehiclelistComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    VehiclesRoutingModule,
  ]
})
export class VehiclesModule { }
