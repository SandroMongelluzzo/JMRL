import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket_Attachment } from 'src/app/model/ticket_attachment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketAttachmentsService {

  private ticketAttachmentSubject: BehaviorSubject<Ticket_Attachment>;
  public ticketAttachmentMain: Observable<Ticket_Attachment>;
  data?: Ticket_Attachment;

  constructor(
    private http: HttpClient,
  ) {
    this.ticketAttachmentSubject = new BehaviorSubject<Ticket_Attachment>(JSON.parse(localStorage.getItem('ticket_Attachment') as string));
    this.ticketAttachmentMain = this.ticketAttachmentSubject.asObservable();
  }

  public get ticketAttachmentValue(): Ticket_Attachment {
    return this.ticketAttachmentSubject.value;
  }

  register(ticketAttachmentSecond: Ticket_Attachment) {
    return this.http.post(`${environment.apiUrl}/ticket_Attachments/register`, ticketAttachmentSecond);
  }

  getAll() {
    return this.http.get<Ticket_Attachment[]>(`${environment.apiUrl}/ticket_Attachments`);
  }

  getById(id: number) {
    return this.http.get<Ticket_Attachment>(`${environment.apiUrl}/ticket_Attachments/${id}`);
  }

  update(id: number, params: any) {
    return this.http.put(`${environment.apiUrl}/ticket_Attachments/${id}`, params)
      .pipe(map(x => {
        if (id == this.ticketAttachmentValue.id) {
          const TICKET_ATTACHMENT = { ...this.ticketAttachmentValue, ...params };
          localStorage.setItem('ticket_Attachment', JSON.stringify(TICKET_ATTACHMENT));
          this.ticketAttachmentSubject.next(TICKET_ATTACHMENT);
        }
        return x;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/ticket_Attachments/${id}`)
      .pipe(map(x => x));
  };
}