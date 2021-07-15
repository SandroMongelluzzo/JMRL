import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailFromContact } from 'src/app/model/emailFromContact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailFromContactService {
  //emailFC -> email From Contact

  private emailFCSubject: BehaviorSubject<EmailFromContact>;
  public emailFCeMain: Observable<EmailFromContact>;
  data?: EmailFromContact;

  constructor(
    private http: HttpClient,
  ) {
    this.emailFCSubject = new BehaviorSubject<EmailFromContact>(JSON.parse(localStorage.getItem('email') as string));
    this.emailFCeMain = this.emailFCSubject.asObservable();
  }

  public get emailValue(): EmailFromContact {
    return this.emailFCSubject.value;
  }

  register(emailSecond: EmailFromContact) {
    return this.http.post(`${environment.apiUrl}/emailsFC/register`, emailSecond);
  }

  getAll() {
    return this.http.get<EmailFromContact[]>(`${environment.apiUrl}/emailsFC`);
  }

  getById(id: string) {
    return this.http.get<EmailFromContact>(`${environment.apiUrl}/emailsFC/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/emailsFC/${id}`, params)
      .pipe(map(x => {
        if (id == this.emailValue.id) {
          const email = { ...this.emailValue, ...params };
          localStorage.setItem('email', JSON.stringify(email));
          this.emailFCSubject.next(email);
        }
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/emailsFC/${id}`)
      .pipe(map(x => x));
  };
}
