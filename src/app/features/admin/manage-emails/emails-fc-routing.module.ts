import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmailsLayoutComponent } from './emails-layout/emails-layout.component';
import { EmailsListComponent } from './emails-list/emails-list.component';

const routes: Routes = [
  {
    path:'', component: EmailsLayoutComponent,
    children:[
      {path:'', component:EmailsListComponent},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class EmailsFCRoutingModule { }
