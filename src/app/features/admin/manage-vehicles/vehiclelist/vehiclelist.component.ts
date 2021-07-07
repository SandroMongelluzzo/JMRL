import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, delay, first, switchMap, tap } from 'rxjs/operators';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { Vehicle } from 'src/app/model/vehicle';
import { NgbdSortableHeader, SortColumn, SortDirection, SortEvent } from 'src/app/shared/directive/sortable.directive';


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
    || pipe.transform(vehicle.available).includes(term); //?

}

@Component({
  selector: 'app-vehiclelist',
  templateUrl: './vehiclelist.component.html',
  styleUrls: ['./vehiclelist.component.css']
})
export class VehiclelistComponent implements OnInit {  
  
  @ViewChildren(NgbdSortableHeader) headers?: QueryList<NgbdSortableHeader>;
  
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
    };

  vehiclesMain = null as any;

  constructor(
    private router: Router,
    private pipe: DecimalPipe,
    private vehicleService: VehicleService
  ) {
    
    this._search$.pipe(
    tap(() => this._loading$.next(true)),
    debounceTime(200),
    switchMap(() => this._search()),
    delay(200),
    tap(() => this._loading$.next(false))
  ).subscribe(result => {
    this._vehicles$.next(result.vehicles);
    this._total$.next(result.total);
  });

  this._search$.next();
  
  }

  ngOnInit(): void {
    this.vehicleService.getAll()
      .pipe(first())
      .subscribe(vehicles2 => this.vehiclesMain = vehicles2);

  }

  deleteVehicle(id: string) {
    const vehicle = this.vehiclesMain.find((x: any) => x.id === id);
    vehicle.isDeleting = true;
    this.vehicleService.delete(id)
      .pipe(first())
      .subscribe(() => this.vehiclesMain = this.vehiclesMain.filter((x: any) => x.id !== id));
  }

   
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
    // 1. sort
    let vehicles = sort(this.vehiclesMain , sortColumn, sortDirection);

    // 2. filter
    vehicles = vehicles.filter(vehicles => matches(vehicles, searchTerm, this.pipe));
    const total = vehicles.length;

    // 3. paginate
    vehicles = vehicles.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ vehicles, total });
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.sortColumn = column;
    this.sortDirection = direction;
  }

}
