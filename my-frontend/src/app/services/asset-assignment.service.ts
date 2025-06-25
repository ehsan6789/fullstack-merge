import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetAssignment } from '../models/asset-assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssetAssignmentService {
private apiUrl = 'https://localhost:7059/api/AssetAssignments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AssetAssignment[]> {
    return this.http.get<AssetAssignment[]>(this.apiUrl);
  }

  getById(id: number): Observable<AssetAssignment> {
    return this.http.get<AssetAssignment>(`${this.apiUrl}/${id}`);
  }

  create(assignment: AssetAssignment): Observable<any> {
    return this.http.post(this.apiUrl, assignment);
  }

  update(id: number, assignment: AssetAssignment): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, assignment);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

