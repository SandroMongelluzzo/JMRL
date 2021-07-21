import { NgModule } from '@angular/core';
import { FaqLayoutComponent } from './faq-layout/faq-layout.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqAddEditComponent } from './faq-add-edit/faq-add-edit.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '', component: FaqLayoutComponent,
    children: [
      { path: '', component: FaqListComponent },
      { path: 'new', component: FaqAddEditComponent },
      { path: 'edit/:id', component: FaqAddEditComponent }
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
export class ManageFaqRoutingModule { }
