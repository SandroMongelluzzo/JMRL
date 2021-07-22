import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VehicleType } from 'src/app/model/vehicleType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  private vehicleTypeSubject: BehaviorSubject<VehicleType>;
  public vehicleTypeMain: Observable<VehicleType>;
  data?: VehicleType;

  constructor(
    private http: HttpClient,
  ) {
    this.vehicleTypeSubject = new BehaviorSubject<VehicleType>(JSON.parse(localStorage.getItem('vehicle') as string));
    this.vehicleTypeMain = this.vehicleTypeSubject.asObservable();
  }

  public get vehicleTypeValue(): VehicleType {
    return this.vehicleTypeSubject.value;
  }

  register(vehicleTypeSecond: VehicleType) {
    return this.http.post(`${environment.apiUrl}/vehicleTypes/register`, vehicleTypeSecond);
  }

  getAll() {
    return this.http.get<VehicleType[]>(`${environment.apiUrl}/vehicleTypes`);
  }

  getById(id: string) {
    return this.http.get<VehicleType>(`${environment.apiUrl}/vehicleTypes/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/vehicleTypes/${id}`, params)
      .pipe(map(x => {
        if (id == this.vehicleTypeValue.id) {
          const vehicleType = { ...this.vehicleTypeValue, ...params };
          localStorage.setItem('vehicleType', JSON.stringify(vehicleType));
          this.vehicleTypeSubject.next(vehicleType);
        }
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/vehicleTypes/${id}`)
      .pipe(map(x => x));
  };
}