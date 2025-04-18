import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LocalStorageService } from './localstorage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private localstorageService: LocalStorageService
  ) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Récupérer le token CSRF depuis le cookie XSRF-TOKEN
    const csrfToken = this.getCookie('XSRF-TOKEN');

    if (csrfToken) {
      request = request.clone({
        setHeaders: {
          'X-XSRF-TOKEN': csrfToken,  // Ajouter le token CSRF dans les en-têtes
        }
      });
    }

    return next.handle(request);
  }

  // Fonction pour récupérer les cookies
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
}
