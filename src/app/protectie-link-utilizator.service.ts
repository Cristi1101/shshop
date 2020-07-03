import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ServiciuDeAutentificare } from './serviciu-de-autentificare.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProtectieLinkUtilizator implements CanActivate{

  constructor(private auth: ServiciuDeAutentificare, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    return this.auth.user$.map(user => {
      if(user) return true;
      this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
      return false;
    });
  }
}
