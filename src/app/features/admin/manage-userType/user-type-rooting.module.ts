import { NgModule } from '@angular/core';
import { UserTypeListComponent } from './user-type-list/user-type-list.component';
import { UserTypeAddEditComponent } from './user-type-add-edit/user-type-add-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { UserTypeLayoutComponent } from './user-type-layout/user-type-layout.component';

const routes: Routes = [
  {
    path: '', component: UserTypeLayoutComponent,
    children: [
      { path: '', component: UserTypeListComponent },
      { path: 'new', component: UserTypeAddEditComponent },
      { path: 'edit/:id', component: UserTypeAddEditComponent }
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserTypeRootingModule { }