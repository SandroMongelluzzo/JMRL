import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlaAddEditComponent } from './sla-add-edit/sla-add-edit.component';
import { SlaLayoutComponent } from './sla-layout/sla-layout.component';
import { SlaListComponent } from './sla-list/sla-list.component';
import { SlaRoutingModule } from './sla-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    SlaListComponent,
    SlaLayoutComponent,
    SlaAddEditComponent,
  ],
  imports: [
    CommonModule,
    SlaRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
  ]
})
export class SlaModule { }
