import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = `${environment.apiUrl}`;
   constructor(
    private http: HttpClient
   ) { }

   public addCategorie(payload: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/categorie/save`, payload, {
      observe: 'response',
    });
  }


  public updateCategorie(
    payload: any,
    id: number
  ): Observable<HttpResponse<any>> {
    return this.http.post(
      `${this.apiUrl}/categorie/${id}/update`,
      payload,
      {
        observe: 'response',
      }
    );
  }

  public getCategorie(id: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/categories/${id}`, {
      observe: 'response',
    });
  }



   public indexCategories( data : {
    paginate : number ; // 0,1
    per_page : number ; // le nombre de catégories à afficher par page.

   }): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/categorie`, data, {
      observe: 'response',
    });
   }
  
   // supprimer le categories
   public dropCategorie(id: any): Observable<HttpResponse<any>> {
    return this.http.delete ( `${this.apiUrl}/categorie/${id}`, {
      observe: 'response'
    });
  }
}
