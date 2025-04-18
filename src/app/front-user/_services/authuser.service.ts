import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  
  private url = `${environment.apiUrl}`;

  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Méthode de connexion

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.url}/loginUser`, credentials).pipe(
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
  

  
}