import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageEmployerService } from '../_services/local-storage-employer.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeurGuard implements CanActivate {

  // ✅ Création d'une instance de JwtHelperService
  private jwtHelper = new JwtHelperService();
  constructor(
    private router: Router,
    private localstorageEmployerService: LocalStorageEmployerService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = this.localstorageEmployerService.getEmployerToken();

    // ✅ Utilisation de this.jwtHelper
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.localstorageEmployerService.clearEmployer();
      this.router.navigate(['/register-employer']);
      return false;
    }

    return true;
  }
}
