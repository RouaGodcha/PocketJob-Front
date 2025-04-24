import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ReservationMission } from '../auth/register/home-register/reservation/reservation.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  enregistrerMission(mission: ReservationMission): Observable<any> {
    return this.http.post(`${this.apiUrl}/mission`, mission);
  }
}
