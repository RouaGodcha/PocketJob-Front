import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerNotificationService {
  private apiUrl = `${environment.apiUrl}`;
  


  constructor(private http: HttpClient) {}



  getNotifications(): Observable<any[]> {
    // 🎯 FAKE DATA pour développement
    return of([
      { id: 1, message: 'Un candidat a postulé à l\'offre Développeur Web.', is_read: false },
      { id: 2, message: 'Un rendez-vous a été fixé avec le candidat Sami.', is_read: false },
      { id: 3, message: 'Le candidat Mohamed a annulé sa postulation.', is_read: true },
    ]);

    // ✅ API réelle Laravel (activer quand prête)
    // return this.http.get<any[]>('http://127.0.0.1:8000/api/employer/notifications');
  }


  markAsRead(id: number): Observable<any> {
    // 🎯 FAKE UPDATE
    return of({ message: 'Notification marquée comme lue.' });

    // ✅ API réelle Laravel
    // return this.http.patch(`http://127.0.0.1:8000/api/employer/notifications/${id}/read`, {});
  }
}
