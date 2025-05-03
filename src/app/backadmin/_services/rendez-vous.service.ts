import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RendezVous } from '../rendez-vous/rendez-vous.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private readonly apiUrl = `${environment.apiUrl}/rendez-vous`;

  constructor(private http: HttpClient) {}

  /**
   * Appel API : Récupérer tous les rendez-vous
   */
  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}`);
  }

  /**
   * Fake data pour tester sans API
   */
  getAllRendezVousFake(): Observable<RendezVous[]> {
    const fakeData: RendezVous[] = [
      {
        id: 1,
        entreprise: 'TechCorp',
        responsable: 'Jean Dupont',
        referenceOffre: 'REF123',
        candidat: 'Alice Martin',
        date: '2025-05-05',
        heure: '10:00',
        statut: 'en attente',
        partieEffectuante: 'employeur'
      },
      {
        id: 2,
        entreprise: 'SoftSolutions',
        responsable: 'Marie Curie',
        referenceOffre: 'REF456',
        candidat: 'Bob Smith',
        date: '2025-05-07',
        heure: '14:30',
        statut: 'validé',
        partieEffectuante: 'candidat'
      },
      {
        id: 3,
        entreprise: 'WebWorks',
        responsable: 'Albert Einstein',
        referenceOffre: 'REF789',
        candidat: 'Claire Fontaine',
        date: '2025-05-10',
        heure: '09:00',
        statut: 'expiré',
        partieEffectuante: 'employeur'
      }
    ];
    return of(fakeData);
  }

  /**
   * Appel API : Annuler un rendez-vous
   */
  cancelRendezVous(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/cancel`, {});
  }

  /**
   * Appel API : Modifier un rendez-vous
   */
  updateRendezVous(rendezVous: RendezVous): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.apiUrl}/${rendezVous.id}`, rendezVous);
  }
}
