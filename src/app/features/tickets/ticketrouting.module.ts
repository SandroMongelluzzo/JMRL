import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutTicketComponent } from './layout-ticket/layout-ticket.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';


const routes: Routes = [
  {
    path: '', component: LayoutTicketComponent,
    children: [
      { path: '', component: ListTicketComponent },
      { path: 'add', component: NewTicketComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketroutingModule { }
