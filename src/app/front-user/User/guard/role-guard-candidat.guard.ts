import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { LocalStorageCandidatService } from '../serviceAuth/local-storage-candidat.service';
import { AuthCandidatService } from '../serviceAuth/auth-candidat.service';

export class roleGuardCandidatGuard implements CanActivate {
  constructor(
    public router: Router,
    private authCandidatService: AuthCandidatService,
    private localstorageCandidatService: LocalStorageCandidatService
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authCandidatService.getUserRole();

    if (userRole === expectedRole) {
      return true;
    }
    this.router.navigate(['/home/loginUser']);
    return false;
  }

  
}
