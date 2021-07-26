import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailsListComponent } from './emails-list/emails-list.component';
import { EmailsLayoutComponent } from './emails-layout/emails-layout.component';
import { EmailsFCRoutingModule } from './emails-fc-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmailsEditComponent } from './emails-edit/emails-edit.component';

@NgModule({
  declarations: [
    EmailsListComponent,
    EmailsLayoutComponent,
    EmailsEditComponent
  ],
  imports: [
    CommonModule,
    EmailsFCRoutingModule,
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
export class EmailsFCModule { }
