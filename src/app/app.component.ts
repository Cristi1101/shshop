import { Component } from '@angular/core';
import { ServiciuDeAutentificare } from './serviciu-de-autentificare.service';
import { Router } from '@angular/router';
import { ServiciuUtilizatori } from './serviciu-utilizatori.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private serviciuUtilizatori: ServiciuUtilizatori, private serviciuDeAutentificare:ServiciuDeAutentificare, ruta: Router){
    serviciuDeAutentificare.utilizatorObs$.subscribe(utilizator => {
      if(!utilizator) return;
      
      serviciuUtilizatori.salveazaUtilizator(utilizator);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      
      localStorage.removeItem('returnUrl');
      ruta.navigateByUrl(returnUrl);
    });
  }
}