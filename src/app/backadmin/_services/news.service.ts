import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) { }


  // Mocked news data
  private mockNewsData = [
    {
      id: 1,
      title: 'Nouvelle annonce 1',
      description: 'Description de l\'annonce 1',
      format: 'Image',
      status: 'Actif',
      created_at: new Date(),
    },
    {
      id: 2,
      title: 'Nouvelle annonce 2',
      description: 'Description de l\'annonce 2',
      format: 'Video',
      status: 'Non Actif',
      created_at: new Date(),
    },
    {
      id: 3,
      title: 'Nouvelle annonce 3',
      description: 'Description de l\'annonce 3',
      format: 'PDF',
      status: 'Actif',
      created_at: new Date(),
    },
  ];

  // Simulate an API call to fetch news list
  getNewsListFake(payload: any): Observable<any> {
    // Here we return the mocked data wrapped in an Observable
    return of({
      status: 200,
      body: {
        result: 'success',
        data: this.mockNewsData, // Use mock data
        paginator: {
          total: this.mockNewsData.length,
          last_page: 1,
        },
      },
    });
  }

  getNewsList(params: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list`, { params });
  }

  deleteNews(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }  public getNewsById(id: any): Observable<HttpResponse<any>> {
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

}
