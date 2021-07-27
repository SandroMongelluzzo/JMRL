import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { UserTypeService } from 'src/app/core/services/user-type.service';

@Component({
  selector: 'app-user-type-add-edit',
  templateUrl: './user-type-add-edit.component.html',
  styleUrls: ['./user-type-add-edit.component.css']
})
export class UserTypeAddEditComponent implements OnInit {

  form?: FormGroup;
  id?: number;
  isAddMode?: boolean;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userTypeService: UserTypeService,
      private alertService: AlertService
  ) {} 

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
    
      this.form = this.formBuilder.group({
          role: ['', Validators.required],
      });

      if (!this.isAddMode) {
          this.userTypeService.getById(this.id!)
              .pipe(first())
              .subscribe(x => this.form?.patchValue(x));
      }
  }

  get f() { return this.form?.controls; }

  onSubmit() {
      this.submitted = true;

      this.alertService.clear();

      if (this.form?.invalid) {
          return;
      }

      this.loading = true;
      if (this.isAddMode) {
          this.createUserType();
      } else {
          this.updateUserType();
      }
  }

  private createUserType() {
      this.userTypeService.register(this.form?.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('UserType added successfully', { keepAfterRouteChange: true });
                  this.router.navigate(['../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }

  private updateUserType() {
      this.userTypeService.update(this.id!, this.form?.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Update successful', { keepAfterRouteChange: true });
                  this.router.navigate(['../../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
}