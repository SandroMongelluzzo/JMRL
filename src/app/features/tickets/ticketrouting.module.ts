import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutTicketComponent } from './layout-ticket/layout-ticket.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { ReadticketComponent } from './readticket/readticket.component';
import { NewTicketByUserComponent } from './new-ticket-by-user/new-ticket-by-user.component';

const routes: Routes = [
  {
    path: '', component: LayoutTicketComponent,
    children: [
      { path: '', component: ListTicketComponent },
      { path: 'add', component: NewTicketComponent },
      { path: 'user/add', component: NewTicketByUserComponent },
      { path: 'read/:id', component: ReadticketComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketroutingModule { }