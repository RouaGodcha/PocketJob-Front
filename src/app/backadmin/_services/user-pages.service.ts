import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPagesService {

  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }
  public getPagesList(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/pages`, payload, { observe: 'response' })
  }
  public getPagesByUserId(id: any, data: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/pages/show/${id}`, { observe: 'response', params: data })
  }
  public storePage(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/pages/save`, payload, { observe: 'response' })
  }
  public updatePage(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/pages/update/${id}`, payload, { observe: 'response' })
  }
  public deletePage(id: any): Observable<HttpResponse<any>> | any {
    return this.http.delete(`${this.apiUrl}/pages/delete/${id}`, { observe: 'response' })
  }
  public getUserPageById(id: any): Observable<HttpResponse<any>> | any {
    return this.http.get(`${this.apiUrl}/pages/show-page/${id}`, { observe: 'response' })
  }
}
