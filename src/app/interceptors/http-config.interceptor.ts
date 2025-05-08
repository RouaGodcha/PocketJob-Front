import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../_services/auth.service";
@Injectable()

// Surveille et modifie les requêtes/réponses HTTP
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  // intercept() méthode obligatoire
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler

  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // Capture toutes les erreurs HTTP
      catchError((requestError) => {   
        if (requestError.status.toString() === '0') {
          alert('verifier votre internet')
        }
        // status: 401 ==> Déconnecte l'utilisateur automatiquement
        if (requestError.status !== 401) {
          const { error } = requestError;
          console.error({
            severity: 'error',
            summary: `HTTP Error - ${requestError.status}`,
            detail: error && error.message,
          });
        } else {
          if (requestError.status === 401) {
            this.authService.logOut();
            this.router.navigate(['/loginUserr']);  
          }
        }
        return throwError(() => {
          new Error(requestError);
        });
      })
    );
  }
}
