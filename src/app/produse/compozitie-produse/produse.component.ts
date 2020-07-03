import { Component, Input, OnInit } from '@angular/core';
import { Produs } from '../../models/produs';
import { ServiciuCosDeCumparaturi } from '../../serviciu-cos-de-cumparaturi.service';
import { CosDeCumparaturi } from '../../models/cos-de-cumparaturi';
import { ServiciuProduse } from '../../serviciu-produse.service';
import { ServiciuFavorite } from '../../serviciu-favorite.service';

@Component({
  selector: 'produse',
  templateUrl: './produse.component.html',
  styleUrls: ['./produse.component.css']
})

export class Produse implements OnInit {
  @Input('produs') produs: Produs;
  @Input('show-actions') showActions = true;
  @Input('cosDeCumparaturi') cosDeCumparaturi: CosDeCumparaturi;

  verificat: boolean;

  constructor(
    private serviciuCosDeCumparaturi: ServiciuCosDeCumparaturi,
    private serviciuProduse: ServiciuProduse,
    private serviciuFavorite: ServiciuFavorite) { }

  produseVizitate() {
    if (this.produs.visits == null) this.produs.visits = 0;

    this.produs.visits++;
    this.produs.time = new Date().getTime();
    this.serviciuProduse.actualizareProdus(this.produs.key, this.produs);
  }

  adaugaInCosulDeCumparaturi() {
    this.serviciuCosDeCumparaturi.adaugaInCosulDeCumparaturi(this.produs);
  }

  produseFavorite() {
    if (this.verificat == true) {
      this.serviciuFavorite.stergeProdusFavorit(this.produs);
    } else {
      this.serviciuFavorite.adaugaProdusFavorit(this.produs);
    }
  }

  scoateDinCosulDeCumparaturi() {
    this.serviciuCosDeCumparaturi.stergeDinCosulDeCumparaturi(this.produs);
  }

  primesteCantitatea() {
    if (!this.cosDeCumparaturi) return 0;

    let item = this.cosDeCumparaturi.items[this.produs.key];
    return item ? item.quantity : 0;
  }

  ngOnInit() {
    this.verificat = false;
    this.serviciuFavorite.validareFavorite(this.produs.key).subscribe(data => {
      if (data) {
        this.verificat = true;
      }
    });
  }
}
