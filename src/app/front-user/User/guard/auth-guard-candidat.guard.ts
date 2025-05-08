import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LocalStorageCandidatService } from '../serviceAuth/local-storage-candidat.service';
import { AuthCandidatService } from '../serviceAuth/auth-candidat.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root' // ✅ OBLIGATOIRE POUR UN GUARD
})
export class authGuardCandidatGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthCandidatService,
    private localstorageService: LocalStorageCandidatService
  ) { }
   canActivate(): boolean {
    const token = this.localstorageService.getCandidatToken();
    if (!token || helper.isTokenExpired(token)) {
      this.localstorageService.clear();
      this.router.navigate(['/home/loginUser']);
      return false;
    }
    return true;
  }
  
  }