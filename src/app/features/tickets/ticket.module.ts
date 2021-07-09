import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { LayoutTicketComponent } from './layout-ticket/layout-ticket.component';
import { TicketroutingModule } from './ticketrouting.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ListTicketComponent,
    NewTicketComponent,
    LayoutTicketComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TicketroutingModule,
  ]
})
export class TicketModule { }
