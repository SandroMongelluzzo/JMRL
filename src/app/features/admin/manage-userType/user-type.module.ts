import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTypeListComponent } from './user-type-list/user-type-list.component';
import { UserTypeLayoutComponent } from './user-type-layout/user-type-layout.component';
import { UserTypeAddEditComponent } from './user-type-add-edit/user-type-add-edit.component';
import { UserTypeRootingModule } from './user-type-rooting.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UserTypeListComponent,
    UserTypeLayoutComponent,
    UserTypeAddEditComponent
  ],
  imports: [
    CommonModule,
    UserTypeRootingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
  ]
})
export class UserTypeModule { }