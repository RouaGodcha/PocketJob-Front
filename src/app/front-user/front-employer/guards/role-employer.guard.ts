import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageEmployerService } from '../_services/local-storage-employer.service';

@Injectable({
  providedIn: 'root'
})
export class RoleEmployerGuard implements CanActivate {
  constructor(
    private router: Router,
    private localstorageEmployerService: LocalStorageEmployerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    const role = this.localstorageEmployerService.getEmployerRole();
    // Exemple : n'autoriser que les employeurs avec rôle 'entreprise'
    if (role === 'entreprise') {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
