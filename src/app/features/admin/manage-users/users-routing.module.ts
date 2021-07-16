import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { CommonModule } from '@angular/common';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
    {
        path: '', component: UserLayoutComponent,
        children: [
            { path: '', component: UserListComponent },
            { path: 'add', component: UserAddEditComponent },
            { path: 'edit/:id', component: UserAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports: [
        RouterModule
    ]
})
export class UsersRoutingModule { }