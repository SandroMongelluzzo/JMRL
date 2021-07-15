import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { VehicleService } from 'src/app/core/services/vehicle.service';


@Component({
  selector: 'app-vehiclelist',
  templateUrl: './vehiclelist.component.html',
  styleUrls: ['./vehiclelist.component.css']
})
export class VehiclelistComponent implements OnInit {
  vehiclesMain = null as any;

  constructor(
    private vehicleService: VehicleService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.vehicleService.getAll()
            .pipe(first())
            .subscribe(vehicles => this.vehiclesMain = vehicles);
  }

  deleteVehicle(id: string) {
    const vehicle = this.vehiclesMain.find((x: any) => x.id === id);
    vehicle.isDeleting = true;
    this.vehicleService.delete(id)
      .pipe(first())
      .subscribe(() => this.vehiclesMain = this.vehiclesMain.filter((x: any) => x.id !== id));
      this.alertService.warn('Vehicle deleted successfully');

  }
 
}