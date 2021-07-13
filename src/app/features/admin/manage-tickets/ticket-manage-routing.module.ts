import { NgModule } from '@angular/core';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { TicketListAllComponent } from './ticket-list-all/ticket-list-all.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { TicketAddByAdminComponent } from './ticket-add-by-admin/ticket-add-by-admin.component';

const routes: Routes = [
  {
    path: '', component: TicketLayoutComponent,
    children: [
      { path: '', component: TicketListAllComponent },
      { path: 'edit/:id', component: TicketEditComponent},
      { path: 'add', component: TicketAddByAdminComponent}

    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketManageRoutingModule { }
