import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Faq } from 'src/app/model/faq';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private faqSubject: BehaviorSubject<Faq>;
  public faqMain: Observable<Faq>;
  data?: Faq;

  constructor(
    private http: HttpClient,
  ) {
    this.faqSubject = new BehaviorSubject<Faq>(JSON.parse(localStorage.getItem('faq') as string));
    this.faqMain = this.faqSubject.asObservable();
  }

  public get faqValue(): Faq {
    return this.faqSubject.value;
  }

  register(faqSecond: Faq) {
    return this.http.post(`${environment.apiUrl}/manageFaq/register`, faqSecond);
  }

  getAll() {
    return this.http.get<Faq[]>(`${environment.apiUrl}/manageFaq`);
  }

  getById(id: number) {
    return this.http.get<Faq>(`${environment.apiUrl}/manageFaq/${id}`);
  }

  update(id: number, params: any) {
    return this.http.put(`${environment.apiUrl}/manageFaq/${id}`, params)
      .pipe(map(x => {
        if (id == this.faqValue.id) {
          const FAQ = { ...this.faqValue, ...params };
          localStorage.setItem('faq', JSON.stringify(FAQ));
          this.faqSubject.next(FAQ);
        }
        return x;
      }));
  }

  delete(id: number) { 
    return this.http.delete(`${environment.apiUrl}/manageFaq/${id}`)
      .pipe(map(x => x));
  };
}