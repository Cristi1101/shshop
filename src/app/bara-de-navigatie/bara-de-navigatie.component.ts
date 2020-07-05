import { Component, OnInit } from '@angular/core';
import { ServiciuDeAutentificare } from '../serviciu-de-autentificare.service';
import { Utilizator } from '../models/utilizator';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';
import { CosDeCumparaturi } from '../models/cos-de-cumparaturi';

@Component({
  selector: 'bara-de-navigatie',
  templateUrl: './bara-de-navigatie.component.html',
  styleUrls: ['./bara-de-navigatie.component.css']
})
export class BaraDeNavigatie implements OnInit {
  utilizator: Utilizator;
  evidentaProduseDinCos: number;
  cosulDeCumparaturi$;

  constructor(
    private serviciuDeAutentificare: ServiciuDeAutentificare,
    private shoppingCartService: ServiciuCosDeCumparaturi) { }

  logout() {
    this.serviciuDeAutentificare.logout();
  }

  async ngOnInit() {
    this.serviciuDeAutentificare.utilizator$.subscribe(utilizator => this.utilizator = utilizator);
    this.cosulDeCumparaturi$ = await this.shoppingCartService.primesteCosulDeCumparaturi();
    this.cosulDeCumparaturi$.valueChanges().subscribe((cosulDeCumparaturi: CosDeCumparaturi) => {
      this.evidentaProduseDinCos = 0;
      for (let idProdus in cosulDeCumparaturi.produse)
        this.evidentaProduseDinCos += cosulDeCumparaturi.produse[idProdus].cantitate;
    });
  }
}
