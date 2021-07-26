import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlaAddEditComponent } from './sla-add-edit/sla-add-edit.component';
import { SlaLayoutComponent } from './sla-layout/sla-layout.component';
import { SlaListComponent } from './sla-list/sla-list.component';

const routes: Routes = [
  {
    path: '', component: SlaLayoutComponent,
    children: [
      { path: '', component: SlaListComponent },
      { path: 'new', component: SlaAddEditComponent },
      { path: 'edit/:id', component: SlaAddEditComponent }
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
export class SlaRoutingModule { }
