import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Categorie {
  name:string ;
  description : string;
  image : File;
  status?: 'ACTIVATED' | 'DISABLED' ;
  position?:number| null ;

}
@Injectable({
  providedIn: 'root'
})
export class PostesService {
  private apiUrl = `${environment.apiUrl}`;
  

  constructor(
    private http: HttpClient
  ) { }


  addPost(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/posts/save`, payload, {
      observe: 'response',
    });
  }

  public updatePost(
    payload: any,
    id: number
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      `${this.apiUrl}/posts/${id}/update`,
      payload,
      {
        observe: 'response',
      }
    );
  }
  public getPost(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/posts/${id}`, {
      observe: 'response',
    });
  }

  public updatePostLikes(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/posts/like-multiple-posts`, data, { observe: 'response' });
  }
  public updatePostFavorites(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/posts/favories-multiple-posts`, data, { observe: 'response' });
  }


  indexPosts(data: {
    paginate : number; // 0,1
    per_page: number; // le nombre de postes à afficher par page.
  }) : Observable<HttpResponse<any>>{
    return this.http.post(`${this.apiUrl}/posts`, data , { observe : 'response',});
  }
  

  dropPost(id: number):  Observable<HttpResponse<any>>{
    return this.http.delete(`${this.apiUrl}/posts/${id}`, { observe : 'response',});
  }
  
}
