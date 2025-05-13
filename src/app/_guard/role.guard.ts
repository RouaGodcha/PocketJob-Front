import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../_services/localstorage.service';
import { AuthService } from '../_services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    public router: Router,
    private authService: AuthService,
    private localstorageService: LocalStorageService
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const role = this.localstorageService.getAdminRole();

    if (role === expectedRole) {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
  }

  
}
