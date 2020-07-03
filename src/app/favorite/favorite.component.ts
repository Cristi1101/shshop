import { Component } from '@angular/core';
import { ServiciuFavorite } from '../serviciu-favorite.service';
import { ServiciuCosDeCumparaturi } from '../serviciu-cos-de-cumparaturi.service';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class Favorite {
  favourites = [];

  constructor(
    public cartService: ServiciuCosDeCumparaturi,
    public favouriteService: ServiciuFavorite) {
    this.favouriteService.getFavourites().subscribe(data => {
      data.forEach(element => {
        this.favourites.push(element.payload.val());
      })
    });
  }
}