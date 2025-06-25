import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from '../models/status.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private apiUrl = 'https://localhost:7083/api/Lookups/employee-statuses';

  constructor(private http: HttpClient) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl);
  }
}
