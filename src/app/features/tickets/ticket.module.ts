import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { LayoutTicketComponent } from './layout-ticket/layout-ticket.component';
import { TicketroutingModule } from './ticketrouting.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ReadticketComponent } from './readticket/readticket.component';
import { NewTicketByUserComponent } from './new-ticket-by-user/new-ticket-by-user.component';
import { ReadTicketUserComponent } from './read-ticket-user/read-ticket-user.component';

@NgModule({
  declarations: [
    ListTicketComponent,
    NewTicketComponent,
    LayoutTicketComponent,
    ReadticketComponent,
    NewTicketByUserComponent,
    ReadTicketUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TicketroutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule
  ]
})
export class TicketModule { }