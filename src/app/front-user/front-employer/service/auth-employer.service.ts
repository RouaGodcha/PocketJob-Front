import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LocalStorageEmployerService } from './local-storage-employer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployerService {
  private apiUrl = `${environment.apiUrl}`;
  private helper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageEmployerService
  ) {}

  loginEmployer(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        const token = res.access_token;
        const user = res.user;
        const role = user.roles[0];

        this.localStorage.setEmployerToken(token);
        this.localStorage.setEmployerRole(role);
        this.localStorage.setEmployerId(user.id);
      }),
      error => throwError(() => error)
    );
  }

  registerEmployer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap((res: any) => {
        const token = res.access_token;
        const role = res.user.roles[0];
        const userId = res.user.id;
  
        this.localStorage.setEmployerToken(token);
        this.localStorage.setEmployerRole(role);
        this.localStorage.setEmployerId(userId);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
  
  

  isLoggedIn(): boolean {
    const token = this.localStorage.getEmployerToken();
    return token != null && !this.helper.isTokenExpired(token);
  }

  getUserRole(): string | null {
    return this.localStorage.getEmployerRole();
  }
}
