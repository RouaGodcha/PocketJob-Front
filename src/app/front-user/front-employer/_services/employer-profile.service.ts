import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerProfileService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
   // 🎯 FAKE DATA
   return of({
    companyName: 'PocketJob Tunisia',
    logoUrl: 'assets/images/logo-employeur.png',
    address: 'Les Berges du Lac, Tunis',
    city: 'Tunis',
    state: 'Tunis',
    zipCode: '1053',
    country: 'Tunisie',
    email: 'contact@pocketjob.tn',
    phone: '+216 71 123 456',
    recruiter: {
      fullName: 'Ahmed Recruteur',
      email: 'ahmed.recruteur@pocketjob.tn',
      phone: '+216 22 456 789',
      position: 'Responsable RH',
    }
  });


     // ✅ API réelle Laravel
    // return this.http.get(`${this.apiUrl}/employer/profile`);
  }

  updateProfile(data: any): Observable<any> {
    // 🎯 Simule une réponse
    return of({ message: 'Profil mis à jour avec succès.' });

    // ✅ API réelle Laravel
    // return this.http.put(`${this.apiUrl}/employer/profile`, data);
  }
}
