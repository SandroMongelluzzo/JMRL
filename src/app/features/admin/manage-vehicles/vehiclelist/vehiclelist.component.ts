import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { VehicleService } from 'src/app/core/services/vehicle.service';

@Component({
  selector: 'app-vehiclelist',
  templateUrl: './vehiclelist.component.html',
  styleUrls: ['./vehiclelist.component.css']
})
export class VehiclelistComponent implements OnInit {
  dataSource = null as any;
  vehiclesMain = null as any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vehicleService: VehicleService,
    private alertService: AlertService) { }

  displayedColumns: string[] = ['id', 'type', 'model', 'plate', 'available', 'options'];


  ngOnInit(): void {
    this.vehicleService.getAll()
      .pipe(first())
      .subscribe(vehicles => {
        this.vehiclesMain = vehicles
        this.dataSource = new MatTableDataSource(this.vehiclesMain);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteVehicle(id: string) {
    const vehicle = this.vehiclesMain.find((x: any) => x.id === id);
    vehicle.isDeleting = true;
    this.vehicleService.delete(id)
      .pipe(first())
      .subscribe(() => this.vehiclesMain = this.vehiclesMain.filter((x: any) => x.id !== id));
    this.deleteRowDataTable();
    this.alertService.warn('Vehicle deleted successfully');
  }

  private deleteRowDataTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource = null;
    this.vehiclesMain = [];
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }

}