import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManufacturerVehicleAddEditComponent } from './manufacturer-vehicle-add-edit/manufacturer-vehicle-add-edit.component';
import { ManufacturerVehicleLayoutComponent } from './manufacturer-vehicle-layout/manufacturer-vehicle-layout.component';
import { ManufacturerVehicleListComponent } from './manufacturer-vehicle-list/manufacturer-vehicle-list.component';

const routes: Routes = [
  {
    path: '', component: ManufacturerVehicleLayoutComponent,
    children: [
      { path: '', component: ManufacturerVehicleListComponent },
      { path: 'new', component: ManufacturerVehicleAddEditComponent },
      { path: 'edit/:id', component: ManufacturerVehicleAddEditComponent }
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManufacturerVehicleRoutingModule { }
