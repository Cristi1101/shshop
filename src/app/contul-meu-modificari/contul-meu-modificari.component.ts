import { Component } from '@angular/core';
import { Utilizator } from '../models/utilizator';
import { Router } from '@angular/router';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { ServiciuUtilizatori } from '../serviciu-utilizatori.service';

@Component({
  selector: 'contul-meu-modificari',
  templateUrl: './contul-meu-modificari.component.html',
  styleUrls: ['./contul-meu-modificari.component.css']
})

export class ContulMeuModificari {
  utilizator: Utilizator;
  idUtilizator = localStorage.getItem('userUID');

  constructor(
    private ruta: Router,
    public serviciuDeAutentificare: ServiciuDeAutentificare,
    private serviciuUtilizatori: ServiciuUtilizatori) {
    this.serviciuDeAutentificare.utilizator$.subscribe(utilizator => {
      if (utilizator) {
        this.utilizator = utilizator;
      }
    });
  }

  salvareModificari(utilizator) {
    this.serviciuUtilizatori.actualizareUtilizator(this.idUtilizator, utilizator);
    this.ruta.navigate(['/contul-meu']);
  }

  inapoi() {
    this.ruta.navigate(['/contul-meu']);
  }
}