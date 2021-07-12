import { Component, OnInit, Type } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { first, map, startWith } from 'rxjs/operators';
import { Vehicle } from 'src/app/model/vehicle';
import { Observable } from 'rxjs';

export interface VehicleTypes {
  type: string;
}

@Component({
  selector: 'app-vehicleedit',
  templateUrl: './vehicleedit.component.html',
  styleUrls: ['./vehicleedit.component.css']
})
export class VehicleeditComponent implements OnInit {
  //
  myControl = new FormControl();
  options: VehicleTypes[] = [
    {type: 'Truck'},
    {type: 'Van'},
    {type: 'OffRoad'},
  ];
  filteredOptions?: Observable<VehicleTypes[]>;
  //
  form?: FormGroup;
  id?: string;
  isAddMode?: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      plate: ['', Validators.required],
      matriculation: ['', Validators.required],
      available: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.vehicleService.getById(this.id!)
        .pipe(first())
        .subscribe(x => this.form?.patchValue(x));
    }

    //
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(type => type ? this._filter(type) : this.options!.slice())
        
        //map(value => this._filter(value))
        //map(value => value ? this._filter(value) : this.options!.slice())
      );
  }

  get f() { return this.form?.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form?.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createVehicle();
    } else {
      this.updateVehicle();
    }
  }

  private createVehicle() {
    this.vehicleService.register(this.form?.value)
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

  private updateVehicle() {
    this.vehicleService.update(this.id!, this.form?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
  //
  displayFn(vehicle: VehicleTypes): string {
    return vehicle && vehicle.type ? vehicle.type : '';
  }

  private _filter(type: string): VehicleTypes[] {
    const filterValue = type.toLowerCase();

    return this.options!.filter((option: { type: string; }) => option.type.toLowerCase().includes(filterValue));
  }


}
