import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { TicketListAllComponent } from './ticket-list-all/ticket-list-all.component';
import { TicketManageRoutingModule } from './ticket-manage-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TicketAddByAdminComponent } from './ticket-add-by-admin/ticket-add-by-admin.component';

@NgModule({
  declarations: [
    TicketLayoutComponent,
    TicketEditComponent,
    TicketListAllComponent,
    TicketAddByAdminComponent
  ],
  imports: [
    CommonModule,
    TicketManageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
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
export class TicketManageModule { }
