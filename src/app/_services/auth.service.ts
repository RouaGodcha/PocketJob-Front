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
  
  url = `${environment.apiUrl}/auth`;

  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private localstorageService: LocalStorageService
  ) { }
  login(formData: any) {
    return this.http.post(`${this.url}/admin/login`, formData, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }
  forgetPassword(formData: any) {
    return this.http.post(`${this.url}/forget`, formData, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }
  resetPassword(formData: any) {
    return this.http.post(`${this.url}/reset`, formData, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  logOut() {
    this.localstorageService.clear();
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['admin/login']);
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
  private getAuthData() {
    const token = this.localstorageService.getAdminToken();
    if (token) {
      return jwtDecode(token);
    } else {
      return false;
    }
  }
}
