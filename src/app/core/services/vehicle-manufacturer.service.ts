import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VehicleManufacturer } from 'src/app/model/vehicleManufacturer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleManufacturerService {

  private vehicleManufacturerSubject: BehaviorSubject<VehicleManufacturer>;
  public vehicleManufacturerMain: Observable<VehicleManufacturer>;
  data?: VehicleManufacturer;

  constructor(
    private http: HttpClient,
  ) {
    this.vehicleManufacturerSubject = new BehaviorSubject<VehicleManufacturer>(JSON.parse(localStorage.getItem('vehicle') as string));
    this.vehicleManufacturerMain = this.vehicleManufacturerSubject.asObservable();
  }

  public get vehicleManufacturerValue(): VehicleManufacturer {
    return this.vehicleManufacturerSubject.value;
  }

  register(vehicleManufacturerSecond: VehicleManufacturer) {
    return this.http.post(`${environment.apiUrl}/vehicleManufacturers/register`, vehicleManufacturerSecond);
  }

  getAll() {
    return this.http.get<VehicleManufacturer[]>(`${environment.apiUrl}/vehicleManufacturers`);
  }

  getById(id: string) {
    return this.http.get<VehicleManufacturer>(`${environment.apiUrl}/vehicleManufacturers/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/vehicleManufacturers/${id}`, params)
      .pipe(map(x => {
        if (id == this.vehicleManufacturerValue.id) {
          const vehicleManufacturer = { ...this.vehicleManufacturerValue, ...params };
          localStorage.setItem('vehicleManufacturer', JSON.stringify(vehicleManufacturer));
          this.vehicleManufacturerSubject.next(vehicleManufacturer);
        }
        return x;
      }));
  }

  delete(id: string) { //dovrebbe funzionare
    return this.http.delete(`${environment.apiUrl}/vehicleManufacturers/${id}`)
      .pipe(map(x => x));
  };
}
