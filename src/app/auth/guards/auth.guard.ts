import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {TokenStorageService} from '../../core/services/token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenStorage: TokenStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.tokenStorage.getUser();
    if (currentUser && currentUser['roles']) {
      const allowedRoles = route.data['roles'] as string[];
      if (allowedRoles && !allowedRoles.some(role => currentUser['roles'].includes(role))) {
        this.router.navigate(['unauthorized']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
