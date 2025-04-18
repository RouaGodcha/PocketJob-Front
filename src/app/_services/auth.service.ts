import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from "@auth0/angular-jwt";

import { catchError } from 'rxjs/operators';
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
  url = `${environment.apiUrl}`;


  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private localstorageService: LocalStorageService
  ) { }
  login(formData: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/login`, formData, {
      observe: 'response',
      withCredentials: true // S'assurer que les cookies sont envoyés
    }).pipe(
      catchError(this.handleError)
    );
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
    this.http.post(`${this.url}/logout`, {}, { observe: 'response' }).subscribe(() => {
      this.localstorageService.clear();
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.router.navigate(['/login']);
    });
  }
  /** Gère les erreurs HTTP */
  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
    /** Récupère les données d'authentification */
    private getAuthData() {
      const token = this.localstorageService.getAdminToken();
      return token ? jwtDecode(token) : false;
    }
}


