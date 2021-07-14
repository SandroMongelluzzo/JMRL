import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';

const routes: Routes = [
  {
    path: '', component: AdminPageComponent,
    children: [
      {
        path: 'manageTypeVehicle', loadChildren: () => import('src/app/features/admin/manage-TypeVehicle/type-vehicle.module').then(m => m.TypeVehicleModule)
      },
      {
        path: 'manageManufacturerVehicle', loadChildren: () => import('src/app/features/admin/manage-ManufacturerVehicle/manufacturer-vehicle.module').then(m => m.ManufacturerVehicleModule)
      }
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
export class AdminPageRoutingModule { }
