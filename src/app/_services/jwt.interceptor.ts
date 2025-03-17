import { Injectable } from '@angular/core';
import { AuthService } from "../_services/auth.service";
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './localstorage.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private localstorageService: LocalStorageService
  ) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Ajout du token JWT à chaque requête
    const currentUser = this.localstorageService.getAdminToken();
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`
        }
      });
    }

    //Gestion des erreurs d'authentification
    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
           // Si le statut de l'erreur n'est pas 401 (non autorisé) ou 403 (accès interdit), on ne fait rien
         
          if (err.status !== 401 && err.status !== 403) {
            return;
          }
           // Si l'erreur est 401 ou 403, déconnexion de l'utilisateur et redirection vers la page de connexion
        
          this.authService.logOut();
          this.router.navigate(['admin/login']);
        }
      }));
  }
}
