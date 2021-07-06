import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { VehicleService } from 'src/app/core/services/vehicle.service';


@Component({
  selector: 'app-vehiclelist',
  templateUrl: './vehiclelist.component.html',
  styleUrls: ['./vehiclelist.component.css']
})
export class VehiclelistComponent implements OnInit {
  vehicles = null as any;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getAll()
            .pipe(first())
            .subscribe(vehicles => this.vehicles = vehicles);
  }

  deleteVehicle(id: string) {
    const vehicle = this.vehicles.find((x: any) => x.id === id);
    vehicle.isDeleting = true;
    this.vehicleService.delete(id)
      .pipe(first())
      .subscribe(() => this.vehicles = this.vehicles.filter((x: any) => x.id !== id));
  }

}
