import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalStorageEmployerService } from '../service/local-storage-employer.service';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private router: Router,
    private localstorageService: LocalStorageEmployerService
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.localstorageService.getEmployerToken();
    try {
      if (token === null || token === undefined || helper.isTokenExpired(token)) {
        return true
      } else {
        this.router.navigate(['/home/loginUser']);
        return false
      }
    } catch (err) {
      return false
    }
  }
}
