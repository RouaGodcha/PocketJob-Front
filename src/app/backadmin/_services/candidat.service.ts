import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Candidat } from '../candidat/candidat.model';

@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Get the list of candidates
  public getCandidatsList(page: number, perPage: number, filter: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/candidats?page=${page}&per_page=${perPage}&filter=${filter}`);
  }

  // Get candidate details by ID
  getCandidateById(id: number): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.apiUrl}/candidats/${id}`);
  }

  // Add a new candidate
  public addCandidat(candidat: any, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('firstname', candidat.firstname);
    formData.append('lastname', candidat.lastname);
    formData.append('email', candidat.email);
    formData.append('phone', candidat.phone);
    if (file) {
      formData.append('diplome', file, file.name);
    }
    return this.http.post(`${this.apiUrl}/candidats`, formData);
  }

  // Update candidate data
  public updateCandidat(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/candidats/update/${id}`, payload, { observe: 'response' });
  }

  // Delete a candidate
  public deletCandidat(id: any): Observable<HttpResponse<any>> | any {
    return this.http.delete(`${this.apiUrl}/candidats/delete/${id}`, { observe: 'response' });
  }

  // Change candidate status
  public changeStatus(id: number, payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/candidats/change_status/${id}`, payload, { observe: 'response' });
  }

  // Get the list of diplomas
  public getDiplomasList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/diplomas`);
  }
}
