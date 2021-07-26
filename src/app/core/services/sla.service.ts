import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Faq } from 'src/app/model/faq';
import { Sla } from 'src/app/model/sla';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlaService {
  private slaSubject: BehaviorSubject<Sla>;
  public slaMain: Observable<Sla>;
  data?: Sla;

  constructor(
    private http: HttpClient,
  ) {
    this.slaSubject = new BehaviorSubject<Sla>(JSON.parse(localStorage.getItem('sla') as string));
    this.slaMain = this.slaSubject.asObservable();
  }

  public get slaValue(): Sla {
    return this.slaSubject.value;
  }

  register(slaSecond: Sla) {
    return this.http.post(`${environment.apiUrl}/manageSla/register`, slaSecond);
  }

  getAll() {
    return this.http.get<Sla[]>(`${environment.apiUrl}/manageSla`);
  }

  getById(id: number) {
    return this.http.get<Sla>(`${environment.apiUrl}/manageSla/${id}`);
  }

  update(id: number, params: any) {
    return this.http.put(`${environment.apiUrl}/manageSla/${id}`, params)
      .pipe(map(x => {
        if (id == this.slaValue.id) {
          const FAQ = { ...this.slaValue, ...params };
          localStorage.setItem('sla', JSON.stringify(FAQ));
          this.slaSubject.next(FAQ);
        }
        return x;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/manageSla/${id}`)
      .pipe(map(x => x));
  };
}