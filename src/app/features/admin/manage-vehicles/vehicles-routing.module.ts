import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleeditComponent } from './vehicleedit/vehicleedit.component';
import { VehiclelayoutComponent } from './vehiclelayout/vehiclelayout.component';
import { VehiclelistComponent } from './vehiclelist/vehiclelist.component';



const routes: Routes = [
    {
        path: '', component: VehiclelayoutComponent,
        children: [
            { path: '', component: VehiclelistComponent },
            { path: 'add', component: VehicleeditComponent },
            { path: 'edit/:id', component: VehicleeditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehiclesRoutingModule { }