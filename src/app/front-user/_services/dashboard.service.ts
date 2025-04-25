import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  // ⚡ Pour appel réel backend
  getRecentOffers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🌟 Pour test local
  getFakeOffers(): Observable<any[]> {
    return of([
      {
        id: 1,
        title: 'Serveur/Serveuse événementiel',
        event: '@ Foire Artisanale',
        location: 'Tunis',
        start: 'vendredi 3 mai',
        end: 'dimanche 5 mai',
        amount: 350
      },
      {
        id: 2,
        title: 'Agent d’accueil',
        event: '@ Conférence tech 2025',
        location: 'Tunis',
        start: 'lundi 6 mai',
        end: 'mercredi 8 mai',
        amount: 400
      },
      {
        id: 3,
        title: 'Hôte de stand',
        event: '@ Salon du Recrutement',
        location: 'Tunis',
        start: 'jeudi 9 mai',
        end: 'samedi 11 mai',
        amount: 370
      }
    ]);
  }

}
