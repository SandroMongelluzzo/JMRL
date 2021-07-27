import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageTeamsAddEditComponent } from './manage-teams-add-edit/manage-teams-add-edit.component';
import { ManageTeamsLayoutComponent } from './manage-teams-layout/manage-teams-layout.component';
import { ManageTeamsListComponent } from './manage-teams-list/manage-teams-list.component';

const routes: Routes = [
  {
    path: '', component: ManageTeamsLayoutComponent,
    children: [
      { path: '', component: ManageTeamsListComponent },
      { path: 'new', component: ManageTeamsAddEditComponent },
      { path: 'edit/:id', component: ManageTeamsAddEditComponent }
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
export class ManageTeamsRootingModule { }
