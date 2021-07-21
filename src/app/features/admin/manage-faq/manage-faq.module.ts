import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqLayoutComponent } from './faq-layout/faq-layout.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqAddEditComponent } from './faq-add-edit/faq-add-edit.component';
import { ManageFaqRoutingModule } from './manage-faq-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    FaqLayoutComponent,
    FaqListComponent,
    FaqAddEditComponent
  ],
  imports: [
    CommonModule,
    ManageFaqRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
  ]
})
export class ManageFaqModule { }
