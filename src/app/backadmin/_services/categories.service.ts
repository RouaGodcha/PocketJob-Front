import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = `${environment.apiUrl}`;
   constructor(
    private http: HttpClient
   ) { }


   /* Fake Data  */
   indexCategoriesFakeData(data: any): Observable<any> {
    const fakeData = {
      body: {
        data: [
          { id: 1, name: 'Category 1', description: 'Description for Category 1', image: 'image1.jpg', created_at: '2025-01-01' },
          { id: 2, name: 'Category 2', description: 'Description for Category 2', image: 'image2.jpg', created_at: '2025-02-01' },
          { id: 3, name: 'Category 3', description: 'Description for Category 3', image: '', created_at: '2025-03-01' },
          { id: 4, name: 'Category 4', description: 'Description for Category 4', image: 'image4.jpg', created_at: '2025-04-01' },
        ],
        paginator: {
          total: 4,
          last_page: 1
        }
      }
    };

    return of(fakeData);  // Return fake data as an observable
  }

  dropCategorieFakeData(id: number): Observable<any> {
    return of({ success: true });  // Mock deletion response
  }
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
