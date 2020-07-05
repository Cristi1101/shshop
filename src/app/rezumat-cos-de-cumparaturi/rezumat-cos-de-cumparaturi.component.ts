import { Component } from '@angular/core';
import { CosDeCumparaturi } from '../models/cos-de-cumparaturi';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';

@Component({
  selector: 'rezumat-cos-de-cumparaturi',
  templateUrl: './rezumat-cos-de-cumparaturi.component.html',
  styleUrls: ['./rezumat-cos-de-cumparaturi.component.css']
})

export class RezumatCosDeCumparaturi {
  evidentaProduselorDinCos: number;
  cosDeCumparaturi$;
  cosDeCumparaturi: CosDeCumparaturi = new CosDeCumparaturi(null);
  pretulTotal: number;

  constructor(private serviciuCosDeCumparaturi: ServiciuCosDeCumparaturi) { }

  async ngOnInit() {
    this.cosDeCumparaturi$ = await this.serviciuCosDeCumparaturi.primesteCosulDeCumparaturi();
    this.cosDeCumparaturi$.valueChanges().subscribe((cos) => {
      let date: any;
      date = cos.produse;
      this.cosDeCumparaturi = new CosDeCumparaturi(date);
      this.evidentaProduselorDinCos = this.cosDeCumparaturi.totalItemsCount;
      this.pretulTotal = this.cosDeCumparaturi.totalPrice;
    });
  }
}