import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatsEmployerService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

 /**
   * 🔄 Récupère la liste des candidats pour les offres de l'employeur
   * avec pagination et filtre
   */
 public getCandidatsList(page: number, perPage: number, filter: string, employeurId: number): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/employeur/mes-candidats?page=${page}&per_page=${perPage}&filter=${filter}&employeur_id=${employeurId}`
  );
}

}
