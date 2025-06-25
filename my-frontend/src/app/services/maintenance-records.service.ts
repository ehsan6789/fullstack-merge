import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaintenanceRecord } from '../models/maintenance-record.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRecordService {
  private apiUrl = 'https://localhost:7059/api/MaintenanceRecords';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MaintenanceRecord[]> {
    return this.http.get<MaintenanceRecord[]>(this.apiUrl);
  }

  getById(id: number): Observable<MaintenanceRecord> {
    return this.http.get<MaintenanceRecord>(`${this.apiUrl}/${id}`);
  }

  create(record: MaintenanceRecord): Observable<any> {
    return this.http.post(this.apiUrl, record);
  }

  update(id: number, record: MaintenanceRecord): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, record);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
