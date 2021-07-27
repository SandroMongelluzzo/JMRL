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
      },
      {
        path: 'manageFaq', loadChildren: () => import('src/app/features/admin/manage-faq/manage-faq.module').then(m => m.ManageFaqModule)
      },
      {
        path: 'manageSla', loadChildren: () => import('src/app/features/admin/manage-sla/sla.module').then(m => m.SlaModule)
      },
      {
        path: 'manageUserTypes', loadChildren: () => import('src/app/features/admin/manage-userType/user-type.module').then(m => m.UserTypeModule)
      },
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
