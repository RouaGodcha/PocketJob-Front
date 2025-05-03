import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageEmployerService } from '../_services/local-storage-employer.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class GuestEmployerGuard implements CanActivate {
  constructor(
    private router: Router,
    private localstorageEmployerService: LocalStorageEmployerService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = this.localstorageEmployerService.getEmployerToken();
    if (!token || helper.isTokenExpired(token)) {
      return true;
    } else {
      this.router.navigate(['employer/dashboard']);
      return false;
    }
  }
}
