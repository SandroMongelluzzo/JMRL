import { Component, OnInit, Type } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { first, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { VehicleType } from 'src/app/model/vehicleType';
import { VehicleTypeService } from 'src/app/core/services/vehicle-type.service';
import { VehicleManufacturerService } from 'src/app/core/services/vehicle-manufacturer.service';
import { VehicleManufacturer } from 'src/app/model/vehicleManufacturer';



@Component({
  selector: 'app-vehicleedit',
  templateUrl: './vehicleedit.component.html',
  styleUrls: ['./vehicleedit.component.css']
})
export class VehicleeditComponent implements OnInit {

  iUrl = null as any;

  availability!: string;
  availables: string[] = ['true', 'false'];
  checked = null as any;

  //
  myControlType = new FormControl();
  myControlManufacturer = new FormControl();

  optionsTypes?: VehicleType[];
  optionsManufacturers?: VehicleManufacturer[];

  loadedType = null as any;
  loadedManufacturer = null as any;

  typeSelected_autocomplete?:VehicleType;
  manufacturerSelected_autocomplete?:VehicleManufacturer;

  filteredOptionsType?: Observable<VehicleType[]>;
  filteredOptionsManufacturer?: Observable<VehicleManufacturer[]>;

  //
  form?: FormGroup;
  id?: string;
  isAddMode?: boolean;
  loading = false;
  submitted = false;

  //
  hideTypeId = true;
  hideManufacturerId = true;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService,
    private vehicleManufacturerService: VehicleManufacturerService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {

    this.vehicleTypeService.getAll()
      .pipe(first())
      .subscribe(type => this.optionsTypes = type);

    this.vehicleManufacturerService.getAll()
      .pipe(first())
      .subscribe(manufacturer => this.optionsManufacturers = manufacturer);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      typeId: ['', Validators.required],
      manufacturer: ['', Validators.required],
      manufacturerId: ['', Validators.required],
      model: ['', Validators.required],
      plate: ['', Validators.required],
      matriculation: ['', Validators.required],
      available: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.vehicleService.getById(this.id!)
        .pipe(first())
        .subscribe(x => {
          this.form?.patchValue(x)
          this.loadedType = x.type;
          this.loadedManufacturer = x.manufacturer;
          this.iUrl = x.imageUrl;
          this.availability = x.available.toString();
          this.checked = this.availability;
        });
    }

    setTimeout(() => { //caricamento Vehicle Types
      this.filteredOptionsType = this.myControlType.valueChanges
        .pipe(
          startWith(''),
          map(valueType => typeof valueType === 'string' ? valueType : valueType.type),
          map(type => type ? this._filterType(type) : this.optionsTypes!.slice())
        );
    }, 500);

    setTimeout(() => { // caricamento vehicle manufacturer
      this.filteredOptionsManufacturer = this.myControlManufacturer.valueChanges
        .pipe(
          startWith(''),
          map(valueManufacturer => typeof valueManufacturer === 'string' ? valueManufacturer : valueManufacturer.manufacturer),
          map(manufacturer => manufacturer ? this._filterManufacturer(manufacturer) : this.optionsManufacturers!.slice())
        );
    }, 500);
  }

  get f() { return this.form?.controls; }

  onSubmit() {
    
    this.submitted = true;

    this.alertService.clear();

    if (this.form?.invalid) {
      console.log(this.form)
      console.log('Something is invalid')
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

    this.form!.value.type = this.typeSelected_autocomplete?.type;
    this.form!.value.manufacturer = this.manufacturerSelected_autocomplete?.name;

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

    this.form!.value.type = this.form!.value.type.type;
    this.form!.value.manufacturer = this.form!.value.manufacturer.name;

    this.vehicleService.update(this.id!, this.form?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
          this.router.navigate(['../../'], { relativeTo: this.route });
        }
      });
  }

  displayFnType(vehicle: VehicleType): string {
    return vehicle && vehicle.type ? vehicle.type : '';
  }

  displayFnManufacturer(vehicle: VehicleManufacturer): string {
    return vehicle && vehicle.name ? vehicle.name : '';
  }

  private _filterType(type: string): VehicleType[] {
    const filterValueType = type.toLowerCase();
    return this.optionsTypes!.filter((option: { type: string; }) => option.type.toLowerCase().includes(filterValueType));
  }

  private _filterManufacturer(manufacturer: string): VehicleManufacturer[] {
    const filterValueManufacturer = manufacturer.toLowerCase();
    return this.optionsManufacturers!.filter((option: { name: string; }) => option.name.toLowerCase().includes(filterValueManufacturer));
  }

  OnTypeSelected(option: MatOption) {
    this.typeSelected_autocomplete = option.value
    return option.value.type;
  }

  OnManufacturerSelected(option: MatOption) {
    this.manufacturerSelected_autocomplete = option.value
    return option.value.name;
  }

  ShowTypeId() {
    this.form!.value.typeId = this.typeSelected_autocomplete?.id;
    this.form?.controls.typeId.setValue(this.typeSelected_autocomplete?.id);
    this.hideTypeId = false;
  }

  ShowManufacturerId() {
    this.form!.value.manufacturerId = this.manufacturerSelected_autocomplete?.id;
    this.form?.controls.manufacturerId.setValue(this.manufacturerSelected_autocomplete?.id);
    this.hideManufacturerId = false;
  }
}
