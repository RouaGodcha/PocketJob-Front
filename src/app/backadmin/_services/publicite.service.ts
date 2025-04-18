import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PubliciteService {

  private apiUrl = `${environment.apiUrl}`;
  

  constructor( private http : HttpClient) { }

  getPublicites(params: any) {
    return this.http.get(`${this.apiUrl}/publicites`, { params });
  }

  getAllPublicites(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/publicites`, { params });
   }

  getPublicitesById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updatePublicites(publicites: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${publicites.id}`, publicites);
  }

  changeStatus(id: number, payload: any) {
  return this.http.put(`${this.apiUrl}/publicites/${id}/status`, payload);
}

deletePublicite(id: number): Observable<any> {
  return this.http.delete<any>(`api/publicites/${id}`);
}


restorePublicite(id: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/publicites/${id}/restore`, {});
}
  
}
