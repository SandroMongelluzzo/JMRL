import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTeamsLayoutComponent } from './manage-teams-layout/manage-teams-layout.component';
import { ManageTeamsListComponent } from './manage-teams-list/manage-teams-list.component';
import { ManageTeamsAddEditComponent } from './manage-teams-add-edit/manage-teams-add-edit.component';
import { ManageTeamsRootingModule } from './manage-teams-rooting.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ManageTeamsLayoutComponent,
    ManageTeamsListComponent,
    ManageTeamsAddEditComponent
  ],
  imports: [
    CommonModule,
    ManageTeamsRootingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
  ]
})
export class ManageTeamsModule { }
