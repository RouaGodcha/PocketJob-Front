import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getOffres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/offres`);
  }
  
  getOffreById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/offres/${id}`);
  }
  
  postuler(offreId: number, candidatId: number, remuneration: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/postulations`, {
      offre_id: offreId,
      candidat_id: candidatId,
      remuneration_proposee: remuneration
    });
  }
}
