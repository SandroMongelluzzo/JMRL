import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { VehicleTypeService } from 'src/app/core/services/vehicle-type.service';

@Component({
  selector: 'app-type-vehicle-add-edit',
  templateUrl: './type-vehicle-add-edit.component.html',
  styleUrls: ['./type-vehicle-add-edit.component.css']
})
export class TypeVehicleAddEditComponent implements OnInit {

  form?: FormGroup;
  id?: string;
  isAddMode?: boolean;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private vehicleTypeService: VehicleTypeService,
      private alertService: AlertService
  ) {} 

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
    
      this.form = this.formBuilder.group({
          type: ['', Validators.required],
      });

      if (!this.isAddMode) {
          this.vehicleTypeService.getById(this.id!)
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
          this.createTypeVehicle();
      } else {
          this.updateTypeVehicle();
      }
  }

  private createTypeVehicle() {
      this.vehicleTypeService.register(this.form?.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Vehicle added successfully', { keepAfterRouteChange: true });
                  this.router.navigate(['../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }

  private updateTypeVehicle() {
      this.vehicleTypeService.update(this.id!, this.form?.value)
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