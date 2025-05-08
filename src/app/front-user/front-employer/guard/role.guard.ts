import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthEmployerService } from '../service/auth-employer.service';
import { LocalStorageEmployerService } from '../service/local-storage-employer.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    public router: Router,
    private authService: AuthEmployerService,
    private localstorageService: LocalStorageEmployerService
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authService.getUserRole();

    if (userRole === expectedRole) {
      return true;
    }
    this.router.navigate(['/home/loginUser']);
    return false;
  }

  
}
