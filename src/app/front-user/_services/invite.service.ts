import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  // L'URL de base de ton API, définie dans environment.ts
  private apiUrl = `${environment.apiUrl}`;

  // Lien d'invitation FAKE pour tester sans API
  private invitationLink = 'https://example.com/invite/Roua-123456';

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Obtenir les infos d'invitation FAKE (mock, sans serveur)
   */
  getInvitationInfoFake() {
    return of({
      link: this.invitationLink,
      rewards: [
        'Badge spécial Inviteur',
        'Accès prioritaire à certaines missions',
        'Accès à des offres privées'
      ]
    });
  }

  /**
   * 🔹 Envoyer une invitation FAKE (mock, sans serveur)
   */
  sendInvitationByEmailFake(email: string, friendName: string) {
    return of({ success: true, message: `Invitation envoyée à ${friendName} !` });
  }

  /**
   * 🔸 Obtenir les infos d'invitation RÉELLES (depuis ton backend API)
   */
  getInvitationInfo(): Observable<{ link: string, rewards: string[] }> {
    return this.http.get<{ link: string, rewards: string[] }>(`${this.apiUrl}/invite/info`);
  }

  /**
   * 🔸 Envoyer une invitation RÉELLE via le backend API
   */
  sendInvitationByEmail(email: string, friendName: string): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(`${this.apiUrl}/invite/send`, {
      email,
      friendName
    });
  }
}
