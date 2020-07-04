import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { Utilizator } from '../models/utilizator';

@Component({
  selector: 'contul-meu',
  templateUrl: './contul-meu.component.html',
  styleUrls: ['./contul-meu.component.css']
})
export class ContulMeu {
  utilizator: Utilizator;

  constructor(
    private ruta: Router,
    public authService: ServiciuDeAutentificare) {
    this.authService.utilizator$.subscribe(utilizator => {
      if (utilizator) {
        this.utilizator = utilizator;
      }
    });
  }

  modifica() {
    this.ruta.navigate(['/edit-account']);
  }

  inapoi() {
    this.ruta.navigate(['/']);
  }
}