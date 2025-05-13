import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageEmployerService } from '../service/local-storage-employer.service';

@Injectable({
  providedIn: 'root'
})
export class AjoutOffreService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient,
    private localstorageService:LocalStorageEmployerService
  ) {}
  ajouterOffre(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/offres`, data, {
      headers: {
        Authorization: `Bearer ${this.localstorageService.getEmployerToken()}`
      }
    });
  }
  
  
}
