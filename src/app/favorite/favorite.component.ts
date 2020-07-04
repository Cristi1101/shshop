import { Component } from '@angular/core';
import { ServiciuFavorite } from '../serviciu-favorite.service';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class Favorite {
  produseFavorite = [];

  constructor(
    public serviciuCosDeCumparaturi: ServiciuCosDeCumparaturi,
    public serviciuFavorite: ServiciuFavorite) {
    this.serviciuFavorite.primesteProduseFavorite().subscribe(date => {
      date.forEach(element => {
        this.produseFavorite.push(element.payload.val());
      })
    });
  }
}