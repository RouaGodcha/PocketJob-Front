import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // API réelle
  getProfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profil`);
  }

  updateProfil(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profil`, data);
  }

  updateCv(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/profil/cv`, data);
  }

  // FAKE DATA pour tests
  getFakeProfil(): Observable<any> {
    const fakeProfil = {
      prenom: 'Siwar',
      nom: 'Naouar',
      dateNaissance: '10.05.1999',
      nationalite: 'tunisien',
      rue: 'Potsdamer Straße 63',
      adresseComplementaire: '',
      codePostal: '10785',
      ville: 'Berlin',
      residence: 'En Allemagne',
      cvUrl: 'https://example.com/cv.pdf',
      qualifications: 'Angular, Laravel, MySQL, Java'
    };
    return of(fakeProfil);
  }
}
