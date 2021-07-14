import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { VehicleManufacturerService } from 'src/app/core/services/vehicle-manufacturer.service';

@Component({
  selector: 'app-manufacturer-vehicle-add-edit',
  templateUrl: './manufacturer-vehicle-add-edit.component.html',
  styleUrls: ['./manufacturer-vehicle-add-edit.component.css']
})
export class ManufacturerVehicleAddEditComponent implements OnInit {

  iUrl = null as any;


  form?: FormGroup;
  id?: string;
  isAddMode?: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleManufacturerService: VehicleManufacturerService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['']
    });

    if (!this.isAddMode) {
      this.vehicleManufacturerService.getById(this.id!)
        .pipe(first())
        .subscribe(x => {
          this.form?.patchValue(x)
          this.iUrl = x.imageUrl

        });
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
      this.createManufacturerVehicle();
    } else {
      this.updateManufacturerVehicle();
    }
  }

  private createManufacturerVehicle() {
    this.vehicleManufacturerService.register(this.form?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Manufacturer added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateManufacturerVehicle() {
    this.vehicleManufacturerService.update(this.id!, this.form?.value)
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