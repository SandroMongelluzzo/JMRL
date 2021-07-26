import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/model/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamSubject: BehaviorSubject<Team>;
  public teamMain: Observable<Team>;
  data?: Team;

  constructor(
    private http: HttpClient,
  ) {
    this.teamSubject = new BehaviorSubject<Team>(JSON.parse(localStorage.getItem('team') as string));
    this.teamMain = this.teamSubject.asObservable();
  }

  public get teamValue(): Team {
    return this.teamSubject.value;
  }

  register(teamSecond: Team) {
    return this.http.post(`${environment.apiUrl}/teams/register`, teamSecond);
  }

  getAll() {
    return this.http.get<Team[]>(`${environment.apiUrl}/teams`);
  }

  getById(id: number) {
    return this.http.get<Team>(`${environment.apiUrl}/teams/${id}`);
  }

  update(id: number, params: any) {
    return this.http.put(`${environment.apiUrl}/teams/${id}`, params)
      .pipe(map(x => {
        if (id == this.teamValue.id) {
          const TEAM = { ...this.teamValue, ...params };
          localStorage.setItem('team', JSON.stringify(TEAM));
          this.teamSubject.next(TEAM);
        }
        return x;
      }));
  }

  delete(id: number) { 
    return this.http.delete(`${environment.apiUrl}/teams/${id}`)
      .pipe(map(x => x));
  };
}