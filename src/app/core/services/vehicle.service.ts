import { HttpClient } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Vehicle } from 'src/app/model/vehicle';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SortColumn, SortDirection } from 'src/app/shared/directive/sortable.directive';
import { DecimalPipe } from '@angular/common';

/*
interface SearchResult {
  vehicles: Vehicle[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number | boolean, v2: string | number | boolean) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(vehicles: Vehicle[], column: SortColumn, direction: string): Vehicle[] {
  if (direction === '' || column === '') {
    return vehicles;
  } else {
    return [...vehicles].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(vehicle: Vehicle, term: string, pipe: PipeTransform) {
  return vehicle.type.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(vehicle.model).includes(term)
    || pipe.transform(vehicle.plate).includes(term)
    || pipe.transform(vehicle.available).includes(term);

}*/

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  /*

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _vehicles$ = new BehaviorSubject<Vehicle[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };*/


  private vehicleSubject: BehaviorSubject<Vehicle>;
  public vehicleMain: Observable<Vehicle>;
  data?: Vehicle;

  constructor(
   /* private router: Router,
    private pipe: DecimalPipe,*/
    private http: HttpClient,
  ) {
    this.vehicleSubject = new BehaviorSubject<Vehicle>(JSON.parse(localStorage.getItem('vehicle') as string));
    this.vehicleMain = this.vehicleSubject.asObservable();

    /*this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._vehicles$.next(result.vehicles);
      this._total$.next(result.total);
    });

    this._search$.next();*/
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

  /*
  get vehicles$() { return this._vehicles$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }


  
  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
    const VEHICLES: Vehicle[] = []
    // 1. sort
    let vehicles = sort(VEHICLES , sortColumn, sortDirection);

    // 2. filter
    vehicles = vehicles.filter(vehicles => matches(vehicles, searchTerm, this.pipe));
    const total = vehicles.length;

    // 3. paginate
    vehicles = vehicles.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ vehicles, total });
  }*/
}
