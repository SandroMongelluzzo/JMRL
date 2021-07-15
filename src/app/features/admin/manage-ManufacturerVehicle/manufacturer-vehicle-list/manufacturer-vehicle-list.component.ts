import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { VehicleManufacturerService } from 'src/app/core/services/vehicle-manufacturer.service';

@Component({
  selector: 'app-manufacturer-vehicle-list',
  templateUrl: './manufacturer-vehicle-list.component.html',
  styleUrls: ['./manufacturer-vehicle-list.component.css']
})
export class ManufacturerVehicleListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'options'];
  manufacturers=null as any
  dataSource = null as any;

  
  constructor(
    private vehicleManufacturerService: VehicleManufacturerService,    
    private alertService: AlertService) { }


  ngOnInit(): void {

    this.vehicleManufacturerService.getAll()
      .pipe(first())
      .subscribe(manufacturer =>        { 
        this.manufacturers = manufacturer
        this.dataSource =  new MatTableDataSource(this.manufacturers)
        });
  }

  deleteManufacturerVehicle(id: string) {
    const manufacturervehicle = this.manufacturers.find((x: any) => x.id === id);
    manufacturervehicle.isDeleting = true;
    this.vehicleManufacturerService.delete(id)
      .pipe(first())
      .subscribe(() => this.manufacturers = this.manufacturers.filter((x: any) => x.id !== id));
    this.deleteRowDataTable();
    this.alertService.warn('Vehicle Manufacturer deleted successfully');

  }

  private deleteRowDataTable() {
    window.location.reload();
  }
}
