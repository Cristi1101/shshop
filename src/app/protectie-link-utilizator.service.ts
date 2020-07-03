import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ServiciuDeAutentificare } from './serviciu-de-autentificare.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProtectieLinkUtilizator implements CanActivate{

  constructor(private serviciuDeAutentificare: ServiciuDeAutentificare, private ruta: Router) { }

  canActivate(route, stare: RouterStateSnapshot){
    return this.serviciuDeAutentificare.utilizatorObs$.map(utilizator => {
      if(utilizator) return true;
      this.ruta.navigate(['/login'], { queryParams: {returnUrl: stare.url}});
      return false;
    });
  }
}
