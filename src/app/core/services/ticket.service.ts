import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from 'src/app/model/ticket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketSubject: BehaviorSubject<Ticket>;
  public ticketMain: Observable<Ticket>;
  data?: Ticket;

  constructor(
    private http: HttpClient,
  ) {
    this.ticketSubject = new BehaviorSubject<Ticket>(JSON.parse(localStorage.getItem('ticket') as string));
    this.ticketMain = this.ticketSubject.asObservable();
  }

  public get ticketValue(): Ticket {
    return this.ticketSubject.value;
  }

  register(ticketSecond: Ticket) {
    return this.http.post(`${environment.apiUrl}/tickets/register`, ticketSecond);
  }

  getAll() {
    return this.http.get<Ticket[]>(`${environment.apiUrl}/tickets`);
  }

  getById(id: number) {
    return this.http.get<Ticket>(`${environment.apiUrl}/tickets/${id}`);
  }

  update(id: number, params: any) {
    return this.http.put(`${environment.apiUrl}/tickets/${id}`, params)
      .pipe(map(x => {
        if (id == this.ticketValue.id) {
          const ticket = { ...this.ticketValue, ...params };
          localStorage.setItem('ticket', JSON.stringify(ticket));
          this.ticketSubject.next(ticket);
        }
        return x;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/tickets/${id}`)
      .pipe(map(x => x));
  };
}