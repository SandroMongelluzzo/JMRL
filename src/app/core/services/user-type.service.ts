import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User_Type } from 'src/app/model/user_type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  private user_TypeSubject: BehaviorSubject<User_Type>;
  public user_TypeMain: Observable<User_Type>;
  data?: User_Type;

  constructor(
    private http: HttpClient,
  ) {
    this.user_TypeSubject = new BehaviorSubject<User_Type>(JSON.parse(localStorage.getItem('userType') as string));
    this.user_TypeMain = this.user_TypeSubject.asObservable();
  }

  public get user_TypeValue(): User_Type {
    return this.user_TypeSubject.value;
  }

  register(user_TypeSecond: User_Type) {
    return this.http.post(`${environment.apiUrl}/manageUserTypes/register`, user_TypeSecond);
  }

  getAll() {
    return this.http.get<User_Type[]>(`${environment.apiUrl}/manageUserTypes`);
  }

  getById(id: number) {
    return this.http.get<User_Type>(`${environment.apiUrl}/manageUserTypes/${id}`);
  }

  update(id: number, params: any) {
    return this.http.put(`${environment.apiUrl}/manageUserTypes/${id}`, params)
      .pipe(map(x => {
        if (id == this.user_TypeValue.id) {
          const USER_TYPE = { ...this.user_TypeValue, ...params };
          localStorage.setItem('userType', JSON.stringify(USER_TYPE));
          this.user_TypeSubject.next(USER_TYPE);
        }
        return x;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/manageUserTypes/${id}`)
      .pipe(map(x => x));
  };
}