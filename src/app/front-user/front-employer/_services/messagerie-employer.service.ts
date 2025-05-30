import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagerieEmployerService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // 🔁 API réelle (commentée pour test avec FAKE)
  public getMessages(employeurId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employeur/messages?employeur_id=${employeurId}`);
  }
}
