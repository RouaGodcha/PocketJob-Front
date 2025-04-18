import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidature } from '../candidature/candidature.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }
  
  getCandidatures(filters?: any): Observable<any> {
    return this.http.get<any>(this.apiUrl, { params: filters });
  }
  
  getCandidatureById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateCandidature(candidature: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${candidature.id}`, candidature);
  }

  deleteCandidature(id: number): Observable<any> {
    return this.http.delete<any>(`api/candidatures/${id}`);
  }
}
