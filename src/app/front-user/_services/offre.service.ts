import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../_services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiUrl = `${environment.apiUrl}/backoffice`;

  constructor(private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getOffres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/offers`);
  }
  getOffreById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/offers/${id}`);
  }
  /*postuler(offreId: number, candidatId: number, remuneration: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/postulations`, {
      offre_id: offreId,
      candidat_id: candidatId,
      remuneration_proposee: remuneration
    });
  }*/
    postuler(offreId: number, candidatId: number, remuneration: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/postuler`, {
        offre_id: offreId,
        candidat_id: candidatId,
        remuneration_proposee: remuneration
      });
    }
    getAllOffres(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/offers`);
    }
    
    getOffresBackAdmin(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/offers`, {
        headers: {
          Authorization: `Bearer ${this.localStorage.getAdminToken()}`
        }
      });
    }   

    deleteOffre(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/offers/${id}`, {
        headers: {
          Authorization: `Bearer ${this.localStorage.getAdminToken()}`
        }
      });
    }
    
}