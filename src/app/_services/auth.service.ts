import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from "@auth0/angular-jwt";

import { catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from "jwt-decode";
import { LocalStorageService } from './localstorage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  helper = new JwtHelperService();
  url = `${environment.apiUrl}/backoffice`;


  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private localstorageService: LocalStorageService
  ) { }
  
  login(credentials: any): Observable<any> {
    return this.http.post<{ token: string; user: any }>(`${this.url}/login`, credentials, {
       observe: 'response',
       });
  }
  isLoggedIn(): boolean {
    const token = this.localstorageService.getAdminToken();
    return token != null && !this.helper.isTokenExpired(token);
  }
  

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
  /** Inscription utilisateur */
  register(formData: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/register`, formData, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

 /** Demande de réinitialisation du mot de passe */
  forgetPassword(formData: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/forgot-password`, formData, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }
 /** Réinitialisation du mot de passe */
 resetPassword(formData: any): Observable<HttpResponse<any>> {
  return this.http.post(`${this.url}/reset-password`, formData, { observe: 'response' }).pipe(
    catchError(this.handleError)
  );
}
 /** Vérifie si l'utilisateur est authentifié */
 getIsAuth(): boolean {
  return this.isAuthenticated;
}

  /** Déconnexion */
  logOut(): void {
    this.localstorageService.clear();
    this.router.navigate(['/admin/login']);
  }
  
  /** Gère les erreurs HTTP */ 
  private handleError(error: any) {
    return throwError(() => error);
  }
    /** Récupère les données d'authentification */
    private getAuthData() {
      const token = this.localstorageService.getAdminToken();
      return token ? jwtDecode(token) : false;
    }

    getProtectedData(): Observable<any> {
      const token = this.localstorageService.getAdminToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      return this.http.get(`${this.url}/protected-endpoint`, { headers });
    }
    
    
    
}


