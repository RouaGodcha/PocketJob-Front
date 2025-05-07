import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../_services/localstorage.service';
import { AuthService } from '../_services/auth.service';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private localstorageService: LocalStorageService
  ) { }
  canActivate(): boolean {
    const token = this.localstorageService.getAdminToken();
    if (!token || helper.isTokenExpired(token)) {
      this.localstorageService.clear();
      this.router.navigate(['/admin/login']);
      return false;
    }
    return true;
  }
  
  }

