import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  /* 
  _ observable pour récupérer les résultats quand ils arrivent
  _ Récupère une liste de médias avec des filtres
  . */
  public getMediaList(payload: any) : Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/medias`, payload, { observe: 'response' });
  }

  /* Supprime un média par son ID */
  public deleteMedia(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/medias/${id}`, { observe: 'response' });
  }
}
