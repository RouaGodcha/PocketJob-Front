import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffresDetailsService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getOffres(): Observable<any[]> {
    // Version réelle
    return this.http.get<any[]>(this.apiUrl);
  }

  
  deleteOffre(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/offres/${id}`);
  }

  // Vos Emploi 
  getEmploisAcceptes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/offres/acceptes`);
  }
  
  
  getFakeOffres(): Observable<any[]> {
    return of([
      {
        id: 1,
        titre: "Vendeur en boutique",
        entreprise: "Zitouna Market",
        date: "2025-04-27",
        lieu: "Tunis",
        nbCandidats: "6",
        poste: 2,
        salaire: 450,
        tauxHoraire: "7 DT/h",
        duree: 2,
        grandeChance: true,
        weekend: false
      },
      {
        id: 2,
        titre: "Serveur événementiel",
        entreprise: "Events Tunisia",
        date: "2025-05-01",
        lieu: "Lac 2",
        nbCandidats: "10+",
        poste: 3,
        salaire: 600,
        tauxHoraire: "8 DT/h",
        duree: 3,
        grandeChance: false,
        weekend: true
      },
      {
        id: 3,
        titre: "Assistant logistique",
        entreprise: "Logispeed",
        date: "2025-05-02",
        lieu: "Ariana",
        nbCandidats: "4",
        poste: 1,
        salaire: 380,
        tauxHoraire: "6,5 DT/h",
        duree: 1,
        grandeChance: true,
        weekend: true
      }
    ]);
  }
}
