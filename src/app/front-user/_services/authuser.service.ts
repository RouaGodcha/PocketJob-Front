import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  
  private apiUrl = `${environment.apiUrl}`;

  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Méthode de connexion

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/loginUser`, credentials).pipe(
      tap((res: any) => {
        // Stocker le token dans localStorage ou un autre service
        localStorage.setItem('token', res.token); // ou res.data.token selon ta réponse Laravel
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed', error);
        return throwError(() => error);
      })
    );
  }
  
  registerCandidat(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  /*  hethi kif todkhol b esm candidat yetsajl f navbar email mte3ou */
  getCandidatProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/candidat`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  
  
}