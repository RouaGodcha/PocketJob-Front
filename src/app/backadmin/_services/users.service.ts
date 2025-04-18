import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}`;
 

  constructor(
    private http: HttpClient
  ) { }
  


  public getUsersList(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/clients`, payload, { observe: 'response' })
  }


  public getUserById(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/users/show/${id}`, { observe: 'response' })
  }
  public storeUser(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/users/save`, payload, { observe: 'response' })
  }
  public updateUser(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/users/update/${id}`, payload, { observe: 'response' })
  }
  public deleteUser(id: any): Observable<HttpResponse<any>> | any {
    return this.http.delete(`${this.apiUrl}/users/delete/${id}`, { observe: 'response' })
  }
  public changeStatus(id: number, payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/users/change_status/${id}`, payload, { observe: 'response' })
  }
  public changePassword(id: number, payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/users/change_password/${id}`, payload, { observe: 'response' })
  }

  uploadDiplome(userId: number, formData: FormData) {
    return this.http.post(`/api/users/${userId}/upload-diplome`, formData);
  }
  
  public getDiplomasList(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/diplomas`, payload, { observe: 'response' })
  }



}
