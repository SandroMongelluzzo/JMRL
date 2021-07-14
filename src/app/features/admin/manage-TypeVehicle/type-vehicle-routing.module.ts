import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeVehicleAddEditComponent } from './type-vehicle-add-edit/type-vehicle-add-edit.component';
import { TypeVehicleLayoutComponent } from './type-vehicle-layout/type-vehicle-layout.component';
import { TypeVehicleListComponent } from './type-vehicle-list/type-vehicle-list.component';

const routes: Routes = [
  {
    path: '', component: TypeVehicleLayoutComponent,
    children: [
      { path: '', component: TypeVehicleListComponent },
      { path: 'new', component: TypeVehicleAddEditComponent },
      { path: 'edit/:id', component: TypeVehicleAddEditComponent }
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
export class TypeVehicleRoutingModule { }
