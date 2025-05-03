import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousEmployerService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  /**
   * 🔁 API réelle (commentée pour test avec FAKE data)
   */
  public getEntretiensList(employeurId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employeur/entretiens?employeur_id=${employeurId}`);
  }
}
