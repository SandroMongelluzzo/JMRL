import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [
        UserLayoutComponent,
        UserListComponent,
        UserAddEditComponent
    ]
})
export class UsersModule { }