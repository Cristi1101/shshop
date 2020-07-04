import { Component, OnInit } from '@angular/core';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';
import { CosDeCumparaturi } from '../models/cos-de-cumparaturi';
import { Produs } from '../models/produs';
import { Router } from '@angular/router';

@Component({
  selector: 'cosul-de-cumparaturi',
  templateUrl: './cosul-de-cumparaturi.component.html',
  styleUrls: ['./cosul-de-cumparaturi.component.css']
})

export class CosulDeCumparaturi implements OnInit {
  cosDeCumparaturi: CosDeCumparaturi = new CosDeCumparaturi(null);
  evidentaProduselorDinCos: number;
  pretulTotal: number;
  cosDeCumparaturi$;

  constructor(
    private ruta: Router,
    private serviciuCosDeCumparaturi: ServiciuCosDeCumparaturi) { }

  adaugaInCos(produs: Produs) {
    this.serviciuCosDeCumparaturi.adaugaInCosulDeCumparaturi(produs);
  }

  stergeDinCos(produs: Produs) {
    this.serviciuCosDeCumparaturi.stergeDinCosulDeCumparaturi(produs);
  }

  stergeCosulDeCumparaturi() {
    this.serviciuCosDeCumparaturi.stergeCosulDeCumparaturi();
    this.ruta.navigate(['/']);
  }

  async ngOnInit() {
    this.cosDeCumparaturi$ = await this.serviciuCosDeCumparaturi.primesteCosulDeCumparaturi();
    this.cosDeCumparaturi$.valueChanges().subscribe((cos) => {
      let date: any;
      date = cos.items;
      this.cosDeCumparaturi = new CosDeCumparaturi(date);
      this.evidentaProduselorDinCos = this.cosDeCumparaturi.totalItemsCount;
      this.pretulTotal = this.cosDeCumparaturi.totalPrice;
    });
  }
}