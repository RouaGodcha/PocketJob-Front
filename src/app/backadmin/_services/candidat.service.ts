import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Candidat } from '../candidat/candidat.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }
  
  public getCandidatsList(){
    return this.http.get(`${this.apiUrl}/candidats`);
  }
  getCandidateById(id: number): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.apiUrl}/${id}`);
  }
  /* pour ajouter Candidat */
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

  public updateCandidat(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/users/update/${id}`, payload, { observe: 'response' })
  }
  public deletCandidat(id: any): Observable<HttpResponse<any>> | any {
    return this.http.delete(`${this.apiUrl}/users/delete/${id}`, { observe: 'response' })
  }
  
  public changeStatus(id: number, payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/candidats/change_status/${id}`, payload, { observe: 'response' })
  }
  public getDiplomasList(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/diplomas`, payload, { observe: 'response' })
  }

}
