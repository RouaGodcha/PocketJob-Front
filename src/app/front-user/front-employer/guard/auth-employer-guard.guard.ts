import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthEmployerService } from '../service/auth-employer.service';
import { LocalStorageEmployerService } from '../service/local-storage-employer.service';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root' // ✅ OBLIGATOIRE POUR UN GUARD
})
export class authEmployerGuardGuard  implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthEmployerService,
    private localstorageService: LocalStorageEmployerService
  ) { }
   canActivate(): boolean {
    const token = this.localstorageService.getEmployerToken();
    if (!token || helper.isTokenExpired(token)) {
      this.localstorageService.clear();
      this.router.navigate(['/home/loginUser']);
      return false;
    }
    return true;
  }
  
  }