import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { VehicleTypeService } from 'src/app/core/services/vehicle-type.service';

@Component({
  selector: 'app-type-vehicle-list',
  templateUrl: './type-vehicle-list.component.html',
  styleUrls: ['./type-vehicle-list.component.css']
})
export class TypeVehicleListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'options'];
  types=null as any
  dataSource = null as any;

  
  constructor(
    private vehicleTypeService: VehicleTypeService,    
    private alertService: AlertService) { }


  ngOnInit(): void {

    this.vehicleTypeService.getAll()
      .pipe(first())
      .subscribe(type =>        { 
        this.types = type
        this.dataSource =  new MatTableDataSource(this.types)
        });
  }

  deleteTypeVehicle(id: string) {
    const typevehicle = this.types.find((x: any) => x.id === id);
    typevehicle.isDeleting = true;
    this.vehicleTypeService.delete(id)
      .pipe(first())
      .subscribe(() => this.types = this.types.filter((x: any) => x.id !== id));
    this.deleteRowDataTable();
    this.alertService.warn('Vehicle Type deleted successfully', { keepAfterRouteChange: true });
  }

  private deleteRowDataTable() {
    this.dataSource = null;
    this.types = null;
    setTimeout(() => {      
      this.ngOnInit();
    }, 500);
  }
}
