import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailsLayoutComponent } from './emails-layout/emails-layout.component';
import { EmailsListComponent } from './emails-list/emails-list.component';
import { EmailsEditComponent } from './emails-edit/emails-edit.component';

const routes: Routes = [
  {
    path:'', component: EmailsLayoutComponent,
    children:[
      {path:'', component:EmailsListComponent},
      { path: 'edit/:id', component: EmailsEditComponent }

    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class EmailsFCRoutingModule { }
