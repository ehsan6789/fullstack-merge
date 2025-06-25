import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateUserDto, UpdateUserDto, UserDto } from '../models/user.model';

export interface UsersApiResponse {
  totalUsers: number;
  users: UserDto[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7059/api/Users';

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$.asObservable();
  }

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UsersApiResponse> {
  return this.http.get<UsersApiResponse>(this.apiUrl);
}

  getUserById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/${id}`);
  }

  createUser(user: CreateUserDto): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      tap(() => this._refreshNeeded$.next())
    );
  }

  updateUser(id: string, user: UpdateUserDto): Observable<any> {
    return this.http.put(this.apiUrl, user).pipe(
      tap(() => this._refreshNeeded$.next())
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this._refreshNeeded$.next())
    );
  }
}
