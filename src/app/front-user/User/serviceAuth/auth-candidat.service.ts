import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorageCandidatService } from './local-storage-candidat.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthCandidatService {

  private apiUrl = `${environment.apiUrl}`;
  helper = new JwtHelperService();
  
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageCandidatService,
    private router: Router
  ) {}

  // Méthode de connexion

  loginCandidat(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        const token = res.access_token;
        const role = res.user.roles[0]; // rôle renvoyé par le backend
  
        this.localStorage.setCandidatToken(token);
        this.localStorage.setCandidatRole(role);
        this.localStorage.setCandidatId(res.user.id);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed', error);
        return throwError(() => error);
      })
    );
  }

  isLoggedIn(): boolean {
    const token = this.localStorage.getCandidatToken();
    return token != null && !this.helper.isTokenExpired(token);
  }
  

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
  
  registerCandidat(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap((res: any) => {
        const token = res.access_token;
        const role = res.user.roles[0];
        const userId = res.user.id;
  
        this.localStorage.setCandidatToken(token);
        this.localStorage.setCandidatRole(role);
        this.localStorage.setCandidatId(userId);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
  
  /*  hethi kif todkhol b esm candidat yetsajl f navbar email mte3ou */
  getCandidatProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/candidat`, {
      headers: {
        Authorization: `Bearer ${this.localStorage.getCandidatToken()}`
      }
    });
  }
}
