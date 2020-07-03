import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ServiciuDeAutentificare } from './serviciu-de-autentificare.service';
import { ServiciuUtilizatori } from './serviciu-utilizatori.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtectieLinkAdmin implements CanActivate{

  constructor(private auth: ServiciuDeAutentificare, private userService: ServiciuUtilizatori) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.map(appUser => appUser.isAdmin);
  }
}
