import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from 'src/app/model/vehicle';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {


  private vehicleSubject: BehaviorSubject<Vehicle>;
  public vehicleMain: Observable<Vehicle>;
  data?: Vehicle;

  constructor(
    private http: HttpClient,
  ) {
    this.vehicleSubject = new BehaviorSubject<Vehicle>(JSON.parse(localStorage.getItem('vehicle') as string));
    this.vehicleMain = this.vehicleSubject.asObservable();

  }

  public get vehicleValue(): Vehicle {
    return this.vehicleSubject.value;
  }

  register(vehicleSecond: Vehicle) {
    return this.http.post(`${environment.apiUrl}/vehicles/register`, vehicleSecond);
  }

  getAll() {
    return this.http.get<Vehicle[]>(`${environment.apiUrl}/vehicles`);
  }

  getById(id: string) {
    return this.http.get<Vehicle>(`${environment.apiUrl}/vehicles/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/vehicles/${id}`, params)
      .pipe(map(x => {
        if (id == this.vehicleValue.id) {
          const vehicle = { ...this.vehicleValue, ...params };
          localStorage.setItem('vehicle', JSON.stringify(vehicle));
          this.vehicleSubject.next(vehicle);
        }
        return x;
      }));
  }

  delete(id: string) { //dovrebbe funzionare
    return this.http.delete(`${environment.apiUrl}/vehicles/${id}`)
      .pipe(map(x => x));
  };
}
