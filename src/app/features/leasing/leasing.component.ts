import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { Vehicle } from 'src/app/model/vehicle';

@Component({
  selector: 'app-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.css']
})
export class LeasingComponent implements OnInit {

  vehiclesMain?: Vehicle[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getAll()
      .pipe(first())
      .subscribe(vehicles2 => this.vehiclesMain = vehicles2);
  }

}