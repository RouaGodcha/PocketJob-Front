import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }

  public getNewsList(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/news`, payload, { observe: 'response' })
  }
  public getNewsById(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/news/show/${id}`, { observe: 'response' })
  }
  
  public storeNews(payload: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/news/save`, payload, { observe: 'response' })
  }
  public addNews(id: any): Observable<HttpResponse<any>> | any {
    return this.http.delete(`${this.apiUrl}/news/add/`, { observe: 'response' })
  }
  public updateNews(payload: any, id: any): Observable<HttpResponse<any>> | any {
    return this.http.post(`${this.apiUrl}/news/update/${id}`, payload, { observe: 'response' })
  }

  public deleteNews(id: any): Observable<HttpResponse<any>> | any {
    return this.http.delete(`${this.apiUrl}/news/delete/${id}`, { observe: 'response' })
  }
}
